import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Full-viewport section wrapper with consistent padding and a centered
 * max-width content well. Use this for any full-page section so spacing
 * stays uniform across the site.
 */
export default function Section({
  id,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        // Height matches the space below the pinned header, so the snapped
        // section fills the viewport exactly and its content reads centered
        // (a plain `min-h-screen` section would sit ~header-height too low).
        "min-h-[calc(100vh_-_var(--header-h))] flex items-center justify-center",
        "px-6 py-24 md:px-10 md:py-32 lg:px-16",
        // Scroll-snap target: the page locks onto each section (see
        // `scroll-snap-type` on html in index.css). The pinned header's
        // height is already accounted for via `scroll-padding-top`.
        "snap-start",
        "snap-always",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="w-full max-w-content">{children}</div>
    </section>
  );
}
