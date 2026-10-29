// Four calibration corners around the nearest positioned parent.
export default function Brackets({ className = "", size }) {
  return (
    <span
      aria-hidden="true"
      className={`brackets pointer-events-none absolute inset-0 ${className}`}
      style={size ? { "--bk": `${size}px` } : undefined}
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
