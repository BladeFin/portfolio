import Section from './Section';
import { projects } from '../content/data';

export default function Projects() {
  return (
    <Section id="all-projects">
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-accent md:text-sm">
          See all
        </p>
        <h2 className="mb-12 text-3xl font-bold leading-tight text-primary-light md:text-5xl">
          More projects
        </h2>

        {/* With `scroll-snap-type: y mandatory`, a section taller than the
            viewport would trap the scroll. Constrain the grid to the space
            left after the section padding + heading, and let it scroll
            internally (`overscroll-contain` stops the page from snapping
            until the grid reaches its edge). */}
        <div className="grid max-h-[calc(100vh_-_26rem)] grid-cols-1 gap-6 overflow-y-auto overscroll-contain md:max-h-[calc(100vh_-_30rem)] md:grid-cols-2 md:gap-8 lg:gap-10">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col gap-4 rounded-2xl border border-muted/30 bg-background/40 p-6 transition-colors duration-200 hover:border-primary md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                {project.category}
              </p>
              <h3 className="text-xl font-semibold text-primary-light md:text-2xl">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-muted/40 px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {project.links && project.links.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-3">
                  {project.links.map((link) => {
                    const external = /^https?:/.test(link.url);
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary-light transition-colors duration-200 hover:bg-primary hover:text-background"
                      >
                        {link.label}
                        <span aria-hidden="true">{external ? "↗" : "→"}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
