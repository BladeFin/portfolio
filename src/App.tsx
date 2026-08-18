import BackgroundDots from './components/BackgroundDots';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProjects from './components/FeaturedProjects';
import Projects from './components/Projects';
import FeaturedPublications from './components/FeaturedPublications';
import Publications from './components/Publications';
import Contact from './components/Contact';
import {
  featuredProjects,
  featuredPublications,
} from './content/data';
import { useActiveSection } from './hooks/useActiveSection';

// All ids the observer tracks. Featured-project sub-sections and
// "see all" sections all count toward the same nav-link highlight.
const ALL_OBSERVED_IDS = [
  'home',
  'about',
  // Featured projects (first is `projects`, others are `project-N`).
  'projects',
  ...Array.from(
    { length: Math.max(0, featuredProjects.length - 1) },
    (_, i) => `project-${i + 2}`,
  ),
  'all-projects',
  // Featured publications (first is `publications`, others are `publication-N`).
  'publications',
  ...Array.from(
    { length: Math.max(0, featuredPublications.length - 1) },
    (_, i) => `publication-${i + 2}`,
  ),
  'all-publications',
  'contact',
] as const;

export default function App() {
  const activeId = useActiveSection(ALL_OBSERVED_IDS);

  return (
    <div className="bg-background min-h-screen">
      <BackgroundDots />
      <main>
        <Hero />
        {/*
          The navbar lives in normal flow right under the hero, so at
          scroll=0 it sits "just below the home view". As the user scrolls,
          it rises with the page until its top reaches the viewport, where
          `position: sticky; top: 0` keeps it pinned for the rest of
          the scroll path.
        */}
        <NavBar activeId={activeId} />
        <About />
        <FeaturedProjects projects={featuredProjects} />
        <Projects />
        <FeaturedPublications publications={featuredPublications} />
        <Publications />
        <Contact />
      </main>
      {/* `snap-end` makes the page end a valid scroll-snap position: instead
          of mandatory snap yanking back to Contact, scrolling past it rests
          with the footer at the bottom of the viewport. */}
      <footer className="snap-end border-t border-muted/20 py-10 text-center text-xs uppercase tracking-[0.25em] text-muted">
        © {new Date().getFullYear()} Jordan Reeves · Built with React, Vite
        &amp; Tailwind
      </footer>
    </div>
  );
}
