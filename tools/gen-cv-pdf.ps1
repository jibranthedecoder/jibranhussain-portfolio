# Generate assets/Jibran-Hussain-CV-EN.pdf from cv/public.en.md
# Usage: powershell -ExecutionPolicy Bypass -File tools\gen-cv-pdf.ps1

$REPO   = Split-Path $PSScriptRoot -Parent
$SOURCE = Join-Path $REPO "cv\public.en.md"
$OUTPUT = Join-Path $REPO "assets\Jibran-Hussain-CV-EN.pdf"

# ---------------------------------------------------------------------------
# Font metrics  (Helvetica / Helvetica-Bold)
# Keys are integer character ordinals; values are 1/1000-unit widths
# Using [int] keys avoids PowerShell case-insensitive string key collisions
# ---------------------------------------------------------------------------

$script:HV = @{}   # Helvetica
$script:HB = @{}   # Helvetica-Bold

# Helvetica widths
@(
  32,278; 33,278; 34,355; 35,556; 36,556; 37,889; 38,667; 39,222;
  40,333; 41,333; 42,389; 43,584; 44,278; 45,333; 46,278; 47,278;
  48,556; 49,556; 50,556; 51,556; 52,556; 53,556; 54,556; 55,556;
  56,556; 57,556; 58,278; 59,278; 60,584; 61,584; 62,584; 63,556;
  64,1015;65,667; 66,667; 67,722; 68,722; 69,667; 70,611; 71,778;
  72,722; 73,278; 74,500; 75,667; 76,556; 77,833; 78,722; 79,778;
  80,667; 81,778; 82,722; 83,667; 84,611; 85,722; 86,667; 87,944;
  88,667; 89,667; 90,611; 91,278; 92,278; 93,278; 94,469; 95,556;
  96,222; 97,556; 98,556; 99,500;100,556;101,556;102,278;103,556;
 104,556;105,222;106,222;107,500;108,222;109,833;110,556;111,556;
 112,556;113,556;114,333;115,500;116,278;117,556;118,500;119,722;
 120,500;121,500;122,500;123,334;124,260;125,334;126,584
) | ForEach-Object -Begin { $i=0 } -Process {
    if ($i % 2 -eq 0) { $k = $_ } else { $script:HV[[int]$k] = [int]$_ }
    $i++
}

# Helvetica-Bold widths
@(
  32,278; 33,333; 34,474; 35,556; 36,556; 37,889; 38,722; 39,278;
  40,333; 41,333; 42,389; 43,584; 44,278; 45,333; 46,278; 47,278;
  48,556; 49,556; 50,556; 51,556; 52,556; 53,556; 54,556; 55,556;
  56,556; 57,556; 58,333; 59,333; 60,584; 61,584; 62,584; 63,611;
  64,975; 65,722; 66,722; 67,722; 68,722; 69,667; 70,611; 71,778;
  72,722; 73,278; 74,556; 75,722; 76,611; 77,833; 78,722; 79,778;
  80,667; 81,778; 82,722; 83,667; 84,611; 85,722; 86,667; 87,944;
  88,667; 89,667; 90,611; 91,333; 92,278; 93,333; 94,584; 95,556;
  96,278; 97,556; 98,611; 99,556;100,611;101,556;102,333;103,611;
 104,611;105,278;106,278;107,556;108,278;109,889;110,611;111,611;
 112,611;113,611;114,389;115,556;116,333;117,611;118,556;119,778;
 120,556;121,556;122,500;123,389;124,280;125,389;126,584
) | ForEach-Object -Begin { $i=0 } -Process {
    if ($i % 2 -eq 0) { $k = $_ } else { $script:HB[[int]$k] = [int]$_ }
    $i++
}

function Get-CharWidth([int]$code, [bool]$bold) {
    $tbl = if ($bold) { $script:HB } else { $script:HV }
    $w   = $tbl[[int]$code]
    if ($null -eq $w) { return 556 }
    return [int]$w
}

