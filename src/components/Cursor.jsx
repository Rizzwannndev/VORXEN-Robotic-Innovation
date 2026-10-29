import { useEffect, useRef, useState } from "react";
import { isFinePointer, prefersReducedMotion } from "../lib/gsap";

const LOCKABLE = "a, button, input, textarea, select, [data-lock]";
const IDLE = 26;
const PAD = 8;

// Target-lock cursor: four calibration brackets that snap to the bounds of
// whatever interactive element sits under the pointer.
const Cursor = () => {
  const [enabled] = useState(() => isFinePointer() && !prefersReducedMotion());
  const frameRef = useRef(null);
  const dotRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add("has-lock-cursor");

    const frame = frameRef.current;
    const dot = dotRef.current;
    const tag = tagRef.current;
    const cur = { x: -100, y: -100, w: IDLE, h: IDLE };
    let mx = -100;
    let my = -100;
    let target = null;
    let visible = false;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        cur.x = mx;
        cur.y = my;
        frame.style.opacity = dot.style.opacity = "1";
      }
    };
    const onOver = (e) => {
      const t = e.target.closest?.(LOCKABLE) || null;
      if (t === target) return;
      target = t;
      const label = t?.dataset.lock || "";
      tag.textContent = label;
      tag.style.opacity = label ? "1" : "0";
      frame.dataset.locked = t ? "true" : "false";
    };
    const onLeave = () => {
      visible = false;
      frame.style.opacity = dot.style.opacity = "0";
    };
    const onDown = () => frame.classList.add("scale-90");
    const onUp = () => frame.classList.remove("scale-90");

    const loop = () => {
      let tx = mx;
      let ty = my;
      let tw = IDLE;
      let th = IDLE;
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        if (r.width < window.innerWidth * 0.8 && r.height < window.innerHeight * 0.6) {
          tx = r.left + r.width / 2;
          ty = r.top + r.height / 2;
          tw = r.width + PAD * 2;
          th = r.height + PAD * 2;
        }
      }
      const k = 0.24;
      cur.x += (tx - cur.x) * k;
      cur.y += (ty - cur.y) * k;
      cur.w += (tw - cur.w) * k;
      cur.h += (th - cur.h) * k;
      frame.style.transform = `translate3d(${cur.x - cur.w / 2}px, ${cur.y - cur.h / 2}px, 0)`;
      frame.style.width = `${cur.w}px`;
      frame.style.height = `${cur.h}px`;
      dot.style.transform = `translate3d(${mx - 2}px, ${my - 2}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-lock-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference">
      <div
        ref={frameRef}
        data-locked="false"
        className="brackets absolute top-0 left-0 text-phos opacity-0 transition-[scale,opacity] duration-150 [--bk:7px] data-[locked=true]:[--bk:10px]"
      >
        <i />
        <i />
        <i />
        <i />
        <span
          ref={tagRef}
          className="t-label absolute top-full left-0 mt-2 whitespace-nowrap text-[10px] opacity-0 transition-opacity"
        />
      </div>
      <div ref={dotRef} className="absolute top-0 left-0 h-1 w-1 bg-phos opacity-0" />
    </div>
  );
};

export default Cursor;
