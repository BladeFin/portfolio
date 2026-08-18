/**
 * Single source of truth for portfolio content.
 *
 * Keeping all copy in one place means UI components stay focused on layout
 * and the content can be edited (or later sourced from MDX / a CMS) without
 * touching component code.
 */

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  /** When true, the project gets its own full-height "case study" section. */
  featured?: boolean;
}

export interface Publication {
  title: string;
  venue: string;
  year: number;
  authors: string[];
  link: string;
  abstract: string;
  /** When true, the publication gets its own full-height featured section. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Glyph — Type Specimen Explorer',
    category: 'Web · Design System',
    description:
      'A searchable specimen library for variable fonts, with live axes previews and OpenType feature toggles. Built so a type designer can answer "what does this look like?" without round-tripping a foundry.',
    tech: ['React', 'TypeScript', 'Vite', 'OpenType.js'],
    link: '#',
    featured: true,
  },
  {
    title: 'Tide — Coastal Forecast Dashboard',
    category: 'Web · Data Vis',
    description:
      'A responsive dashboard layering tide, swell, and wind forecasts on an interactive map. Offline-first via IndexedDB so it stays usable at the cliff edge with no signal.',
    tech: ['SvelteKit', 'MapLibre', 'D3', 'PWA'],
    link: '#',
    featured: true,
  },
  {
    title: 'Quiet Hours',
    category: 'iOS · App',
    description:
      'A focus timer that shapes itself around your calendar, dims distractions on a per-app basis, and keeps an honest streak log you actually want to maintain.',
    tech: ['SwiftUI', 'Combine', 'Widgets'],
    link: '#',
    featured: true,
  },
  {
    title: 'Field Notes CLI',
    category: 'Tooling · OSS',
    description:
      'A small terminal companion for capturing annotated notes against a git repo, with fuzzy search across commits and tags.',
    tech: ['Rust', 'tui-rs', 'git2'],
    link: '#',
  },
  {
    title: 'Print Atlas',
    category: 'Web · Editorial',
    description:
      'A reading-room interface for an independent print magazine archive: paginated scans, search, and per-issue listening guides.',
    tech: ['Next.js', 'Postgres', 'MeiliSearch'],
    link: '#',
  },
];

export const publications: Publication[] = [
  {
    title:
      'Calibration Without Catastrophe: Robust Posterior Estimation for Sparse Surveys',
    venue: 'Journal of Applied Statistics',
    year: 2024,
    authors: ['J. Reeves', 'M. Okafor'],
    link: '#',
    abstract:
      'A reweighting scheme that recovers identifiable posteriors from under-designed survey instruments without the mode-seeking pathologies of common alternatives. We pair the derivation with empirical evidence on three public health data sets where ground truth is partially known.',
    featured: true,
  },
  {
    title: 'Sketching Surfaces, Smoothly: GPU Subdivision for Small Teams',
    venue: 'ACM CHI',
    year: 2023,
    authors: ['J. Reeves', 'S. Park', 'L. Iwasaki'],
    link: '#',
    abstract:
      'We describe a real-time Catmull–Clark subdivision pipeline that fits inside a 50 MB memory budget on commodity hardware, plus an editor that lets non-engineers sculpt meshes with a trackpad and feel the response immediately.',
    featured: true,
  },
  {
    title:
      'Microinteractions for Macroattentional Load: When Motion Is the Wrong Default',
    venue: 'DIS Companion',
    year: 2022,
    authors: ['J. Reeves'],
    link: '#',
    abstract:
      'An empirical study of motion-driven feedback under dual-task load, with design guidelines for accessibility-first motion copy. Highlights the small, costly moments when an animation is delightful for one user and disorienting for another.',
    featured: true,
  },
  {
    title: 'A Field Guide to Composable Color Tokens',
    venue: 'Smashing Magazine',
    year: 2021,
    authors: ['J. Reeves'],
    link: '#',
    abstract:
      'Patterns for organizing design tokens across themes, brands, and density modes without losing semantic intent — illustrated with case studies from three production design systems.',
  },
];

/** Convenience selectors — ordering matches the source array. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
export const featuredPublications: Publication[] = publications.filter(
  (p) => p.featured,
);
