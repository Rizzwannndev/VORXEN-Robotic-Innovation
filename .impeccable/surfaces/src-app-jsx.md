---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/Pages/Home.jsx","src/Pages/About.jsx"]
---

# VORXEN site (all routes)

Scope: the whole VORXEN web experience — Home (CORE), Systems (new), About (ORIGIN), Contact (LINK, new), shared header/footer/cursor/transitions. Visitor mode: Experience (portfolio showcase; the work leads from the first viewport).

Audience/job: recruiters, studios, clients judging Rizwan Waseem's craft in seconds; success = they explore past the hero and reach the credit/contact.
Constraints: keep React + Vite + Spline scenes, OGL galaxy, audio toggle, the three renders, the Dune Rise wordmark; fiction stats allowed but stylized; no invented testimonials/clients.
Memorable moment: the boot sequence collapsing into a scan line that opens onto the live robot, and the cursor's calibration brackets locking onto whatever you point at.
Unresolved: real contact email (form composes a mailto to a configurable address); real social URLs.

## Direction contract

THESIS: The site is VORXEN powering on and running a diagnostic on itself while you watch; every section is a test the machine passes. It refuses the category default of a centred neon headline over glass feature cards.

OWN-WORLD: Void black #000000 ground (the hosted Spline scenes render on pure #000; any other ground exposes their rectangles) with fine phosphor scanlines; phosphor white #D8F3FF text; diagnostic cyan #6CE1FF only on live values and active states, never as glow; instrument steel #1B2228 for rules and tracks. Calibration corner brackets, POST log lines ([OK]/[..]), fixed-cell readouts, thin 1px rules, progress tracks. Luna Obscura (the incumbent brand face, reused per the user) for the wordmark and display words, Dune Rise inside the hero scene's 3D word, Archivo for headlines and body, Martian Mono for every system voice. No glass, no rounded cards, no gradient text.

STORY: The machine boots (POST log, 000→100), opens its eye on the live robot, introduces itself through readouts, scans its modules one by one, states its origin, and ends with "THE SYSTEM IS LEARNING" and a link request. The visitor believes this is a crafted, living system and opens a link.

FIRST VIEWPORT: Full-bleed Spline robot centre stage inside four calibration brackets. Left column: POST log (power, servo, neural core, vision OK; LEARNING in progress). Right column: live readouts (accuracy 99, units 15, gaze target X/Y following the cursor, uptime). The VORXEN wordmark is the 3D word inside the hero scene on desktop; phones, where the scene crops it, set it in Luna Obscura above the bottom rail, with a condensed POST log and two readouts. Top: channel nav 01 CORE / 02 SYSTEMS / 03 ORIGIN / 04 LINK + audio channel.

FORM: Self-Diagnostic Boot (machine power-on self-test and diagnostic readout screens), my #1 grounded candidate, chosen by the user over the roll. seed:54ddd81016e7b55c
Signature interaction: target-lock cursor — four calibration brackets that snap to the bounds of any interactive element. Motion grammar: decode (characters resolve from glyph noise left to right) and scan (a single horizontal line sweeps to reveal or dismiss); route changes scan out and re-boot in.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
