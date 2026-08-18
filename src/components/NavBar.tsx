import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface NavItem {
  id: 'home' | 'about' | 'projects' | 'publications' | 'contact';
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
  { id: 'home', label: 'Home', matches: ['home'] },
  { id: 'about', label: 'About', matches: ['about'] },
  {
    id: 'projects',
    label: 'Projects',
    matches: ['projects', 'all-projects', /^project-\d+$/],
  },
  {
    id: 'publications',
    label: 'Publications',
    matches: ['publications', 'all-publications', /^publication-\d+$/],
  },
  { id: 'contact', label: 'Contact', matches: ['contact'] },
];

interface NavBarProps {
  /**
   * Id of the section most-prominently intersecting the viewport, as
   * reported by `useActiveSection`.
   */
  activeId: string | null;
}

function resolveActiveItem(activeId: string | null): NavItem['id'] | null {
  if (!activeId) return null;
  for (const item of NAV_ITEMS) {
    for (const m of item.matches) {
      if (typeof m === 'string') {
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

  // Close the mobile menu whenever the destination hash changes — covers
  // both nav-link clicks and any external hashchange.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, [open]);

  const activeItem = resolveActiveItem(activeId);
  const onHome = activeItem === 'home' || activeItem === null; // initial mount: nothing is matched
  const linkClass = (itemId: NavItem['id']) =>
    [
      'text-xs md:text-sm uppercase tracking-[0.25em] transition-colors duration-200',
      activeItem === itemId
        ? 'text-primary-light'
        : 'text-muted hover:text-primary-light',
    ].join(' ');

  return (
    <header
      style={{ height: 'var(--header-h)' }}
      className={[
        // `sticky top-0` keeps the header in normal flow right under the
        // hero at scroll=0, then pins it to the top of the viewport once
        // the user scrolls far enough that its top edge would go above `top:0`.
        // Height matches `--header-h` in index.css, which the scroll-snap
        // offset also reads, so sections land exactly flush below the header.
        'sticky top-0 z-50',
        'transition-colors duration-300 ease-out',
        onHome
          ? 'bg-background border-b border-transparent'
          : 'bg-background/95 backdrop-blur-md border-b border-muted/20 shadow-lg shadow-background/40',
      ].join(' ')}
    >
      <nav className="mx-auto flex h-full max-w-content items-center justify-between px-6 md:px-10">
        <a
          href="#home"
          className="font-semibold uppercase tracking-[0.3em] text-primary-light text-sm"
          aria-label="Home"
        >
          JR
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={linkClass(item.id)}
                aria-current={activeItem === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative inline-flex h-10 w-10 items-center justify-center text-primary-light"
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
            className="absolute left-0 right-0 top-full md:hidden border-t border-muted/20 bg-background/95 backdrop-blur-md"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={[
                      'block py-3 text-base',
                      linkClass(item.id),
                    ].join(' ')}
                    aria-current={activeItem === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
