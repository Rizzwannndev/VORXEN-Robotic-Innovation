import { useEffect, useRef, useState } from "react";

// Mounts children only while near the viewport (keeps WebGL contexts few).
export default function WhenNear({ children, className = "", ...rest }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`relative ${className}`} {...rest}>
      {near && children}
    </div>
  );
}
