import { useLocation } from "react-router-dom";
import { useTransition } from "../lib/transition";
import { scrollToId } from "../lib/scroll";

// A real link (crawlable, middle-clickable) that runs the scan transition.
const TransitionLink = ({ to, children, onClick, ...rest }) => {
  const { go } = useTransition();
  const { pathname } = useLocation();
  const [path, hash] = to.split("#");

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (path === pathname) {
      if (hash) scrollToId(hash);
      else scrollToId(null);
      return;
    }
    go(to);
  };

  return (
    <a href={to} onClick={handleClick} aria-current={!hash && path === pathname ? "page" : undefined} {...rest}>
      {children}
    </a>
  );
};

export default TransitionLink;
