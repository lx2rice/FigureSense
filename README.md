# FigureSense — Artistic Swimming Practice Advisor

FigureSense turns a practice clip into checkpoint-by-checkpoint review, with editable landmark dots, projected angle measurements, and practice feedback. This is a human-assisted prototype, not a validated AI judge or an official scoring system.

## Run the app

From this repository, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://localhost:8000/**. Choose **Try Xavier’s demo** on the home or figure-selection page to skip setup and upload. The direct entrance is **http://localhost:8000/?demo=1**.

Both `index.html` and `FigureSense-Hero.html` contain the current app. The existing `app.js` and `style.css` belong to the earlier MVP and are retained for reference; they are not loaded by the current entry points.

## Downloadable demo

Download [FigureSense-Demo.zip](downloads/FigureSense-Demo.zip?raw=true), unzip it, and open `FigureSense-Demo.html` in a current desktop browser. The portable HTML embeds the sample video, artwork, styles, and application code and starts the demo automatically. Its direct local-file launch has not been browser-tested; the local HTTP workflow has been tested.

## Current features

- Marine blue home page, supplied FigureSense logo, Xavier avatar, and rotating introduction.
- Figure selection and video upload. Figures without a review profile explicitly remain upload-only.
- Five Ballet Leg checkpoints: starting layout, bent knee entry, extended Ballet Leg, bent knee return, and finishing layout.
- The supplied demo uses visually reviewed timestamps and approximate landmark annotations, applied only when the uploaded clip matches its SHA-256 hash.
- Other Ballet Leg videos can use on-device pose detection, joint-angle rules, sequence order, and a minimum spacing between candidate frames. Mark a surface reference first. Failed tracking leaves manual capture available.
- Zoomed checkpoint inspection, draggable dots, angle arcs, and a surface-normal reference. Frame adjustments use approximately 33 ms steps; keyboard landmark adjustments use 1 pixel or Shift + arrow for 5 pixels.
- Human figure illustrations by default, with technical diagrams available as an alternate view.
- Changes to a saved frame or its dots invalidate confirmation. Review and save each checkpoint before relying on the results.

## Limits and data handling

Measurements are **2D image estimates**. Camera perspective, refraction, occlusion, surface-reference placement, and approximate joints affect the numbers. Candidate-ranking thresholds and practice scores are unvalidated heuristics, not calibrated confidence or official judging scores. Full movement quality and underwater technique cannot be established from these samples.

User-uploaded videos and working frames stay in browser memory. Refreshing clears the review. Optional MediaPipe code/WASM and model files load from jsDelivr/unpkg and Google storage; the regular app also requests Google Fonts. Processing user videos does not send them to an analysis service.

The project owner expressly approved publishing the included Xavier portrait, selected Ballet Leg demo clip, and downloadable archive. This approval does not extend to other athletes or uploads. Only the selected demo video is included; other video and ZIP files remain ignored. Do not commit consent records, private review exports, credentials, or additional athlete media without authorization.

Work with a qualified coach; never practise breath-hold or underwater drills alone.

## Development and checks

The current HTML bundles its JavaScript modules in a `sources` object and loads them as browser modules. Hero styling and interactions are in `hero-assets/hero.css` and `hero-assets/hero.js`. The alternate `FigureSense-Hero.html` entry should remain identical to `index.html`.

```sh
node tests/current-demo.cjs
node tests/geometry.cjs
python3 scripts/package_demo.py
```

The package script rebuilds the portable HTML and ZIP from `FigureSense-Hero.html`. The standalone generated HTML is a local build artifact; the approved ZIP is committed so the app's download buttons work.

Verified locally: quick demo entrance and direct demo URL; five demo checkpoints; pose-based candidate selection on a second supplied clip; live angle updates; frame and dot corrections; draft retention; mobile/desktop layout; ZIP integrity and download. These checks do not establish general model accuracy. The older MVP's documentation is preserved in [docs/legacy-mvp.md](docs/legacy-mvp.md).

## References and attribution

The Ballet Leg guidance uses the supplied World Aquatics figure manual (February 2026), BP 1, BP 3, and BM 1–2. The manuals are not redistributed here. Verify requirements for the applicable competition.

- [World Aquatics rules and manuals](https://www.worldaquatics.com/artistic-swimming/rules)
- [USA Artistic Swimming figure review sheets](https://www.usaartisticswim.org/resources/judges/figure-review-sheets)
- [MediaPipe Pose Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker/web_js)

Built with AI assistance in collaboration with the project owner. For student competitions, disclose that assistance according to the applicable rules and maintain an honest record of Xavier’s own contributions. No open-source license has been selected; external assets and libraries retain their own terms. No endorsement by the referenced organizations is implied.