function Measure-Text([string]$text, [double]$fs, [bool]$bold) {
    $total = 0.0
    foreach ($c in $text.ToCharArray()) {
        $total += Get-CharWidth ([int][char]$c) $bold
    }
    return $total * $fs / 1000.0
}

function Split-Lines([string]$text, [double]$maxPts, [double]$fs, [bool]$bold) {
    $words  = ($text -split '\s+') | Where-Object { $_ -ne '' }
    $result = [System.Collections.Generic.List[string]]::new()
    $cur    = ''
    foreach ($w in $words) {
        $try = if ($cur) { "$cur $w" } else { $w }
        if ((Measure-Text $try $fs $bold) -le $maxPts) {
            $cur = $try
        } else {
            if ($cur) { $result.Add($cur) }
            $cur = $w
        }
    }
    if ($cur) { $result.Add($cur) }
    return ,$result   # comma forces array return
}

function Escape-PDF([string]$text) {
    # Remove non-WinAnsi characters (keep printable ASCII + basic latin)
    $sb = [System.Text.StringBuilder]::new()
    foreach ($c in $text.ToCharArray()) {
        $code = [int][char]$c
        if ($code -eq 40)   { [void]$sb.Append('\(') }
        elseif ($code -eq 41) { [void]$sb.Append('\)') }
        elseif ($code -eq 92) { [void]$sb.Append('\\') }
        elseif ($code -ge 32 -and $code -le 126) { [void]$sb.Append($c) }
        # skip others
    }
    return $sb.ToString()
}

# ---------------------------------------------------------------------------
# Parse CV markdown
# ---------------------------------------------------------------------------

$raw  = [System.IO.File]::ReadAllText($SOURCE, [System.Text.Encoding]::UTF8)
$fm   = @{}
$body = $raw.Trim()

if ($body -match '(?s)^---\s*(.*?)\s*---\s*(.*)$') {
    foreach ($ln in ($Matches[1] -split "`n")) {
        $sep = $ln.IndexOf(':')
        if ($sep -lt 1) { continue }
        $k = $ln.Substring(0,$sep).Trim()
        $v = $ln.Substring($sep+1).Trim()
        if ($k) { $fm[$k] = $v }
    }
    $body = $Matches[2].Trim()
}

$emailDisplay   = $fm['email']   -replace '^\[([^\]]+)\].*$','$1'
$websiteDisplay = $fm['website'] -replace '^https?://(www\.)?',''
$linkedinDisplay= $fm['linkedin']-replace '^https?://(www\.)?',''

# Parse body sections
$sections   = [System.Collections.Generic.List[hashtable]]::new()
$curBullets = $null

foreach ($rawLn in ($body -split "`n")) {
    $ln = $rawLn.Trim()
    if (-not $ln) {
        if ($null -ne $curBullets) {
            $sections.Add(@{ t='bullets'; items=[string[]]$curBullets })
            $curBullets = $null
        }
        continue
    }
    if ($ln.StartsWith('## ')) {
        if ($null -ne $curBullets) {
            $sections.Add(@{ t='bullets'; items=[string[]]$curBullets })
            $curBullets = $null
        }
        $sections.Add(@{ t='h2'; text=$ln.Substring(3).Trim() })
    } elseif ($ln.StartsWith('- ')) {
        if ($null -eq $curBullets) { $curBullets = [System.Collections.Generic.List[string]]::new() }
        $curBullets.Add($ln.Substring(2).Trim())
    } else {
        if ($null -ne $curBullets) {
            $sections.Add(@{ t='bullets'; items=[string[]]$curBullets })
            $curBullets = $null
        }
        $sections.Add(@{ t='para'; text=$ln })
    }
}
if ($null -ne $curBullets) { $sections.Add(@{ t='bullets'; items=[string[]]$curBullets }) }

# ---------------------------------------------------------------------------
# Layout constants  (points)
# ---------------------------------------------------------------------------

