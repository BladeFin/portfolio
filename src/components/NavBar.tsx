import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import linkedinLogo from "../assets/LI-In-Bug.png";
import { links } from "../content/data";

interface NavItem {
  // id: "home" | "about" | "projects" | "publications" | "contact";
  id: "home" | "about" | "projects" | "contact";
  label: string;
  /**
   * Ids that count as "this section is in view" for the highlight. The
   * Projects and Publications entries accept any of the sub-ids created by
   * the featured sections (`project-2`, `publication-3`, etc.) and the
   * condensed "see all" ids.
   */
  matches: Array<string | RegExp>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", matches: ["home"] },
  { id: "about", label: "About", matches: ["about"] },
  {
    id: "projects",
    label: "Projects",
    matches: ["projects", "all-projects", /^project-\d+$/],
  },
  // {
  //   id: "publications",
  //   label: "Publications",
  //   matches: ["publications", "all-publications", /^publication-\d+$/],
  // },
  { id: "contact", label: "Contact", matches: ["contact"] },
];

interface NavBarProps {
  /**
   * Id of the section most-prominently intersecting the viewport, as
   * reported by `useActiveSection`.
   */
  activeId: string | null;
}

function resolveActiveItem(activeId: string | null): NavItem["id"] | null {
  if (!activeId) return null;
  for (const item of NAV_ITEMS) {
    for (const m of item.matches) {
      if (typeof m === "string") {
        if (m === activeId) return item.id;
      } else if (m.test(activeId)) {
        return item.id;
      }
    }
  }
  return null;
}

export default function NavBar({ activeId }: NavBarProps) {
  const [open, setOpen] = useState(false);
  // `compact` collapses the inline links into the hamburger when the nav
  // doesn't have room for them (e.g. a half-width desktop window). The
  // LinkedIn logo + name always stay visible.
  const [compact, setCompact] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLUListElement | null>(null);

  // Close the mobile menu whenever the destination hash changes — covers
  // both nav-link clicks and any external hashchange.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  // Close the menu if it's open when the layout expands back to inline links.
  useEffect(() => {
    if (!compact) setOpen(false);
  }, [compact]);

  // Detect whether the inline links fit: compare the nav's available width
  // against the natural width of the brand cluster + links. Re-measures on
  // resize and once the (async-loaded) fonts finish loading.
  useEffect(() => {
    const nav = navRef.current;
    const brand = brandRef.current;
    const linksEl = linksRef.current;
    if (!nav || !brand || !linksEl) return;

    // The links may be display:none when compact, which reports 0 width —
    // so force a hidden, off-layout measurement frame to read their true size.
    const linksWidth = () => {
      const prev = {
        display: linksEl.style.display,
        visibility: linksEl.style.visibility,
        position: linksEl.style.position,
      };
      linksEl.style.display = "flex";
      linksEl.style.visibility = "hidden";
      linksEl.style.position = "absolute";
      const width = linksEl.offsetWidth;
      linksEl.style.display = prev.display;
      linksEl.style.visibility = prev.visibility;
      linksEl.style.position = prev.position;
      return width;
    };

    const measure = () => {
      const needed = brand.offsetWidth + linksWidth() + 64; // 64px breathing room
      setCompact(nav.clientWidth < needed);
    };

    const onResize = () => requestAnimationFrame(measure);
    measure();
    window.addEventListener("resize", onResize);
    document.fonts.ready
      .then(() => requestAnimationFrame(measure))
      .catch(() => {});
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activeItem = resolveActiveItem(activeId);
  const onHome = activeItem === "home" || activeItem === null; // initial mount: nothing is matched
  const linkClass = (itemId: NavItem["id"]) =>
    [
      "text-xs md:text-sm uppercase tracking-[0.25em] transition-colors duration-200",
      activeItem === itemId
        ? "text-primary-light"
        : "text-muted hover:text-primary-light",
    ].join(" ");
  // Mobile menu items are larger (text-base) and must NOT inherit the
  // desktop `text-xs md:text-sm` from linkClass, or the two font sizes clash.
  const mobileLinkClass = (itemId: NavItem["id"]) =>
    [
      "block py-3 text-base uppercase tracking-[0.25em] transition-colors duration-200",
      activeItem === itemId
        ? "text-primary-light"
        : "text-muted hover:text-primary-light",
    ].join(" ");

  return (
    <header
      style={{ height: "var(--header-h)" }}
      className={[
        // `sticky top-0` keeps the header in normal flow right under the
        // hero at scroll=0, then pins it to the top of the viewport once
        // the user scrolls far enough that its top edge would go above `top:0`.
        // Height matches `--header-h` in index.css, which the scroll-snap
        // offset also reads, so sections land exactly flush below the header.
        "sticky top-0 z-50",
        "transition-colors duration-300 ease-out",
        onHome
          ? "bg-background border-b border-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-muted/20 shadow-lg shadow-background/40",
      ].join(" ")}
    >
      {/* Full-width with the same padding as sections, so the left edge of
          the brand/logo lines up with the left edge of section content. */}
      <nav className="flex h-full items-center px-6 md:px-10 lg:px-16">
        <div
          ref={navRef}
          className="mx-auto flex w-full max-w-content items-center justify-between"
        >
          <div ref={brandRef} className="flex shrink-0 items-center gap-3">
            {/* Intentional plain https link (NOT linkedin://): on mobile,
                LinkedIn's Universal/App Links open the app automatically and
                fall back to the website when it isn't installed. */}
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="shrink-0 transition-opacity duration-200 hover:opacity-80"
            >
              <img
                src={linkedinLogo}
                alt="LinkedIn"
                className="h-5 w-auto md:h-6"
              />
            </a>
            <a
              href="#home"
              className="shrink-0 whitespace-nowrap font-semibold uppercase tracking-[0.3em] text-primary-light text-sm"
              aria-label="Home"
            >
              Connor K
            </a>
          </div>

          {/* Inline links — shown only when there's room (see `compact`). */}
          <ul
            ref={linksRef}
            className={compact ? "hidden" : "hidden md:flex items-center gap-8"}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={linkClass(item.id)}
                  aria-current={activeItem === item.id ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm uppercase tracking-[0.25em] underline underline-offset-4 transition-colors duration-200 text-muted hover:text-primary-light"
              >
                Resume
                <span aria-hidden="true" className="ml-1 inline-block">
                  ↗
                </span>
              </a>
            </li>
          </ul>

          {/* Hamburger — shown when compact (mobile or a narrow window). */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={
              compact
                ? "relative inline-flex h-10 w-10 items-center justify-center text-primary-light"
                : "hidden"
            }
          >
            <span className="sr-only">Toggle navigation</span>
            <span aria-hidden="true" className="relative block h-4 w-6">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 block h-0.5 w-6 bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-1.5 block h-0.5 w-6 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-3 block h-0.5 w-6 bg-current"
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full border-t border-muted/40 bg-[#262626] shadow-lg shadow-black/40"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass(item.id)}
                    aria-current={activeItem === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base uppercase tracking-[0.25em] underline underline-offset-4 transition-colors duration-200 text-muted hover:text-primary-light"
                >
                  Resume
                  <span aria-hidden="true" className="ml-1">
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
