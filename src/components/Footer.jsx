import { useLayoutEffect, useRef } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import SplineScene from "./SplineScene";
import Socials from "./Socials";
import TransitionLink from "./TransitionLink";
import Brackets from "./Brackets";
import { Logo } from "./Header";
import { channels, modules, scenes } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { scrollToId } from "../lib/scroll";

const Footer = () => {
  const root = useRef(null);
  const { pathname } = useLocation();

  // The giant wordmark scans in from the top as the footer arrives.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mark]",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "none",
          scrollTrigger: { trigger: "[data-mark]", start: "top bottom", end: "top 82%", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [pathname]);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-rule bg-void px-5 pt-16 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Logo />
          <p className="max-w-[30ch] text-[0.95rem] leading-relaxed text-dim">
            Advanced AI and robotics experiences that anticipate, adapt, and evolve.
          </p>
          <Socials className="flex-col gap-y-1" />
        </div>

        <div className="relative h-64 text-dim sm:h-80 lg:col-span-6 lg:h-[26rem]">
          <SplineScene scene={scenes.footer} className="h-full w-full" label="Linking" />
          <Brackets size={16} />
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-1">
          <nav aria-label="Footer">
            <p className="t-label mb-3 text-dim">Channels</p>
            <ul className="space-y-1.5">
              {channels.map(({ to, label }) => (
                <li key={to}>
                  <TransitionLink to={to} className="text-[1.05rem] text-phos transition-colors hover:text-diag">
                    {label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="t-label mb-3 text-dim">Modules</p>
            <ul className="space-y-1.5">
              {modules.map((m) => (
                <li key={m.id}>
                  <TransitionLink to={`/systems#${m.id}`} className="text-[1.05rem] text-phos transition-colors hover:text-diag">
                    {m.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="t-label mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5 text-dim">
        <span>
          Designed &amp; made by <span className="text-phos">Rizwan Waseem</span>
        </span>
        <span>© 2026 VORXEN · A concept system</span>
        <button type="button" onClick={() => scrollToId(null)} className="py-1 transition-colors hover:text-phos">
          Back to top <FiArrowUp aria-hidden="true" className="inline align-[-0.15em]" />
        </button>
      </div>

      <p
        data-mark
        aria-hidden="true"
        className="font-display -mb-[0.18em] mt-6 text-center text-[15.2vw] leading-[0.9] tracking-[-0.01em] text-phos select-none"
      >
        VORXEN
      </p>
    </footer>
  );
};

export default Footer;
