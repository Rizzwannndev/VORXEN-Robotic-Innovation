import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Galaxy from "../components/Galaxy";
import Decode from "../components/Decode";
import Brackets from "../components/Brackets";
import { PrimaryAction, TextAction } from "../components/Action";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { useBooted } from "../lib/boot";

const GUTTER = "px-5 sm:px-8 lg:px-12";

const DIRECTIVES = [
  ["Core", "Artificial intelligence systems"],
  ["Focus", "Robotics + automation"],
  ["Mission", "Human × machine evolution"],
];

const TIMELINE = [
  ["2024", "Concept initialized", "A question, sketched: what if an interface could notice you?"],
  ["2025", "AI systems developed", "Neural Core and Cyber Interface learn to read intent."],
  ["2026", "Robotics integration", "The system gets a body: fifteen units, one shared mind."],
  ["∞", "Autonomous intelligence", "No end state. The system keeps learning."],
];

const About = () => {
  const root = useRef(null);
  const booted = useBooted();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-rise]", { y: 30, autoAlpha: 0, duration: 1.2, ease: "expo.out", stagger: 0.12, delay: 0.5 });

      gsap.from("[data-directive]", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-directives]", start: "top 75%" },
      });

      gsap.fromTo(
        "[data-rail]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 60%", end: "bottom 60%", scrub: true } }
      );
      gsap.utils.toArray("[data-entry]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.28 },
          { opacity: 1, duration: 0.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="relative">
      {/* Star field fixed behind the whole page (portaled: fixed positioning
          does not survive the smoother's transformed content). */}
      {booted &&
        createPortal(
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 animate-[fadeIn_2s_ease-out]">
            <Galaxy
              mouseInteraction={false}
              density={1}
              glowIntensity={0.3}
              saturation={0}
              hueShift={140}
              twinkleIntensity={0.3}
              rotationSpeed={0.08}
              starSpeed={0.4}
              speed={0.8}
            />
          </div>,
          document.body
        )}

      {/* Statement */}
      <section className={`relative flex min-h-svh flex-col justify-center pt-28 pb-16 ${GUTTER}`} aria-labelledby="about-title">
        <h1 id="about-title" className="font-display text-[clamp(2rem,6.4vw,6rem)] leading-[1.02] tracking-[0.02em]">
          <Decode text="VORXEN IS NOT" duration={900} className="block text-phos" />
          <Decode text="A COMPANY." duration={900} delay={250} className="block text-phos" />
          <Decode text="IT IS A SYSTEM." duration={1100} delay={600} className="mt-[0.2em] block t-outline" />
        </h1>
        <div className="mt-16 grid gap-8 md:grid-cols-12">
          <p data-rise className="max-w-[48ch] text-lg leading-relaxed text-dim md:col-span-6 lg:col-span-5">
            VORXEN started as a concept: an interface that behaves like a machine paying attention. It reasons with
            artificial intelligence, moves with robotics, and keeps learning from the people who use it.
          </p>
          <p data-rise className="t-label self-end text-dim md:col-span-4 md:col-start-9">
            Origin record · 2024 — ∞
          </p>
        </div>
      </section>

      {/* Directives */}
      <section data-directives className={`relative py-24 lg:py-32 ${GUTTER}`} aria-labelledby="directives-title">
        <h2 id="directives-title" className="t-wide mb-12 text-[clamp(1.8rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.03em]">
          Directives
        </h2>
        <ul className="border-t border-rule">
          {DIRECTIVES.map(([key, value]) => (
            <li
              key={key}
              data-directive
              data-lock={key}
              className="group grid gap-2 border-b border-rule py-8 transition-colors hover:bg-panel/60 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-display text-sm tracking-[0.3em] text-dim transition-colors group-hover:text-diag md:col-span-3">
                {key.toUpperCase()}
              </span>
              <span className="t-wide text-[clamp(1.6rem,4vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.03em] text-phos md:col-span-9">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Timeline */}
      <section className={`relative py-24 lg:py-32 ${GUTTER}`} aria-labelledby="evolution-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2
            id="evolution-title"
            className="t-wide text-[clamp(1.8rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.03em] lg:col-span-4"
          >
            System evolution
          </h2>
          <ol data-timeline className="relative lg:col-span-8">
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-rule" />
            <span aria-hidden="true" data-rail className="absolute top-0 bottom-0 left-0 w-px origin-top bg-diag" />
            {TIMELINE.map(([year, title, text]) => (
              <li key={year} data-entry className="relative grid gap-3 pb-20 pl-8 last:pb-0 sm:grid-cols-[minmax(9rem,auto)_1fr] sm:gap-10 sm:pl-12">
                <span aria-hidden="true" className="absolute top-[0.6em] left-[-3px] h-[7px] w-[7px] bg-phos" />
                <span className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] text-phos">{year}</span>
                <div className="pt-2">
                  <h3 className="t-wide text-xl font-semibold text-phos">{title}</h3>
                  <p className="mt-2 max-w-[42ch] leading-relaxed text-dim">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Close */}
      <section className={`relative py-28 lg:py-40 ${GUTTER}`} aria-labelledby="about-close">
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center sm:px-12 lg:py-24">
          <span className="text-phos/50">
            <Brackets size={24} />
          </span>
          <Decode
            as="h2"
            id="about-close"
            text="THE SYSTEM IS LEARNING"
            duration={1300}
            className="mx-auto block max-w-[14ch] font-display text-[clamp(2rem,5.6vw,5rem)] leading-[1.04] tracking-[0.02em] text-phos"
          />
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <PrimaryAction to="/systems">
              Inspect the systems
            </PrimaryAction>
            <TextAction to="/contact">
              Establish link
            </TextAction>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
