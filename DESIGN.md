---
name: VORXEN
description: Robotic innovation. A machine running a diagnostic on itself while you watch.
colors:
  void: "#000000"
  panel: "#080b0d"
  steel: "#1b2228"
  rule: "#26313a"
  dim: "#8fa3ad"
  phos: "#d8f3ff"
  diag: "#6ce1ff"
  warn: "#ffb547"
typography:
  display:
    fontFamily: "luna, Archivo Variable, sans-serif"
    fontSize: "clamp(3rem, 9.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.4vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline-section:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "luna, Archivo Variable, sans-serif"
    fontSize: "clamp(1.7rem, 3vw, 2.9rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Martian Mono Variable, Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.14em"
    fontFeature: "'tnum' 1"
  wordmark:
    fontFamily: "luna, Archivo Variable, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    letterSpacing: "0.18em"
rounded:
  none: "0px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.phos}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.diag}"
    textColor: "{colors.void}"
  text-action:
    textColor: "{colors.phos}"
    typography: "{typography.label}"
    padding: "12px 0"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.phos}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  nav-channel:
    textColor: "{colors.dim}"
    typography: "{typography.label}"
    padding: "8px 0"
  nav-channel-active:
    textColor: "{colors.phos}"
  readout-row:
    textColor: "{colors.phos}"
    typography: "{typography.label}"
    padding: "6px 0"
---

# Design System: VORXEN

## Overview

**Creative North Star: "The Self-Diagnostic Boot"**

VORXEN is a machine powering on and testing itself while the visitor watches. Every surface reads as an instrument screen: a void-black ground that the hosted Spline scenes melt into, fine phosphor scanlines over everything, POST log lines that resolve to `[OK]`, fixed-cell readouts, 1px rules, and calibration corner brackets that frame whatever the machine is looking at. The 3D robots are the protagonists; type and chrome are the diagnostic overlay around them.

Density is split deliberately. Large Luna Obscura display words and wide Archivo headlines carry the statements; everything the machine itself "says" (states, measurements, labels, nav channels) is small uppercase Martian Mono with tabular numerals. Colour is nearly monochrome phosphor on black, with diagnostic cyan reserved for live values and active states and amber for in-progress or failing ones.

Motion has two verbs: decode (characters resolve out of glyph noise, left to right) and scan (a single 1px horizontal line sweeps to reveal or dismiss). The site boots once, route changes scan out and back in, and the cursor is a set of calibration brackets that locks onto interactive targets. With reduced motion, every one of these collapses to its end state.

**Key Characteristics:**
- Pure void ground; depth comes from the 3D scenes, never from shadows or glass.
- Square everything: zero radius, 1px rules, corner brackets as the only frame.
- Three voices: Luna for names and declarations, wide Archivo for headlines and prose, Martian Mono for the system.
- Cyan means live; amber means not yet; phosphor is everything else.
- Decode and scan are the whole motion vocabulary.

## Colors

A phosphor-on-void instrument palette: one near-white, one signal cyan, one caution amber, and a short ladder of blue-grey steels for structure.

### Primary
- **Diagnostic Cyan** (diag): Live values, active states, and confirmations only: `[OK]` tags, the active nav square, progress-track fills, the scan line in transitions and boot, focus outlines, text selection, the caret, the primary action's hover wipe. Never a glow, never a large fill at rest.

### Secondary
- **Caution Amber** (warn): The other half of the POST vocabulary. `[..]` in-progress lines, "Learning" states, form errors, "Signal lost", "Pending" placeholders. Same restraint as cyan: a state colour, not decoration.

### Neutral
- **Void** (void): The ground of every page, the boot screen, the mobile menu, the transition fill. Fixed: the Spline scenes render on pure black and any other ground exposes their rectangles.
- **Panel** (panel): The only raised tone. Image wells behind renders and galaxy canvases, and the hover tint on table rows and directive rows.
- **Instrument Steel** (steel): Unfilled progress tracks, dotted leaders between readout key and value, inactive nav squares, scrollbar thumb.
- **Rule** (rule): Every 1px divider: section borders, readout row underlines, form field baselines, the header's extending rule.
- **Dim Phosphor** (dim): Secondary text: body prose, readout keys, inactive nav, captions, labels.
- **Phosphor** (phos): Primary text, display words, bracket strokes (often at 50 to 80% opacity), the primary action plate, the cursor.

### Named Rules
**The Live Signal Rule.** Cyan appears only where something is live, active, or confirmed. If the element would read the same with the system powered off, it is not cyan.

**The Fixed Void Rule.** The ground is #000000 everywhere a Spline scene can appear. Do not tint, lift, or texture it beyond the global scanline layer.

