import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/gsap";

const GLYPHS = "01<>/\\#+=*-_ABCDEFHKLMNRSTVXZ";

// Characters resolve out of glyph noise, left to right.
// `start` (boolean) triggers it manually; otherwise it runs when scrolled into view.
export default function Decode({
  text,
  as = "span",
  className = "",
  start,
  delay = 0,
  duration = 900,
  ...rest
}) {
  const Tag = as;
  const ref = useRef(null);
  const manual = typeof start === "boolean";
  const [reduced] = useState(prefersReducedMotion);
  const [seen, setSeen] = useState(false);
  const [out, setOut] = useState(null);
  const active = reduced || (manual ? start : seen);

  useEffect(() => {
    if (manual || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [manual, reduced]);

  useEffect(() => {
    if (!active || reduced) return;
    let raf = 0;
    let t0 = 0;
    const chars = [...text];
    const tick = (now) => {
      if (!t0) t0 = now + delay;
      const p = Math.max(0, Math.min(1, (now - t0) / duration));
      const solved = Math.floor(p * chars.length);
      if (p >= 1) {
        setOut(null);
        return;
      }
      setOut(
        chars
          .map((c, i) => {
            if (i < solved || c === " ") return c;
            if (now < t0) return " ";
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          })
          .join("")
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, text, delay, duration]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ opacity: active ? 1 : 0 }}>
        {out ?? text}
      </span>
    </Tag>
  );
}