$PH = 841.89; $PW = 595.28
$ML = 39.69; $MR = 39.69; $MT = 34.02; $MB = 34.02
$TW = $PW - $ML - $MR   # ~515.9

$MM = 2.835   # 1mm in points

# ---------------------------------------------------------------------------
# Content stream builder
# ---------------------------------------------------------------------------

$cs  = [System.Text.StringBuilder]::new()
$y   = $PH - $MT - 4   # start below top margin

function Op-SetColor([string]$hex) {
    # Convert #rrggbb to "r g b" in 0..1
    $r = [Convert]::ToInt32($hex.Substring(1,2),16) / 255.0
    $g = [Convert]::ToInt32($hex.Substring(3,2),16) / 255.0
    $b = [Convert]::ToInt32($hex.Substring(5,2),16) / 255.0
    return "$([math]::Round($r,4)) $([math]::Round($g,4)) $([math]::Round($b,4))"
}

$RGB_TEXT  = Op-SetColor '#111111'
$RGB_MUTED = Op-SetColor '#444444'
$RGB_H2    = Op-SetColor '#1a2128'
$RGB_RULE  = Op-SetColor '#cccccc'

function Add-Line([string]$text, [double]$x, [double]$ypos,
                  [double]$fs, [bool]$bold, [string]$rgb) {
    $fn = if ($bold) { 'F2' } else { 'F1' }
    $escaped = Escape-PDF $text
    $xr  = [math]::Round($x,3)
    $yr  = [math]::Round($ypos,3)
    $fsr = [math]::Round($fs,2)
    [void]$script:cs.Append("q $rgb rg BT /$fn $fsr Tf $xr $yr Td ($escaped) Tj ET Q`n")
}

function Add-Rule([double]$ypos, [double]$thick) {
    $xr  = [math]::Round($ML,3)
    $x2r = [math]::Round($ML+$TW,3)
    $yr  = [math]::Round($ypos,3)
    $tr  = [math]::Round($thick,2)
    [void]$script:cs.Append("q $RGB_RULE RG $tr w $xr $yr m $x2r $yr l S Q`n")
}

function Add-WrappedText([string]$text, [double]$x, [ref]$yRef,
                         [double]$fs, [bool]$bold, [string]$rgb,
                         [double]$leading, [double]$indent) {
    $avail = $TW - ($x - $ML)
    $lines = Split-Lines $text $avail $fs $bold
    foreach ($l in $lines[0]) {
        Add-Line $l $x ($yRef.Value - $fs) $fs $bold $rgb
        $yRef.Value -= $leading
    }
}

# --- Name ---
$yRef = [ref]$y
Add-WrappedText $fm['name'] $ML $yRef 22.0 $true $RGB_H2 26.0 0
$y = $yRef.Value + 26.0 - 22.0 - (2*$MM)   # descend: name height + spaceAfter

# --- Title ---
$yRef = [ref]$y
Add-WrappedText $fm['title'] $ML $yRef 10.5 $false $RGB_MUTED 14.0 0
$y = $yRef.Value + 14.0 - 10.5 - (2*$MM)

# --- Horizontal rule ---
Add-Rule $y 0.6
$y -= (0.6 + 2*$MM + 1)

# --- Meta rows ---
$meta = @(
    "Location   $($fm['location'])",
    "Email   $emailDisplay",
    "Website   $websiteDisplay",
    "LinkedIn   $linkedinDisplay",
    "Updated   $($fm['updated'])"
)
foreach ($row in $meta) {
    Add-Line $row $ML ($y - 8.8) 8.8 $false $RGB_MUTED
    $y -= 12.5
}

$y -= (2*$MM)
Add-Rule $y 0.6
$y -= (0.6 + 0.5)

