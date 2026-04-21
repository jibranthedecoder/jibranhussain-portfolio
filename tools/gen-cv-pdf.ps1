# Generate assets/Jibran-Hussain-CV-EN.pdf from cv/public.en.md
# Mirrors the styling of tools/build-cv.py (reportlab reference implementation)
# Usage: powershell -ExecutionPolicy Bypass -File tools\gen-cv-pdf.ps1

$REPO   = Split-Path $PSScriptRoot -Parent
$SOURCE = Join-Path $REPO "cv\public.en.md"
$OUTPUT = Join-Path $REPO "assets\Jibran-Hussain-CV-EN.pdf"

# ---------------------------------------------------------------------------
# Helvetica + Helvetica-Bold AFM widths (1/1000 pt units)
# ---------------------------------------------------------------------------

$script:HV = @{}
$script:HB = @{}

@(32,278;33,278;34,355;35,556;36,556;37,889;38,667;39,222;40,333;41,333;
  42,389;43,584;44,278;45,333;46,278;47,278;48,556;49,556;50,556;51,556;
  52,556;53,556;54,556;55,556;56,556;57,556;58,278;59,278;60,584;61,584;
  62,584;63,556;64,1015;65,667;66,667;67,722;68,722;69,667;70,611;71,778;
  72,722;73,278;74,500;75,667;76,556;77,833;78,722;79,778;80,667;81,778;
  82,722;83,667;84,611;85,722;86,667;87,944;88,667;89,667;90,611;91,278;
  92,278;93,278;94,469;95,556;96,222;97,556;98,556;99,500;100,556;101,556;
  102,278;103,556;104,556;105,222;106,222;107,500;108,222;109,833;110,556;
  111,556;112,556;113,556;114,333;115,500;116,278;117,556;118,500;119,722;
  120,500;121,500;122,500;123,334;124,260;125,334;126,584
) | ForEach-Object -Begin { $i=0;$k=0 } -Process {
    if ($i%2 -eq 0) { $k=[int]$_ } else { $script:HV[$k]=[int]$_ }; $i++ }

@(32,278;33,333;34,474;35,556;36,556;37,889;38,722;39,278;40,333;41,333;
  42,389;43,584;44,278;45,333;46,278;47,278;48,556;49,556;50,556;51,556;
  52,556;53,556;54,556;55,556;56,556;57,556;58,333;59,333;60,584;61,584;
  62,584;63,611;64,975;65,722;66,722;67,722;68,722;69,667;70,611;71,778;
  72,722;73,278;74,556;75,722;76,611;77,833;78,722;79,778;80,667;81,778;
  82,722;83,667;84,611;85,722;86,667;87,944;88,667;89,667;90,611;91,333;
  92,278;93,333;94,584;95,556;96,278;97,556;98,611;99,556;100,611;101,556;
  102,333;103,611;104,611;105,278;106,278;107,556;108,278;109,889;110,611;
  111,611;112,611;113,611;114,389;115,556;116,333;117,611;118,556;119,778;
  120,556;121,556;122,500;123,389;124,280;125,389;126,584
) | ForEach-Object -Begin { $i=0;$k=0 } -Process {
    if ($i%2 -eq 0) { $k=[int]$_ } else { $script:HB[$k]=[int]$_ }; $i++ }

function Get-CW([int]$code, [bool]$bold) {
    $tbl = if ($bold) { $script:HB } else { $script:HV }
    $w   = $tbl[$code]
    if ($null -ne $w) { return [int]$w }
    return 556
}

function Measure-Text([string]$text, [double]$fs, [bool]$bold) {
    $t = 0.0
    foreach ($c in $text.ToCharArray()) { $t += Get-CW ([int][char]$c) $bold }
    return $t * $fs / 1000.0
}

