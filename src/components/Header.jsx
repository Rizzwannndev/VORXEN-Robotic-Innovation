import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TransitionLink from "./TransitionLink";
import SoundPlayer from "./SoundPlayer";
import Decode from "./Decode";
import Socials from "./Socials";
import { channels } from "../data/site";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import { useBooted } from "../lib/boot";

export const Logo = ({ className = "" }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <svg aria-hidden="true" viewBox="0 -960 960 960" className="h-7 w-7 fill-phos">
      <path d="M200-200v-80h560v80H200Zm14-160 266-400 266 400H214Zm266-80Zm-118 0h236L480-616 362-440Z" />
    </svg>
    <span className="font-display text-[0.95rem] tracking-[0.18em]">VORXEN</span>
  </span>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const booted = useBooted();
  const barRef = useRef(null);
  const menuRef = useRef(null);

  // Enter after boot; hide while scrolling down, return on scroll up.
  useEffect(() => {
    if (!booted) return;
    const bar = barRef.current;
    gsap.fromTo(bar, { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", delay: 0.2 });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 160;
        gsap.to(bar, { yPercent: hide ? -110 : 0, duration: 0.5, ease: "expo.out", overwrite: "auto" });
      },
    });
    return () => st.kill();
  }, [booted]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (prefersReducedMotion()) {
      gsap.set(menu, { autoAlpha: open ? 1 : 0, clipPath: "inset(0 0 0% 0)" });
      return;
    }
    gsap.to(menu, {
      clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
      autoAlpha: 1,
      duration: 0.7,
      ease: "expo.inOut",
      onComplete: () => !open && gsap.set(menu, { autoAlpha: 0 }),
    });
    if (open) gsap.fromTo(menu.querySelectorAll("[data-item]"), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.06, delay: 0.25 });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        ref={barRef}
        className="invisible fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12"
      >
        <TransitionLink to="/" data-lock="Core" aria-label="VORXEN home">
          <Logo />
        </TransitionLink>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          <span aria-hidden="true" className="h-px w-[min(18vw,16rem)] bg-rule" />
          {channels.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <TransitionLink
                key={to}
                to={to}
                className={`t-label group relative inline-flex items-center gap-2 py-2 transition-colors ${active ? "text-phos" : "text-dim hover:text-phos"}`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 transition-colors ${active ? "bg-diag" : "bg-steel group-hover:bg-dim"}`}
                />
                {label}
              </TransitionLink>
            );
          })}
          <SoundPlayer />
        </nav>

        <button
          type="button"
          className="t-label relative z-[51] py-2 text-phos md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-void px-5 pt-24 pb-8 md:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ul className="border-t border-rule">
            {channels.map(({ to, label }) => (
              <li key={to} data-item className="border-b border-rule">
                <TransitionLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-5 ${pathname === to ? "text-phos" : "text-dim"}`}
                >
                  <span className="font-display text-[2.1rem] leading-none tracking-[0.04em]">
                    {open ? <Decode text={label.toUpperCase()} start={open} duration={600} /> : label.toUpperCase()}
                  </span>
                  <span className="t-label">{pathname === to ? "Active" : to === "/" ? "/core" : to}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div data-item className="space-y-6">
          <SoundPlayer />
          <Socials />
        </div>
      </div>
    </>
  );
};

export default Header;