# --- Body ---
foreach ($sec in $sections) {
    switch ($sec.t) {
        'h2' {
            $y -= (5*$MM)
            Add-Line $sec.text $ML ($y - 11.0) 11.0 $true $RGB_H2
            $y -= (11.0 + 2*$MM)
            Add-Rule $y 0.25
            $y -= (0.25 + $MM)
        }
        'para' {
            $yRef = [ref]$y
            Add-WrappedText $sec.text $ML $yRef 9.7 $false $RGB_MUTED 13.3 0
            $y = $yRef.Value + 13.3 - 9.7 - (1.5*$MM)
        }
        'bullets' {
            $indX = $ML + (4*$MM)
            foreach ($item in $sec.items) {
                Add-Line '-' $ML ($y - 9.7) 9.7 $false $RGB_MUTED
                $avail = $TW - (4*$MM)
                $lines = Split-Lines $item $avail 9.7 $false
                $lineY = $y
                foreach ($l in $lines[0]) {
                    Add-Line $l $indX ($lineY - 9.7) 9.7 $false $RGB_MUTED
                    $lineY -= 13.3
                }
                $y = $lineY + 13.3 - 9.7 - (0.9*$MM)
            }
            $y -= $MM
        }
    }
}

$csStr  = $cs.ToString()
# [System.Text.Encoding]::Latin1 is .NET Core only; use GetEncoding on PS 5.1
$enc8   = [System.Text.Encoding]::GetEncoding(28591)   # ISO-8859-1
$csBytes = $enc8.GetBytes($csStr)
$csLen   = $csBytes.Length

# ---------------------------------------------------------------------------
# Assemble PDF binary
# ---------------------------------------------------------------------------

$enc    = [System.Text.Encoding]::GetEncoding(28591)   # ISO-8859-1
$buf    = [System.Collections.Generic.List[byte]]::new(65536)
$offsets= @(0,0,0,0,0,0)   # offsets for objs 1-6

function Emit([string]$s) {
    foreach ($b in $enc.GetBytes($s)) { $buf.Add($b) }
}

Emit "%PDF-1.4`n"
Emit "%" + [char]0xE9 + [char]0xE9 + [char]0xE9 + "`n"

# Obj 1: Catalog
$offsets[0] = $buf.Count
Emit "1 0 obj`n<< /Type /Catalog /Pages 2 0 R >>`nendobj`n"

# Obj 2: Pages
$offsets[1] = $buf.Count
Emit "2 0 obj`n<< /Type /Pages /Kids [3 0 R] /Count 1 >>`nendobj`n"

# Obj 3: Page
$offsets[2] = $buf.Count
Emit "3 0 obj`n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`nendobj`n"

# Obj 4: Content stream
$offsets[3] = $buf.Count
Emit "4 0 obj`n<< /Length $csLen >>`nstream`n"
foreach ($b in $csBytes) { $buf.Add($b) }
Emit "`nendstream`nendobj`n"

# Obj 5: Helvetica
$offsets[4] = $buf.Count
Emit "5 0 obj`n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`nendobj`n"

# Obj 6: Helvetica-Bold
$offsets[5] = $buf.Count
Emit "6 0 obj`n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`nendobj`n"

# xref
$xrefOff = $buf.Count
Emit "xref`n0 7`n"
Emit "0000000000 65535 f `n"
for ($i = 0; $i -lt 6; $i++) {
    Emit ($offsets[$i].ToString().PadLeft(10,'0') + " 00000 n `n")
}

Emit "trailer`n<< /Size 7 /Root 1 0 R >>`n"
Emit "startxref`n$xrefOff`n%%EOF`n"

# ---------------------------------------------------------------------------
# Write
# ---------------------------------------------------------------------------

$outDir = Split-Path $OUTPUT
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
[System.IO.File]::WriteAllBytes($OUTPUT, $buf.ToArray())

$kb = [math]::Round((Get-Item $OUTPUT).Length / 1024, 1)
Write-Host "OK: assets/Jibran-Hussain-CV-EN.pdf written ($kb KB)"