function Split-Lines([string]$text, [double]$maxPts, [double]$fs, [bool]$bold) {
    $words  = ($text -split '\s+') | Where-Object { $_ }
    $result = [System.Collections.Generic.List[string]]::new()
    $cur    = ''
    foreach ($w in $words) {
        $try = if ($cur) { "$cur $w" } else { $w }
        if ((Measure-Text $try $fs $bold) -le $maxPts) { $cur = $try }
        else { if ($cur) { $result.Add($cur) }; $cur = $w }
    }
    if ($cur) { $result.Add($cur) }
    return ,$result
}

function ConvertTo-PDFS([string]$text) {
    $sb = [System.Text.StringBuilder]::new()
    foreach ($c in $text.ToCharArray()) {
        $code = [int][char]$c
        if    ($code -eq 40) { [void]$sb.Append('\(') }
        elseif($code -eq 41) { [void]$sb.Append('\)') }
        elseif($code -eq 92) { [void]$sb.Append('\\') }
        elseif($code -ge 32 -and $code -le 126) { [void]$sb.Append($c) }
    }
    return $sb.ToString()
}

function Strip-Markup([string]$text) {
    $text = $text -replace '\*\*([^*]+)\*\*','$1'
    $text = $text -replace '\[([^\]]+)\]\([^)]+\)','$1'
    $text = $text -replace '<[^>]+>',''
    return $text.Trim()
}

# Returns @(labelWithColon, rest) or @('', fulltext)
function Get-LabelSplit([string]$text) {
    if ($text -match '^([^:<.]{2,45}):\s+(.+)') {
        return @(($Matches[1] + ':'), $Matches[2])
    }
    return @('', $text)
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
        $k = $ln.Substring(0,$sep).Trim(); $v = $ln.Substring($sep+1).Trim()
        if ($k) { $fm[$k] = $v }
    }
    $body = $Matches[2].Trim()
}

$emailDisplay    = $fm['email']    -replace '^\[([^\]]+)\].*$','$1'
$websiteDisplay  = $fm['website']  -replace '^https?://(www\.)?',''
$linkedinDisplay = $fm['linkedin'] -replace '^https?://(www\.)?',''

$sections   = [System.Collections.Generic.List[hashtable]]::new()
$curBullets = $null

foreach ($rawLn in ($body -split "`n")) {
    $ln = $rawLn.Trim()
    if (-not $ln) {
        if ($null -ne $curBullets) { $sections.Add(@{ t='bullets'; items=[string[]]$curBullets }); $curBullets=$null }
        continue
    }
    if ($ln.StartsWith('## ')) {
        if ($null -ne $curBullets) { $sections.Add(@{ t='bullets'; items=[string[]]$curBullets }); $curBullets=$null }
        $sections.Add(@{ t='h2'; text=$ln.Substring(3).Trim() })
    } elseif ($ln.StartsWith('- ')) {
        if ($null -eq $curBullets) { $curBullets=[System.Collections.Generic.List[string]]::new() }
        $curBullets.Add($ln.Substring(2).Trim())
    } else {
        if ($null -ne $curBullets) { $sections.Add(@{ t='bullets'; items=[string[]]$curBullets }); $curBullets=$null }
        $sections.Add(@{ t='para'; text=$ln })
    }
}
if ($null -ne $curBullets) { $sections.Add(@{ t='bullets'; items=[string[]]$curBullets }) }

# ---------------------------------------------------------------------------
# Layout constants — mirrors build-cv.py margins: 16mm L/R, 14mm T/B
# ---------------------------------------------------------------------------

$PH = 841.89; $PW = 595.28
$ML = 45.36; $TW = $PW - 2*$ML   # ~504.6pt
$MM = 2.835

# Colour strings "r g b" in 0..1
$C_TEXT  = '0.067 0.067 0.067'
$C_MUTED = '0.267 0.267 0.267'
$C_ACCT  = '0.102 0.129 0.157'
$C_RULE  = '0.800 0.800 0.800'

# ---------------------------------------------------------------------------
# Content stream helpers
# ---------------------------------------------------------------------------

$cs = [System.Text.StringBuilder]::new()