## Typography

**Display Font:** HS Luna Obscura (`luna`, falling back to Archivo Variable)
**Body Font:** Archivo Variable, width axis (with Archivo, system-ui)
**Label/Mono Font:** Martian Mono Variable (with ui-monospace)
**Brand 3D Font:** Dune Rise (`dune`), used only inside the hero Spline scene's 3D wordmark; it is not set in DOM text.

**Character:** Luna's engineered geometric caps name things; wide, tightly tracked Archivo makes the human-scale claims; Martian Mono is the machine talking. The pairing reads as a product label stuck on a lab instrument.

### Hierarchy
- **Display** (Luna, clamp(3rem, 9.5vw, 6rem), 0.9 to 1.02 line-height, +0.02em): Page titles (SYSTEMS, ESTABLISH LINK, VORXEN IS NOT A COMPANY), the closing "THE SYSTEM IS LEARNING", the phone wordmark (15.4vw). Usually decoded in. Outline variant (1px phosphor stroke, transparent fill) for the answering line of a statement and the second marquee row.
- **Headline** (Archivo 600 at wdth 125, clamp(2.4rem, 4.4vw, 5rem), 0.95, -0.035em): Section statements such as "It reads intent before you move." Line-masked rise on entry. Section-level variant clamp(1.8rem, 3.4vw, 3rem), line-height 1, -0.03em.
- **Title** (Luna, clamp(1.7rem, 3vw, 2.9rem), 1, +0.02em): Module names in panels, tables, and spec pages. Archivo wide 500 at 1.25rem pairs beneath as a role line.
- **Body** (Archivo 400, 1.125rem, 1.625): Prose in dim phosphor, measured at 40 to 50ch.
- **Label** (Martian Mono, 0.6875rem, 1.6, 0.14em, uppercase, tabular numerals): Every system voice: POST lines, readouts, nav channels, actions, form labels, captions, frame annotations, status lines. The cursor's lock tag drops to 10px.
- **Wordmark** (Luna, 0.95rem, 0.18em): Header and footer logotype beside the delta glyph. Boot header and directive keys use Luna at 0.875rem, 0.3em.

### Named Rules
**The Machine Voice Rule.** If the system is reporting (a state, a number, a channel, a command), it is set as Label. Headlines and prose are human voice and never mono.

**The Tabular Rule.** Every changing number (counter, gaze, uptime, accuracy) sits in tabular numerals so readouts never jitter.

## Layout

Full-bleed sections on a 12-column grid at lg, with page gutters of 20px, 32px from 640px, and 48px from 1024px. Sections breathe on 96 to 160px vertical padding (py-24 to py-40); content columns typically split 6/6 or 7/5 with copy on one side and a framed unit on the other.

Readouts are laid out as definition lists: key left in dim, value right in phosphor, a 1px rule beneath each row, optionally a dotted steel leader between them and a 1px progress track under them. Tables are full-width with rule dividers and no cell backgrounds.

The hero is a full-viewport stage (100svh, min 640px): the Spline scene fills it, a bracket frame centres on the unit, the POST log sits bottom-left and readouts bottom-right on desktop; phones collapse to a wordmark, condensed log, and two readouts above a bottom rail. The modules section pins and scrolls horizontally at lg; under reduced motion and below lg it stacks vertically.

Breakpoints are Tailwind's defaults (640, 768, 1024px).

## Elevation & Depth

Flat. No box shadows, no glass, no blur. Depth is supplied by the live 3D scenes and by stacked, non-interactive fixed layers: scanlines over everything, the scan transition above that, the target-lock cursor above that, the boot screen on top. The only tonal step is Panel behind media wells and as a row hover tint.

### Named Rules
**The No-Lift Rule.** Nothing floats. A surface earns presence with a 1px rule or a bracket frame, never with a shadow or a translucent pane.

## Shapes

