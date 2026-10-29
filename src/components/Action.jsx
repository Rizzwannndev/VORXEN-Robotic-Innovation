import { FiArrowRight } from "react-icons/fi";
import TransitionLink from "./TransitionLink";
import Magnetic from "./Magnetic";

// Primary action: a phosphor plate that a cyan scan wipes across on hover.
export function PrimaryAction({ to, children, type, onClick, disabled }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-diag transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      <span className="relative">{children}</span>
      <FiArrowRight
        aria-hidden="true"
        className="relative transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
      />
    </>
  );
  const cls =
    "t-label group relative inline-flex items-center gap-4 overflow-hidden bg-phos px-6 py-4 text-void transition-opacity disabled:opacity-40";
  return (
    <Magnetic strength={0.25}>
      {to ? (
        <TransitionLink to={to} className={cls}>
          {inner}
        </TransitionLink>
      ) : (
        <button type={type || "button"} className={cls} onClick={onClick} disabled={disabled}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}

// Secondary action: text with a rule that extends on hover.
export function TextAction({ to, children }) {
  return (
    <TransitionLink to={to} className="t-label group inline-flex items-center gap-3 py-3 text-phos">
      {children}
      <span aria-hidden="true" className="h-px w-6 bg-phos transition-[width,background-color] duration-500 ease-out-expo group-hover:w-12 group-hover:bg-diag" />
    </TransitionLink>
  );
}