function Add-TL([string]$text,[double]$x,[double]$ypos,[double]$fs,[bool]$bold,[string]$rgb) {
    $fn = if ($bold) { 'F2' } else { 'F1' }
    $e  = ConvertTo-PDFS $text
    $xr=[math]::Round($x,3); $yr=[math]::Round($ypos,3); $fsr=[math]::Round($fs,2)
    [void]$script:cs.Append("q $rgb rg BT /$fn $fsr Tf $xr $yr Td ($e) Tj ET Q`n")
}

function Add-RL([double]$ypos,[double]$thick,[string]$rgb) {
    $x1=[math]::Round($ML,3); $x2=[math]::Round($ML+$TW,3)
    $yr=[math]::Round($ypos,3); $tr=[math]::Round($thick,3)
    [void]$script:cs.Append("q $rgb RG $tr w $x1 $yr m $x2 $yr l S Q`n")
}

function Add-WL([string]$text,[double]$x,[ref]$yRef,[double]$fs,[bool]$bold,[string]$rgb,[double]$ld) {
    $avail = $TW - ($x - $ML)
    $lines = Split-Lines $text $avail $fs $bold
    foreach ($l in $lines[0]) {
        Add-TL $l $x ($yRef.Value - $fs) $fs $bold $rgb
        $yRef.Value -= $ld
    }
}

# ---------------------------------------------------------------------------
# Render page
# ---------------------------------------------------------------------------

$y = $PH - 39.69   # top margin 14mm

# Name  (26pt bold)
$yRef = [ref]$y
Add-WL (Strip-Markup $fm['name']) $ML $yRef 26.0 $true $C_TEXT 30.0
$y = $yRef.Value + 30.0 - 26.0 - (1.5*$MM)

# Subtitle  (11pt bold)
$yRef = [ref]$y
Add-WL (Strip-Markup $fm['title']) $ML $yRef 11.0 $true $C_MUTED 15.0
$y = $yRef.Value + 15.0 - 11.0 - (3.0*$MM)

# Header rule
Add-RL $y 0.7 $C_RULE
$y -= (0.7 + 2.5*$MM)

# Meta rows  (8.8pt)
foreach ($row in @(
    @{ lbl='Location'; val=$fm['location'] },
    @{ lbl='Email';    val=$emailDisplay },
    @{ lbl='Website';  val=$websiteDisplay },
    @{ lbl='LinkedIn'; val=$linkedinDisplay },
    @{ lbl='Updated';  val=$fm['updated'] }
)) {
    Add-TL "$($row.lbl)   $($row.val)" $ML ($y - 8.8) 8.8 $false $C_MUTED
    $y -= 12.5
}

$y -= (2.5*$MM)
Add-RL $y 0.7 $C_RULE
$y -= 0.7

