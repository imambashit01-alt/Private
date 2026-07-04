# BlackboxAI Premium Music App — TODO

## Step 1 — Plan approval
- [x] Gather repo state: index.html/style.css/script.js + assets + LRC file.
- [x] Confirm constraint: **no album cover should move** (including player cover rotation).

## Step 2 — UI structure upgrades (index.html)
- [ ] Add loading overlay (fade-in/out, progress).
- [ ] Add visualizer section (canvas under album cover area).
- [ ] Replace emoji controls with premium inline SVG icons.

## Step 3 — Visual polish (style.css)
- [ ] Enforce fixed/static album cover visuals (no transforms/animations on cover images).
- [ ] Add noise texture overlay, vignette, glass depth layers.
- [ ] Implement animated light rays/glow (background only, non-moving cover).
- [ ] Replace progress bar UI with premium custom styling (smooth, glowing, GPU-friendly).
- [ ] Improve lyrics transitions + karaoke word fill animation smoothness.

## Step 4 — Playback & effects (script.js)
- [ ] Add WebAudio visualizer (AnalyserNode + canvas render loop).
- [ ] Implement rAF-based unified render loop for progress/lyrics/mini progress.
- [ ] Upgrade karaoke parsing for Enhanced LRC (per-word timestamps), with fallback.
- [ ] Add loading overlay progression and fade into UI.

## Step 5 — Performance & testing
- [ ] Verify playback, seeking, shuffle/repeat behavior.
- [ ] Validate lyrics sync + auto-scroll.
- [ ] Confirm 60fps-friendly animations (no layout thrashing).

