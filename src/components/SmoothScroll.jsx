import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollSmoother, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import { scrollToId } from "../lib/scroll";

// Created as the first child of the content so it exists before any page
// registers its ScrollTriggers.
function SmootherInit() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1,
      effects: true,
      normalizeScroll: false,
    });
    return () => smoother.kill();
  }, []);
  return null;
}

const SmoothScroll = ({ children }) => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.effects().forEach((t) => t.kill());
      smoother.effects("[data-speed], [data-lag]");
    }
    if (!hash) scrollToId(null, false);
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) scrollToId(hash.slice(1), false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <SmootherInit />
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