# Body
foreach ($sec in $sections) {
    switch ($sec.t) {
        'h2' {
            $y -= (5.5*$MM)
            Add-TL $sec.text $ML ($y - 13.0) 13.0 $true $C_ACCT
            $y -= (13.0 + 1.2*$MM)
            Add-RL $y 0.3 $C_RULE
            $y -= (0.3 + 1.5*$MM)
        }
        'para' {
            $clean = Strip-Markup $sec.text
            $yRef  = [ref]$y
            Add-WL $clean $ML $yRef 9.7 $false $C_MUTED 14.0
            $y = $yRef.Value + 14.0 - 9.7 - (2.0*$MM)
        }
        'bullets' {
            $indX = $ML + (3.5*$MM)
            foreach ($item in $sec.items) {
                $clean  = Strip-Markup $item
                $parts  = Get-LabelSplit $clean
                $labelT = $parts[0]
                $restT  = $parts[1]

                Add-TL '-' $ML ($y - 9.7) 9.7 $false $C_MUTED

                if ($labelT) {
                    # Bold label on first line, then regular text
                    $lw      = Measure-Text ($labelT + ' ') 9.7 $true
                    Add-TL $labelT $indX ($y - 9.7) 9.7 $true $C_MUTED

                    $restX   = $indX + $lw
                    $avail1  = $TW - (3.5*$MM) - $lw
                    $avail2  = $TW - (3.5*$MM)
                    $words   = ($restT -split '\s+') | Where-Object { $_ }
                    $line1   = ''; $overflow = [System.Collections.Generic.List[string]]::new()
                    $filled  = $false
                    foreach ($w in $words) {
                        if (-not $filled) {
                            $try = if ($line1) { "$line1 $w" } else { $w }
                            if ((Measure-Text $try 9.7 $false) -le $avail1) { $line1 = $try }
                            else { $filled = $true; $overflow.Add($w) }
                        } else { $overflow.Add($w) }
                    }
                    if ($line1) { Add-TL $line1 $restX ($y - 9.7) 9.7 $false $C_MUTED }
                    $y -= 13.5

                    # Overflow lines at full indent width
                    $cur2 = ''
                    foreach ($w in $overflow) {
                        $try2 = if ($cur2) { "$cur2 $w" } else { $w }
                        if ((Measure-Text $try2 9.7 $false) -le $avail2) { $cur2 = $try2 }
                        else {
                            if ($cur2) { Add-TL $cur2 $indX ($y - 9.7) 9.7 $false $C_MUTED; $y -= 13.5 }
                            $cur2 = $w
                        }
                    }
                    if ($cur2) { Add-TL $cur2 $indX ($y - 9.7) 9.7 $false $C_MUTED; $y -= 13.5 }
                    $y = $y + 13.5 - 9.7 - (1.2*$MM)
                } else {
                    $yRef = [ref]$y
                    Add-WL $clean $indX $yRef 9.7 $false $C_MUTED 13.5
                    $y = $yRef.Value + 13.5 - 9.7 - (1.2*$MM)
                }
            }
            $y -= $MM
        }
    }
}

# ---------------------------------------------------------------------------
# Encode content stream
# ---------------------------------------------------------------------------

$csStr   = $cs.ToString()
$enc8    = [System.Text.Encoding]::GetEncoding(28591)
$csBytes = $enc8.GetBytes($csStr)
$csLen   = $csBytes.Length

# ---------------------------------------------------------------------------
# Assemble PDF
# ---------------------------------------------------------------------------

$enc = [System.Text.Encoding]::GetEncoding(28591)
$buf = [System.Collections.Generic.List[byte]]::new(65536)
$off = @(0,0,0,0,0,0)

function EP([string]$s) { foreach ($b in $script:enc.GetBytes($s)) { $script:buf.Add($b) } }

EP "%PDF-1.4`n"
EP ("%" + [char]0xE9 + [char]0xE9 + [char]0xE9 + "`n")

$off[0]=$buf.Count; EP "1 0 obj`n<< /Type /Catalog /Pages 2 0 R >>`nendobj`n"
$off[1]=$buf.Count; EP "2 0 obj`n<< /Type /Pages /Kids [3 0 R] /Count 1 >>`nendobj`n"
$off[2]=$buf.Count; EP "3 0 obj`n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`nendobj`n"
$off[3]=$buf.Count; EP "4 0 obj`n<< /Length $csLen >>`nstream`n"
foreach ($b in $csBytes) { $buf.Add($b) }
EP "`nendstream`nendobj`n"
$off[4]=$buf.Count; EP "5 0 obj`n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`nendobj`n"
$off[5]=$buf.Count; EP "6 0 obj`n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`nendobj`n"

$xo=$buf.Count; EP "xref`n0 7`n0000000000 65535 f `n"
for ($i=0;$i-lt 6;$i++) { EP ($off[$i].ToString().PadLeft(10,'0') + " 00000 n `n") }
EP "trailer`n<< /Size 7 /Root 1 0 R >>`nstartxref`n$xo`n%%EOF`n"

# ---------------------------------------------------------------------------
# Write
# ---------------------------------------------------------------------------

$outDir = Split-Path $OUTPUT
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
[System.IO.File]::WriteAllBytes($OUTPUT, $buf.ToArray())

$kb = [math]::Round((Get-Item $OUTPUT).Length / 1024, 1)
Write-Host "OK  assets/Jibran-Hussain-CV-EN.pdf  ($kb KB)"
