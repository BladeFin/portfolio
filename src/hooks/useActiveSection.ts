import { useEffect, useState } from 'react';

/**
 * Tracks which of the supplied `ids` is the section most prominently
 * intersecting the viewport, using a single shared `IntersectionObserver`.
 *
 * The hook is intentionally conservative: it only flips the active id once
 * a section is more than 40 % from the top and bottom of the viewport, so the
 * highlight stays stable while the user scrolls inside a section.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track the current visibility ratio per section across callbacks so we
    // can pick the most prominent one even when entries arrive out of order.
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        setActiveId(bestRatio > 0 ? bestId : null);
      },
      {
        // Only consider content near the vertical middle of the viewport.
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
