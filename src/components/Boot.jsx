import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { BootContext, POST_LINES } from "../lib/boot";

// Power-on self-test. Runs once per page load, then collapses into a scan
// line that opens onto the site. Click or any key fast-forwards it.
export function BootProvider({ children }) {
  const [booted, setBooted] = useState(false);
  return (
    <BootContext.Provider value={booted}>
      {children}
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
    </BootContext.Provider>
  );
}

function BootScreen({ onDone }) {
  const root = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const counter = { v: 0 };
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const num = root.current.querySelector("[data-count]");
      const tl = gsap.timeline({
        onComplete: () => {
          html.style.overflow = "";
          onDone();
        },
      });
      tlRef.current = tl;

      if (reduced) {
        num.textContent = "100";
        gsap.set("[data-bar]", { scaleX: 1 });
        tl.to(root.current, { autoAlpha: 0, duration: 0.4, delay: 0.6 });
        return;
      }

      tl.from("[data-line]", { autoAlpha: 0, x: -12, duration: 0.35, ease: "expo.out", stagger: 0.24 }, 0.15)
        .to(
          counter,
          {
            v: 100,
            duration: 2.1,
            ease: "power2.inOut",
            onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, "0")),
          },
          0.1
        )
        .to("[data-bar]", { scaleX: 1, duration: 2.1, ease: "power2.inOut" }, 0.1)
        .to("[data-status]", { textContent: "Ready", duration: 0.01 }, ">-0.05")
        .to("[data-panel]", { scaleY: 0.004, duration: 0.45, ease: "expo.in" }, "+=0.25")
        .to("[data-panel]", { scaleX: 0, duration: 0.45, ease: "expo.inOut" })
        .to(root.current, { autoAlpha: 0, duration: 0.5, ease: "power1.out" }, "-=0.15");
    }, root);

    const skip = () => tlRef.current?.timeScale(5);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      html.style.overflow = "";
      ctx.revert();
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      onClick={() => tlRef.current?.timeScale(5)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void px-5"
      role="status"
      aria-label="Loading VORXEN"
    >
      <div data-panel className="w-full max-w-[36rem] origin-center">
        <div className="mb-8 flex items-baseline justify-between border-b border-rule pb-3">
          <span className="font-display text-sm tracking-[0.3em] text-phos">VORXEN</span>
          <span className="t-label text-dim">Power-on self-test</span>
        </div>
        <ul className="space-y-2.5">
          {POST_LINES.map(([state, name, value]) => (
            <li key={name} data-line className="t-label grid grid-cols-[3.5rem_1fr_auto] gap-3 text-phos">
              <span className={state === "OK" ? "text-diag" : "text-warn"}>[{state}]</span>
              <span>{name}</span>
              <span className="text-dim">{value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-end justify-between">
          <span data-status className="t-label text-dim">
            Booting
          </span>
          <span className="font-display text-5xl leading-none text-phos tabular-nums sm:text-6xl" data-count>
            000
          </span>
        </div>
        <div className="mt-4 h-px bg-steel">
          <div data-bar className="h-px origin-left scale-x-0 bg-diag" />
        </div>
        <p className="t-label mt-6 text-dim">Press any key to skip</p>
      </div>
    </div>
  );
}
