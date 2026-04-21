# Third-Party Asset Licenses

## Lottie Animation — "Free Idea into Book Machine Animation"

| Field        | Value |
|-------------|-------|
| Asset name  | Free Idea into Book Machine Animation (internal nm: "Machine book") |
| Local path  | `/assets/idea-into-book-machine.json` |
| Source      | LottieFiles marketplace |
| License     | Lottie Simple License |
| License URL | https://lottiefiles.com/page/license |
| Used on     | `/projects/` hero section |

### Lottie Simple License — summary of permitted use

- Free to use in personal and commercial projects
- No attribution required, but appreciated
- Redistribution of the raw animation file outside of a project is not permitted
- Modification for integration purposes (e.g. removing a background layer for transparent rendering) is permitted

### Modifications made

The "White Solid 2" background layer (ty=1, solid color #ffffff) was removed from the JSON to allow transparent rendering against the site's themed background. No other content, shape, or animation data was altered.

---

## Lottie Animation — "Brain Bulb with Gears"

| Field        | Value |
|-------------|-------|
| Asset name  | Brain Bulb with Gears (internal nm: "Creative Concept 3") |
| Local path  | `/assets/brain-bulb-gears.json` |
| Source      | User-provided licensed asset |
| License     | Lottie Simple License |
| License URL | https://lottiefiles.com/page/license |
| Date added  | 2026-04-21 |
| Used on     | `/about/` hero section |
| Colors modified | Yes |

### Modifications made

All animation fill and stroke colors were replaced to match the site's engineering palette:
- Original cyan `#00D2FC` → steel teal `#4D8BAD` (muted professional blue)
- Original yellow `#FCD700` → warm amber `#C8962A` (engineering gold)
- Black outlines (`#000000`) and white highlights (`#FFFFFF`) left unchanged

No animation timing, layer structure, or asset composition was altered.

---

## Lottie Animation - "Waving human hand. Hello gesture"

| Field        | Value |
|-------------|-------|
| Asset name  | Waving human hand. Hello gesture |
| Local path  | `/assets/contact-wave-hand.json` |
| Source      | LottieFiles |
| License     | Lottie Simple License |
| License URL | https://lottiefiles.com/page/license |
| Date added  | 2026-04-21 |
| Used on     | `/contact/` hero section |
| Usage       | Decorative website contact page hero animation |

### Modifications made

No JSON animation data was altered. The animation is integrated through CSS-only visual tuning for the site theme:
- Slight desaturation, contrast tuning, and brightness tuning in light mode
- Stronger desaturation and brightness reduction in dark mode
- Transparent page integration using the existing rounded Lottie container

This page reuses the existing local `lottie-web` light player at `/assets/lottie-light.min.js`.

---

## JavaScript Library — lottie-web (lottie_light)

| Field        | Value |
|-------------|-------|
| Package     | lottie-web v5.12.2 |
| Local path  | `/assets/lottie-light.min.js` |
| Source      | https://github.com/airbnb/lottie-web |
| License     | MIT |
| Copyright   | © Airbnb |

### MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
