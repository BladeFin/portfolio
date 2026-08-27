/**
 * Single source of truth for portfolio content.
 *
 * Keeping all copy in one place means UI components stay focused on layout
 * and the content can be edited (or later sourced from MDX / a CMS) without
 * touching component code.
 */

/** External links — update with your real URLs. */
export const links = {
  linkedin: "https://www.linkedin.com/in/connor-koefelda",
  /** Served from public/resume.pdf — drop your PDF there. */
  // Relative (not `/resume.pdf`) so it works on GitHub Pages project pages
  // (`https://<user>.github.io/<repo>/`), matching the `base: "./"` in vite.config.ts.
  resume: "./resume.pdf",
};

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  /** One button per entry — e.g. "Website", "GitHub", "Marketplace". */
  links?: ProjectLink[];
  /**
   * Screenshot/logo for the featured section, e.g. "./projects/terminal-watch.png".
   * Drop the file in public/projects/ (created by the build) and reference it
   * from there — it's copied to the site root as-is. Empty string = the
   * decorative placeholder shows instead.
   */
  image?: string;
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
    title: "Terminal Watch",
    category: "Developer Tools",
    description:
      "A VS Code extension that watches terminal output for configurable patterns and delivers native desktop notifications, even from containerized environments.",
    tech: ["VS Code API", "TypeScript", "Node.js"],
    links: [
      { label: "GitHub", url: "https://github.com/BladeFin/terminal-watch" },
      {
        label: "Marketplace",
        url: "https://marketplace.visualstudio.com/items?itemName=BladeFin.terminal-watch",
      },
    ],
    image: "", // TODO: ./projects/terminal-watch.png
    featured: true,
  },
  {
    title: "Flowkey",
    category: "Productivity Tool · Desktop Utility",
    description:
      "A lightweight Windows productivity daemon for launching apps and toggling custom mini-apps with keyboard shortcuts.  Built for minimal overhead and easy extensibility.",
    tech: ["Go", "Wails", "Win32 API", "TypeScript", "Windows Registry"],
    links: [{ label: "GitHub", url: "#" }], // TODO: add the repo URL
    image: "", // TODO: ./projects/flowkey.png
    featured: true,
  },
  {
    title: "Rush Hour",
    category: "Web App · PWA",
    description:
      "A Next.js full-stack application for organizing fraternity rush. Features user authentication with Supabase, real-time data management with TanStack React Query, and a modern UI built with Shadcn and Tailwind CSS. Deployed on Vercel.",
    tech: [
      "Supabase",
      "React",
      "Tailwind CSS",
      "Shadcn",
      "Zod",
      "TypeScript",
      "Next.js",
    ],
    links: [{ label: "Website", url: "https://fratrush.vercel.app" }],
    image: "", // TODO: ./projects/rush-hour.png
    featured: true,
  },
];

export const publications: Publication[] = [];

/** Convenience selectors — ordering matches the source array. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
export const featuredPublications: Publication[] = publications.filter(
  (p) => p.featured,
);