Hard square geometry. Zero radius on every element, including the primary action, inputs, image wells, and the cursor dot. Frames are drawn by four 1px corner brackets (default 18px legs; 16 to 28px depending on the frame's size) in currentColor, so a frame inherits phosphor at reduced opacity. Lines are 1px: rules, tracks, scan lines, field baselines, outline display type. Active nav state is a 6px square, not a dot.

**The Calibration Frame Rule.** Containers are implied by corners, not boxed by borders. Use four brackets around a unit, image, or call to action; reserve full borders for horizontal rules.

## Components

### Buttons
Two actions only, both square and set in the Label voice.
- **Shape:** Square (0px).
- **Primary action:** A phosphor plate with void text, 16px by 24px padding, a trailing arrow. On hover or keyboard focus a cyan fill wipes across from the left (scaleX, 500ms, expo-out) and the arrow nudges 4px right. The whole plate is magnetic to the pointer (strength 0.25). Disabled drops to 40% opacity.
- **Text action:** Phosphor label followed by a 24px 1px rule; on hover the rule extends to 48px and turns cyan.
- **Focus:** Global 1px cyan outline at a 4px offset.

### Inputs / Fields
- **Style:** Baseline only: transparent ground, 1px rule underline, phosphor text at 1.25rem, Label above in dim.
- **Focus:** Underline and label shift to cyan; caret is cyan.
- **Error:** Underline turns amber, an amber "Error" tag appears right of the label, and the message sits below in amber Label.

### Navigation
- **Desktop:** Channel nav (CORE, SYSTEMS, ORIGIN, LINK) in Label, each preceded by a 6px square: steel when idle, dim on hover, cyan when active; text dim to phosphor. A long 1px rule precedes the channels; the audio channel (four level bars, cyan when on) closes the row. The bar enters after boot, hides on scroll down past 160px, returns on scroll up.
- **Mobile:** "Menu"/"Close" in Label opens a full-screen void sheet that clips down from the top (700ms expo-in-out); channels are Luna at 2.1rem in rule-divided rows, decoding in as the sheet opens, with their route path in Label at right.

### Readouts and POST log
Status lines are `[OK]` in cyan or `[..]` in amber, followed by the subject in Label; values are tabular. Readout rows follow the Layout pattern above. A blinking block caret (1.05s steps) marks "still running".

### Boot screen (signature)
Runs once per page load over a void sheet: the wordmark and "Power-on self-test" over a rule, POST lines slide in staggered, a Luna counter runs 000 to 100 beside a 1px cyan progress bar (2.1s), status flips to Ready, then the panel collapses vertically to a line and horizontally to nothing before fading. Click or any key fast-forwards at 5x.

### Decode (signature)
Text resolves out of glyph noise (`01<>/\#+=*-_` and hard capitals) left to right over 500 to 1400ms, triggered on entry or by state. Screen readers receive the final text immediately.

### Target-lock cursor (signature)
On fine pointers: a 26px bracket frame (7px legs) trails the pointer with a 4px dot, in phosphor under difference blending. Over any link, button, or field it snaps to the element's bounds plus 8px and the legs grow to 10px; elements carrying a lock label show it in 10px Label beneath. Press scales it to 90%.

### Scan transition (signature)
Route changes: a 1px cyan line sweeps down while a void fill follows it (600ms expo-in-out), "Loading /route" shows in dim Label, the route swaps, then the line sweeps again to reveal (750ms). Scroll-linked variants: bracket frames close in from -8% to 0 inset as a unit scrolls into place; the footer wordmark clips in from the top; media panels roll interference bands on hover.

### Media wells
Panel-toned 16:10 or 4:3 wells with brackets at 80% phosphor, a code and index caption bottom-left and a status bottom-right in Label. Images scale 1.04 on hover over 1.2s. Spline scenes mount near the viewport, fade in over 1.4s, pause off-screen, and show "Acquiring signal" with a caret while loading or "Signal lost" with a retry on failure.

### Motion and reduced motion
Easing is expo-out (cubic-bezier(0.16, 1, 0.3, 1)) for reveals and expo-in-out for scans. Under `prefers-reduced-motion: reduce`: the boot sets 100 and fades in 0.4s; routes change instantly; Decode shows final text; the custom cursor is not mounted and the native cursor returns; scroll reveals and scrubs are skipped; the module scan stacks vertically; caret, level bars, scan indicator, and interference bands hold still.

## Do's and Don'ts

### Do:
- **Do** keep the ground pure void (#000000) wherever a Spline scene can appear.
- **Do** set every system statement, number, and control in the Label voice with tabular numerals.
- **Do** frame units, media, and closing calls to action with four 1px corner brackets.
- **Do** reserve diagnostic cyan for live, active, focused, or confirmed states, and amber for in-progress or error.
- **Do** introduce display words with Decode and dismiss or reveal views with a single 1px scan line.
- **Do** give every motion a reduced-motion end state.

### Don't:
- **Don't** round corners; the system has no radius.
- **Don't** add box shadows, text glow, glass panes, or backdrop blur to UI elements. (The OGL galaxy's own star luminance is a rendered material, not UI glow.)
- **Don't** use gradient-filled text; the only gradient in the system is the void scrim behind phone hero copy.
- **Don't** place small uppercase kickers or eyebrows above headlines; labels annotate frames, rows, and readouts, not headings.
- **Don't** set the ground to anything but void behind 3D scenes.
- **Don't** introduce rounded or filled card containers; use rules, brackets, and Panel wells.
