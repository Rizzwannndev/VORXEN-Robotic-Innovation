import { FiArrowUpRight } from "react-icons/fi";
import { socials } from "../data/site";

const Socials = ({ className = "" }) => {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {socials.map(({ href, label }) => (
        <li key={label}>
          {!href ? (
            <span className="t-label inline-flex items-center gap-2 py-1 text-dim">
              {label} <span className="text-warn">· Pending</span>
            </span>
          ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="t-label group inline-flex items-center gap-1.5 py-1 text-dim transition-colors hover:text-phos"
          >
            {label}
            <FiArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Socials;
