import Section from './Section';
import { publications } from '../content/data';

export default function Publications() {
  return (
    <Section id="all-publications" className="bg-background">
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-accent md:text-sm">
          See all
        </p>
        <h2 className="mb-12 text-3xl font-bold leading-tight text-primary-light md:text-5xl">
          Other writing
        </h2>

        {/* See Projects.tsx — same treatment so this section stays a
            full-screen slide under mandatory scroll-snap. */}
        <ul className="grid max-h-[calc(100vh_-_26rem)] grid-cols-1 gap-4 overflow-y-auto overscroll-contain md:max-h-[calc(100vh_-_30rem)] md:grid-cols-2 md:gap-6">
          {publications.map((pub) => (
            <li
              key={pub.title}
              className="group relative rounded-xl border border-muted/30 p-6 transition-colors duration-200 hover:border-primary md:p-7"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent">
                {pub.venue} · {pub.year}
              </p>
              <h3 className="mb-3 text-lg font-semibold leading-snug text-primary-light md:text-xl">
                {pub.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                {pub.abstract}
              </p>
              <p className="text-xs text-muted/80">
                {pub.authors.join(', ')}
              </p>
              <a
                href={pub.link}
                className="absolute right-6 top-6 text-primary-light transition-transform duration-200 group-hover:translate-x-1"
                aria-label={`Open ${pub.title}`}
              >
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
