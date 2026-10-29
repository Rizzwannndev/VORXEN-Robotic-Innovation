import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

// A scene that fails to download must not take the page down with it.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail?.();
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="t-label text-warn">Signal lost</p>
          <button
            type="button"
            onClick={this.props.onRetry}
            className="t-label mt-3 py-2 text-phos underline decoration-rule hover:text-diag"
          >
            Retry scene
          </button>
        </div>
      </div>
    );
  }
}

// Mounts a Spline scene only when it nears the viewport, fades it in once
// loaded, and pauses rendering while it is off screen. The canvas runs 64px
// taller than its box and is clipped, which keeps the "Built with Spline"
// badge out of view without painting a cover over the scene.
export default function SplineScene({
  scene,
  className = "",
  eager = false,
  label = "Acquiring signal",
  onReady,
}) {
  const ref = useRef(null);
  const appRef = useRef(null);
  const [mounted, setMounted] = useState(eager);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (mounted) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!ready) return;
    const io = new IntersectionObserver(([entry]) => {
      const app = appRef.current;
      if (!app) return;
      if (entry.isIntersecting) app.play();
      else app.stop();
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ready]);

  const handleLoad = useCallback(
    (app) => {
      appRef.current = app;
      setReady(true);
      onReady?.(app);
    },
    [onReady]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {mounted && (
        <SceneBoundary
          key={attempt}
          onFail={() => {
            // Hosted scenes occasionally drop mid-download: retry once quietly.
            if (attempt === 0) setTimeout(() => setAttempt(1), 1500);
            else setFailed(true);
          }}
          onRetry={() => {
            setFailed(false);
            setAttempt((n) => n + 1);
          }}
        >
          <Suspense fallback={null}>
            <div className="absolute inset-x-0 top-0 h-[calc(100%+64px)]">
              <Spline
                scene={scene}
                onLoad={handleLoad}
                className="absolute! inset-0 transition-opacity duration-[1400ms] ease-out"
                style={{ opacity: ready ? 1 : 0 }}
              />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
      {!ready && !failed && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="t-label text-dim">
            {label}
            <span className="caret ml-2" />
          </span>
        </div>
      )}
    </div>
  );
}
