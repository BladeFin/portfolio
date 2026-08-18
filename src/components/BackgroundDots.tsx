import { useEffect, useRef, useState } from "react";

interface Dot {
  /** Rest position (the grid point). */
  x: number;
  y: number;
  /** Current (possibly displaced) position. */
  cx: number;
  cy: number;
}

/**
 * Barely-visible grid of dots that shy away from the cursor.
 *
 * A canvas draws a dot at every grid intersection. Dots near the cursor get
 * pushed away with a quadratic falloff, then ease back to their grid spot
 * once the cursor moves on. The canvas is fixed and pointer-transparent, so
 * it sits above the page background but never intercepts clicks.
 *
 * Tuning knobs (all in this file):
 *  - `spacing`      — grid density in px
 *  - `repelRadius`  — how far the cursor's influence reaches (px)
 *  - `maxPush`      — displacement at closest approach (px)
 *  - `dotAlpha`     — visibility of the dots
 *  - `dotColor`     — reads the `--color-accent` design token (src/index.css)
 *
 * Skipped entirely on touch devices; rendered as a static grid for
 * `prefers-reduced-motion` users.
 */
export default function BackgroundDots() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<"off" | "static" | "animated">("off");

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (!hover.matches) setMode("off");
      else setMode(reduced.matches ? "static" : "animated");
    };
    update();
    hover.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      hover.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (mode === "off") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Dot color from the `--color-accent` design token (R G B channels).
    const channels = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim()
      .split(/\s+/)
      .map(Number);
    const rgb = channels.length === 3 ? channels : [206, 160, 126]; // fallback: bronze
    const dotAlpha = 0.24;
    const dotColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${dotAlpha})`;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = 36;
    const dotRadius = 1.2;
    const repelRadius = 120;
    const maxPush = 20;

    let dots: Dot[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = spacing / 2; y < h; y += spacing) {
        for (let x = spacing / 2; x < w; x += spacing) {
          dots.push({ x, y, cx: x, cy: y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = dotColor;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.cx, d.cy, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < repelRadius && dist > 0.01) {
          // Quadratic falloff: strong near the cursor, fading to nothing at
          // the edge of the influence radius.
          const strength = 1 - dist / repelRadius;
          const push = strength * strength * maxPush;
          d.cx = d.x + (dx / dist) * push;
          d.cy = d.y + (dy / dist) * push;
        } else {
          // Ease back to the grid spot.
          d.cx += (d.x - d.cx) * 0.08;
          d.cy += (d.y - d.cy) * 0.08;
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    window.addEventListener("resize", resize);
    if (mode === "animated") {
      window.addEventListener("mousemove", onMove);
      raf = requestAnimationFrame(tick);
    } else {
      draw(); // static grid, no animation
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [mode]);

  if (mode === "off") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
