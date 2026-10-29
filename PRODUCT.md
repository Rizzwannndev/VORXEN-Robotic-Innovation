# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, creative studios, and prospective clients evaluating Rizwan Waseem's design and front-end craft. They arrive from a portfolio link or README, usually on a laptop, sometimes on a phone, and decide within seconds whether the work is award-level. Secondary: other developers curious how the 3D/motion is built.

## Product Purpose

VORXEN is a fictional robotics/AI brand used as a portfolio showcase. The site exists to prove its author can art-direct and build a cinematic, interactive, production-quality web experience with React, Spline, and WebGL. Success: a visitor remembers it, explores past the first viewport, and reaches the author's credit/contact.

## Positioning

A "living system" rather than a website: VORXEN presents itself as an intelligent machine that is booting, observing, and learning, with real-time 3D robots (Spline) that react to the visitor.

## Capabilities and Constraints

- Stack: React 19 + Vite 7, Tailwind v4, GSAP 3 (ScrollTrigger, ScrollSmoother), Motion, OGL, Howler, react-router-dom 7. Deployed on Vercel (vorxen.vercel.app).
- Routes: Home, About; user approved adding pages (e.g. Systems, Contact).
- Must keep the concept and reuse existing material: three Spline scenes (hero robot `2nVp2Oks6bWTqZLP`, section robot `Y4RqcMmjEct4KzBX`, footer `p5Z-jq1vxUDynMTH`), ambient audio toggle (`public/audio.mp3`), OGL galaxy shader, monochrome renders (`public/img1.png` neural head, `img2.png` holographic panels, `img4.png` atom core), fonts Dune Rise and HS Luna Obscura in `public/fonts`.
- Spline scenes are hosted on prod.spline.design and are heavy; they must not all block first paint.

## Brand Commitments

- Name: VORXEN. Tagline in use: "Robotic Innovation".
- Voice: terse, system-like declarations ("VORXEN IS NOT A COMPANY / IT IS A SYSTEM", "THE SYSTEM IS LEARNING").
- Existing product/module names: Neural Core, Cyber Interface, Synth Systems, AI Nexus. Pillars: CORE (AI systems), FOCUS (robotics + automation), MISSION (human × machine evolution). Timeline 2024 concept → 2025 AI systems → 2026 robotics → ∞ autonomous intelligence.
- Credit: "Designed & Made By Rizwan Waseem".

## Evidence on Hand

All content is fiction for a portfolio piece. Stats (15 units, 99% accuracy, 1000+ neurons) are stylized fiction and may stay as such. No real customers, press, or testimonials exist; do not invent any presented as real. Social links currently point to platform homepages (placeholders).

## Product Principles

1. The machine is the protagonist: every section should feel like the system is alive and responding.
2. Craft over quantity: fewer, orchestrated effects beat a pile of demos.
3. Keep the original concept and assets; elevate them rather than replace them.
4. Performance is part of the craft: heavy 3D loads progressively and never blocks reading.

## Accessibility & Inclusion

Respect prefers-reduced-motion; keyboard-reachable navigation and controls; audio never autoplays.
