import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Decode from "../components/Decode";
import Brackets from "../components/Brackets";
import Galaxy from "../components/Galaxy";
import WhenNear from "../components/WhenNear";
import { PrimaryAction } from "../components/Action";
import { modules } from "../data/site";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap";
import { scrollToId } from "../lib/scroll";

const GUTTER = "px-5 sm:px-8 lg:px-12";

function ModuleVisual({ m }) {
  if (m.image) {
    return <img data-reveal src={m.image} alt={m.alt} loading="lazy" className="h-full w-full object-cover" />;
  }
  return (
    <WhenNear className="h-full w-full" role="img" aria-label={m.alt}>
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
  );
}

/* Index table: hover a row to preview its module beside the pointer. */
function ModuleIndex() {
  const previewRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const fine = typeof window !== "undefined" && isFinePointer();

  useEffect(() => {
    if (!fine) return;
    const el = previewRef.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "expo.out" });
    const move = (e) => {
      xTo(e.clientX + 28);
      yTo(e.clientY - 90);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [fine]);

  const current = modules.find((m) => m.id === hovered);

  return (
    <div className="relative">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">VORXEN modules</caption>
        <thead>
          <tr className="t-label border-b border-rule text-dim">
            <th scope="col" className="hidden py-3 pr-4 font-normal sm:table-cell">ID</th>
            <th scope="col" className="py-3 pr-4 font-normal">Module</th>
            <th scope="col" className="hidden py-3 pr-4 font-normal md:table-cell">Function</th>
            <th scope="col" className="py-3 text-right font-normal">State</th>
          </tr>
        </thead>
        <tbody onPointerLeave={() => setHovered(null)}>
          {modules.map((m) => (
            <tr
              key={m.id}
              onPointerEnter={() => setHovered(m.id)}
              className="group border-b border-rule transition-colors hover:bg-panel"
            >
              <td className="t-label hidden py-6 pr-4 align-middle text-dim sm:table-cell">{m.code}</td>
              <td className="py-6 pr-4">
                <a
                  href={`#${m.id}`}
                  data-lock={`Jump to ${m.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(m.id);
                  }}
                  className="font-display text-[clamp(1.25rem,3.2vw,2.6rem)] leading-none tracking-[0.02em] text-phos transition-colors group-hover:text-diag"
                >
                  {m.name}
                </a>
              </td>
              <td className="hidden py-6 pr-4 text-dim md:table-cell">{m.role}</td>
              <td className="t-label py-6 text-right">
                <span className={m.specs.at(-1)[1] === "Online" ? "text-diag" : "text-warn"}>{m.specs.at(-1)[1]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {fine && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-30 h-40 w-64 overflow-hidden bg-panel transition-[opacity,clip-path] duration-500 ease-out-expo"
          style={{
            opacity: current ? 1 : 0,
            clipPath: current ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          }}
        >
          {current?.image ? (
            <img src={current.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center t-label text-dim">Live network</div>
          )}
          <span className="text-phos/80">
            <Brackets size={12} />
          </span>
        </div>
      )}
    </div>
  );
}

function SpecSheet({ m, index }) {
  return (
    <section
      id={m.id}
      aria-labelledby={`${m.id}-title`}
      data-sheet
      className={`grid scroll-mt-24 gap-10 border-t border-rule py-20 lg:grid-cols-12 lg:gap-8 lg:py-28 ${GUTTER}`}
    >
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden bg-panel">
          <ModuleVisual m={m} />
          <span data-scanline aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-diag opacity-0" />
          <span className="text-phos/80">
            <Brackets size={18} />
          </span>
          <span className="t-label absolute bottom-3 left-4 text-phos">
            {m.code} · {String(index + 1).padStart(2, "0")}/04
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:col-span-5 lg:pt-4">
        <Decode
          as="h2"
          id={`${m.id}-title`}
          text={m.name.toUpperCase()}
          duration={800}
          className="block font-display text-[clamp(2rem,4.4vw,4.2rem)] leading-[0.98] tracking-[0.02em] text-phos"
        />
        <p className="t-wide mt-4 text-xl font-medium text-phos">{m.role}</p>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-dim">{m.body}</p>

        <dl className="mt-10 border-t border-rule">
          {m.specs.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-4 border-b border-rule py-3.5">
              <dt className="t-label text-dim">{k}</dt>
              <span aria-hidden="true" className="flex-1 border-b border-dotted border-steel" />
              <dd className={`t-label ${v === "Online" ? "text-diag" : v === "Learning" ? "text-warn" : "text-phos"}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const Systems = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-intro]", { y: 30, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.2 });
      gsap.utils.toArray("[data-sheet]").forEach((sheet) => {
        const img = sheet.querySelector("[data-reveal]");
        const line = sheet.querySelector("[data-scanline]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: sheet, start: "top 75%" } });
        if (img) tl.fromTo(img, { clipPath: "inset(0 0 100% 0)", scale: 1.08 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.4, ease: "expo.out" }, 0);
        tl.fromTo(line, { top: "0%", opacity: 1 }, { top: "100%", duration: 1.4, ease: "expo.out" }, 0).to(line, { opacity: 0, duration: 0.2 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <section className={`pt-36 pb-20 lg:pt-44 ${GUTTER}`} aria-labelledby="systems-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1
            id="systems-title"
            data-intro
            className="font-display text-[clamp(3rem,9.5vw,6rem)] leading-[0.9] tracking-[0.02em] text-phos lg:col-span-7"
          >
            Systems
          </h1>
          <p data-intro className="max-w-[44ch] text-lg leading-relaxed text-dim lg:col-span-5">
            Four modules make up VORXEN. Each one is a working part of the same machine, and each one reports its own
            state.
          </p>
        </div>
        <div data-intro className="mt-16">
          <ModuleIndex />
        </div>
      </section>

      {modules.map((m, i) => (
        <SpecSheet key={m.id} m={m} index={i} />
      ))}

      <section className={`border-t border-rule py-24 text-center ${GUTTER}`} aria-labelledby="systems-next">
        <h2 id="systems-next" className="t-wide mx-auto max-w-[18ch] text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          See what the system is for.
        </h2>
        <div className="mt-10 flex justify-center">
          <PrimaryAction to="/about">
            Read the origin
          </PrimaryAction>
        </div>
      </section>
    </main>
  );
};

export default Systems;
