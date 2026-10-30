import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SplineScene from "../components/SplineScene";
import CurvedLoop from "../components/CurvedLoop";
import ScrollVelocity from "../components/ScrollVelocity";
import CountUp from "../components/CountUp";
import Decode from "../components/Decode";
import Brackets from "../components/Brackets";
import Galaxy from "../components/Galaxy";
import WhenNear from "../components/WhenNear";
import TransitionLink from "../components/TransitionLink";
import { PrimaryAction, TextAction } from "../components/Action";
import { POST_LINES, useBooted } from "../lib/boot";
import { modules, scenes } from "../data/site";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap";

const GUTTER = "px-5 sm:px-8 lg:px-12";

/* ---------- Hero ---------- */

// Live values: gaze target follows the pointer, uptime counts from boot.
function useLiveReadouts(root) {
  useEffect(() => {
    const gx = root.current.querySelector("[data-gx]");
    const gy = root.current.querySelector("[data-gy]");
    const ups = root.current.querySelectorAll("[data-uptime], [data-uptime-m]");
    const t0 = performance.now();
    const onMove = (e) => {
      gx.textContent = (e.clientX / window.innerWidth).toFixed(3);
      gy.textContent = (e.clientY / window.innerHeight).toFixed(3);
    };
    const id = setInterval(() => {
      const s = Math.floor((performance.now() - t0) / 1000);
      const pad = (n) => String(n).padStart(2, "0");
      ups.forEach((u) => (u.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`));
    }, 1000);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("pointermove", onMove);
    };
  }, [root]);
}

function Hero() {
  const root = useRef(null);
  const booted = useBooted();
  const [fine] = useState(isFinePointer);
  useLiveReadouts(root);

  useLayoutEffect(() => {
    if (!booted) return;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-frame]", { scale: 1.25, autoAlpha: 0, duration: 1.4 })
          .from("[data-rise]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.25);

        gsap.to("[data-overlay]", {
          y: -80,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
        });
        gsap.to("[data-stage]", {
          scale: 0.92,
          autoAlpha: 0.35,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, [booted]);

  return (
    // Phones: a column. The unit gets whatever height the rail leaves, so the
    // frame and the rail can never collide whatever the browser chrome takes.
    // md+: everything layers over the full-bleed stage.
    <section
      ref={root}
      className="relative flex h-svh min-h-[600px] flex-col overflow-hidden md:block md:min-h-[640px]"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        VORXEN — robotic innovation
      </h1>

      <div className="relative mt-16 min-h-0 flex-1 md:absolute md:inset-0 md:mt-0">
        {/* Phones: fade the side edges (the scene's 3D word crops there) and the floor into the rail */}
        <div
          data-stage
          className="absolute inset-0 max-md:[mask-composite:intersect] max-md:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent),linear-gradient(to_bottom,black_78%,transparent)]"
        >
          <SplineScene scene={scenes.hero} eager className="h-full w-full" label="Opening eye" />
        </div>

        <div data-overlay className={`pointer-events-none absolute inset-0 ${GUTTER}`}>
          {/* Calibration frame around the unit */}
          <div
            data-frame
            className="absolute top-7 bottom-8 left-1/2 w-[min(64vw,30rem)] -translate-x-1/2 text-phos/70 md:top-[12%] md:bottom-auto md:h-[74%]"
          >
            <Brackets size={22} />
            <span className="t-label absolute -top-6 left-0 text-dim">Unit VX-01 · Humanoid</span>
            <span className="t-label absolute -bottom-6 right-0 text-diag">Tracking</span>
          </div>
  
          {/* POST log (desktop): names only, kept clear of the unit's reach */}
          <ol
            aria-label="System status"
            className="absolute top-[64%] left-5 hidden w-[16.5rem] space-y-1.5 sm:left-8 md:block lg:left-12"
          >
            {POST_LINES.map(([state, name], i) => (
              <li key={name} data-rise className="t-label flex items-baseline gap-3">
                <span className={state === "OK" ? "text-diag" : "text-warn"}>[{state}]</span>
                <Decode text={name} start={booted} delay={i * 90} duration={500} />
              </li>
            ))}
          </ol>
  
          {/* Live readouts (desktop) */}
          <dl className="absolute top-[64%] right-5 hidden w-[15rem] sm:right-8 md:block lg:right-12">
            {[
              ["Accuracy", <><CountUp to={99} duration={1.2} />.0%</>],
              ["Units online", <CountUp to={15} duration={1.2} />],
              ["Gaze X", <span data-gx>0.500</span>],
              ["Gaze Y", <span data-gy>0.500</span>],
              ["Uptime", <span data-uptime>00:00:00</span>],
            ].map(([k, v]) => (
              <div key={k} data-rise className="t-label flex justify-between border-b border-rule py-1.5">
                <dt className="text-dim">{k}</dt>
                <dd className="text-phos">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom rail: flows under the stage on phones, layers over it from md */}
      <div
        data-overlay
        className={`relative flex items-end justify-between gap-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:absolute md:inset-x-0 md:bottom-6 md:pb-0 ${GUTTER}`}
      >
        <div data-rise className="w-full md:w-auto">
          {/* Phone: the scene crops its 3D word, so the wordmark is set here */}
          <p aria-hidden="true" className="mb-5 font-display text-[15.4vw] leading-none text-phos md:hidden">
            VORXEN
          </p>
          <ol aria-label="System status" className="mb-4 space-y-1 md:hidden">
            {POST_LINES.slice(2).map(([state, name]) => (
              <li key={name} className="t-label flex gap-3">
                <span className={state === "OK" ? "text-diag" : "text-warn"}>[{state}]</span>
                <Decode text={name} start={booted} duration={500} />
              </li>
            ))}
          </ol>
          <dl className="mb-4 flex gap-6 border-y border-rule py-2 md:hidden">
            <div className="t-label flex gap-2">
              <dt className="text-dim">Accuracy</dt>
              <dd className="text-phos">99.0%</dd>
            </div>
            <div className="t-label flex gap-2">
              <dt className="text-dim">Uptime</dt>
              <dd className="text-phos" data-uptime-m>00:00:00</dd>
            </div>
          </dl>
          <p className="t-label max-w-[22rem] text-dim md:max-w-[17rem]">
            <span className="text-phos">Robotic innovation.</span> An intelligent machine that observes, adapts,
            and learns. <span className="text-phos">{fine ? "Move your cursor — it is watching." : "It is watching."}</span>
          </p>
        </div>
        <span data-rise className="t-label hidden shrink-0 items-center gap-3 text-phos md:flex">
          Scroll to continue diagnostic
          <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-rule">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scanY_1.8s_ease-in-out_infinite] bg-diag motion-reduce:animate-none" />
          </span>
        </span>
      </div>
    </section>
  );
}

/* ---------- Interaction ---------- */

function Interaction() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-line] > span", {
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: "[data-head]", start: "top 80%" },
      });
      gsap.from("[data-fade]", {
        y: 24,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-head]", start: "top 70%" },
      });
      gsap.from("[data-track]", {
        scaleX: 0,
        duration: 1.6,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-track]", start: "top 85%" },
      });
      // The frame closes in on the unit as it scrolls into place: target lock.
      gsap.fromTo(
        "[data-lockframe]",
        { inset: "-8%" },
        {
          inset: "0%",
          ease: "none",
          scrollTrigger: { trigger: "[data-unit]", start: "top bottom", end: "center center", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const lines = ["It reads", "intent before", "you move."];

  return (
    <section
      ref={root}
      aria-labelledby="interaction-title"
      className={`relative grid items-center gap-16 py-28 lg:min-h-svh lg:grid-cols-12 lg:gap-8 lg:py-36 ${GUTTER}`}
    >
      <div className="lg:col-span-6">
        <h2
          id="interaction-title"
          data-head
          className="t-wide text-[clamp(2.4rem,4.4vw,5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-phos"
        >
          {lines.map((l) => (
            <span key={l} data-line className="block overflow-hidden pb-[0.06em]">
              <span className="block lg:whitespace-nowrap">{l}</span>
            </span>
          ))}
        </h2>
        <p data-fade className="mt-8 max-w-[50ch] text-lg leading-relaxed text-dim">
          Interaction test, live. Companion unit VX-02 measures how fast it can read what you want: intent before
          movement, a response inside twelve milliseconds, tone matched to whoever stands in front of it. This is
          the future of intelligent interaction, running in your browser.
        </p>
        <div data-fade className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <PrimaryAction to="/systems">
            Explore systems
          </PrimaryAction>
          <TextAction to="/about">
            Read the origin
          </TextAction>
        </div>

        <dl data-fade className="mt-14 border-t border-rule">
          {[
            ["Intent prediction", "Adaptive", 0.86],
            ["Response latency", "12 ms", 0.94],
            ["Social calibration", "Friendly", 0.72],
          ].map(([k, v, level]) => (
            <div key={k} className="border-b border-rule py-4">
              <div className="flex items-baseline gap-4">
                <dt className="t-label text-dim">{k}</dt>
                <span aria-hidden="true" className="flex-1 border-b border-dotted border-steel" />
                <dd className="t-label text-phos">{v}</dd>
              </div>
              <div aria-hidden="true" className="mt-3 h-px bg-steel">
                <div data-track className="h-px origin-left bg-diag" style={{ transform: `scaleX(${level})` }} />
              </div>
            </div>
          ))}
        </dl>
        <p data-fade className="t-label mt-5 text-dim">
          <span className="text-diag">[OK]</span> Interaction test passed
        </p>
      </div>

      <div data-unit className="relative h-[52svh] min-h-[380px] lg:col-span-6 lg:col-start-7 lg:h-[82svh]">
        <SplineScene scene={scenes.companion} className="h-full w-full" label="Waking companion" />
        <div data-lockframe className="pointer-events-none absolute inset-0 text-phos/60">
          <Brackets size={20} />
          <span className="t-label absolute top-3 left-4 text-dim">VX-02 · Companion</span>
          <span className="t-label absolute top-3 right-4 text-diag">Friendly</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Module scan (horizontal on desktop) ---------- */

function ModulePanel({ m, index }) {
  return (
    <article
      data-panel
      className="group relative w-full shrink-0 lg:w-[min(56vw,60rem)] motion-reduce:lg:w-[min(70vw,60rem)]"
      aria-labelledby={`panel-${m.id}`}
    >
      <TransitionLink to={`/systems#${m.id}`} data-lock={`Inspect ${m.name}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-panel">
          {m.image ? (
            <img
              data-scanimg
              src={m.image}
              alt={m.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
            />
          ) : (
            <WhenNear data-scanimg className="h-full w-full" role="img" aria-label={m.alt}>
              <Galaxy
                density={1.4}
                glowIntensity={0.25}
                saturation={0}
                hueShift={180}
                twinkleIntensity={0.4}
                rotationSpeed={0.06}
                starSpeed={0.3}
                speed={0.8}
                mouseInteraction={false}
                transparent={false}
              />
            </WhenNear>
          )}
          {/* Hover: interference bands roll over the image */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgb(5_6_7/0.55)_0_2px,transparent_2px_6px)] opacity-0 transition-opacity duration-500 group-hover:animate-[bands_1.2s_linear_infinite] group-hover:opacity-100 motion-reduce:group-hover:animate-none"
          />
          <span data-scanline aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-diag opacity-0" />
          <span className="text-phos/80">
            <Brackets size={16} />
          </span>
          <span className="t-label absolute bottom-3 left-4 text-phos">
            {m.code} · {String(index + 1).padStart(2, "0")}/04
          </span>
          <span className="t-label absolute right-4 bottom-3">
            {m.specs.at(-1)[1] === "Online" ? (
              <span className="text-diag">[OK] Online</span>
            ) : (
              <span className="text-warn">[..] {m.specs.at(-1)[1]}</span>
            )}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h3 id={`panel-${m.id}`} className="font-display text-[clamp(1.7rem,3vw,2.9rem)] leading-none tracking-[0.02em] text-phos">
            {m.name}
          </h3>
          <p className="t-label text-dim">{m.role}</p>
        </div>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-dim">{m.body}</p>
      </TransitionLink>
    </article>
  );
}

function ModuleScan() {
  const root = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray("[data-panel]").forEach((panel) => {
          const img = panel.querySelector("[data-scanimg]");
          const line = panel.querySelector("[data-scanline]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 95%", end: "left 40%", scrub: true },
          });
          tl.fromTo(img, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", ease: "none" }, 0)
            .fromTo(line, { top: "0%", opacity: 1 }, { top: "100%", opacity: 1, ease: "none" }, 0)
            .to(line, { opacity: 0, duration: 0.05 });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray("[data-panel]").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector("[data-scanimg]"),
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: panel, start: "top 80%" } }
          );
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="modules-title" className="relative overflow-hidden">
      <div
        ref={track}
        className={`flex flex-col gap-20 py-24 lg:h-svh lg:w-max lg:flex-row lg:items-center lg:gap-[7vw] lg:py-0 lg:pr-[12vw] motion-reduce:lg:h-auto motion-reduce:lg:w-auto motion-reduce:lg:flex-col motion-reduce:lg:items-start motion-reduce:lg:py-24 ${GUTTER}`}
      >
        <div className="lg:w-[30vw] lg:max-w-[28rem] lg:shrink-0">
          <h2
            id="modules-title"
            className="t-wide text-[clamp(2.2rem,4vw,4rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-phos"
          >
            Four modules. One machine.
          </h2>
          <p className="mt-6 max-w-[40ch] leading-relaxed text-dim">
            Each module runs its own diagnostic. Scroll to scan them in sequence, or open any one to read its full
            specification.
          </p>
          <div className="mt-8">
            <TextAction to="/systems">
              Full specifications
            </TextAction>
          </div>
        </div>
        {modules.map((m, i) => (
          <ModulePanel key={m.id} m={m} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Close ---------- */

function Close() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-closeframe]",
        { inset: "-6% -4%" },
        { inset: "0% 0%", ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="close-title" className={`py-28 lg:py-40 ${GUTTER}`}>
      <div className="relative px-6 py-20 text-center sm:px-12 lg:py-28">
        <div data-closeframe className="absolute inset-0 text-phos/50">
          <Brackets size={28} />
        </div>
        <Decode
          as="h2"
          id="close-title"
          text="THE SYSTEM IS LEARNING"
          duration={1400}
          className="mx-auto block max-w-[14ch] font-display text-[clamp(2.2rem,6.6vw,6rem)] leading-[1.02] tracking-[0.02em] text-phos"
        />
        <p className="t-label mt-8 text-dim">
          Every visit trains it a little more<span className="caret ml-2 text-diag" />
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <PrimaryAction to="/contact">
            Establish link
          </PrimaryAction>
          <TextAction to="/systems">
            Explore systems
          </TextAction>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

const Home = () => {
  return (
    <main>
      <Hero />

      <div aria-hidden="true" className="border-y border-rule py-6 sm:py-10">
        <CurvedLoop
          marqueeText="Robotics // Humanoid // Cybernetics // AI // Automation // "
          speed={1.6}
          curveAmount={260}
          direction="right"
          interactive
          className="fill-phos font-display"
        />
      </div>

      <Interaction />

      <div aria-hidden="true" className="border-y border-rule py-8">
        <ScrollVelocity
          texts={["Intelligent interfaces // Immersive 3D // ", "Adaptive AI // VORXEN // "]}
          velocity={60}
          className="font-display uppercase text-[12vw] leading-[1.05] sm:text-[7vw] lg:text-[5.4vw]"
          rowClassNames={["text-phos", "t-outline"]}
        />
      </div>

      <ModuleScan />
      <Close />
    </main>
  );
};

export default Home;
