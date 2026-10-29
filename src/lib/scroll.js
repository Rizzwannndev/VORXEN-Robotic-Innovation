import { ScrollSmoother } from "./gsap";

// Scroll to an element id (or the top when id is null), through the
// smoother when it is running.
export function scrollToId(id, smooth = true) {
  const smoother = ScrollSmoother.get();
  const el = id ? document.getElementById(id) : null;
  if (id && !el) return;
  if (smoother) {
    smoother.scrollTo(el || 0, smooth, el ? "top 96px" : undefined);
  } else if (el) {
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  } else {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }
}
