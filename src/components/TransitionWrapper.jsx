import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap, prefersReducedMotion } from "../lib/gsap";

import { TransitionContext } from "../lib/transition";

const routeName = (to) => {
  const path = to.split("#")[0];
  return path === "/" ? "/core" : path;
};

// Route changes scan out (a line sweeps down, leaving black), swap, and
// scan back in.
const TransitionWrapper = ({ children }) => {
  const navigate = useNavigate();
  const fillRef = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (to) => {
      if (busy.current) return;
      if (prefersReducedMotion()) {
        navigate(to);
        return;
      }
      busy.current = true;
      const fill = fillRef.current;
      const line = lineRef.current;
      const label = labelRef.current;
      const h = () => window.innerHeight;
      label.textContent = `Loading ${routeName(to)}`;

      gsap
        .timeline({ onComplete: () => (busy.current = false) })
        .set(fill, { transformOrigin: "50% 0%", scaleY: 0 })
        .set(line, { y: 0, autoAlpha: 1 })
        .to(fill, { scaleY: 1, duration: 0.6, ease: "expo.inOut" }, 0)
        .to(line, { y: h, duration: 0.6, ease: "expo.inOut" }, 0)
        .to(label, { autoAlpha: 1, duration: 0.15 }, 0.35)
        .add(() => navigate(to))
        .set(fill, { transformOrigin: "50% 100%" }, "+=0.2")
        .set(line, { y: 0 })
        .to(label, { autoAlpha: 0, duration: 0.15 })
        .to(fill, { scaleY: 0, duration: 0.75, ease: "expo.inOut" })
        .to(line, { y: h, duration: 0.75, ease: "expo.inOut" }, "<")
        .set(line, { autoAlpha: 0 });
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
        <div ref={fillRef} className="absolute inset-0 scale-y-0 bg-void" />
        <div ref={lineRef} className="invisible absolute inset-x-0 top-0 h-px bg-diag" />
        <span
          ref={labelRef}
          className="t-label invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-dim"
        />
      </div>
    </TransitionContext.Provider>
  );
};

export default TransitionWrapper;
