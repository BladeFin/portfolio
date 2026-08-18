import Section from './Section';

export default function About() {
  return (
    <Section id="about">
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-accent md:text-sm">
          About
        </p>
        <h2 className="mb-10 text-3xl font-bold leading-tight text-primary-light md:text-5xl">
          A designer who codes, and a coder who cares about design.
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3 space-y-5 text-base leading-relaxed text-muted md:text-lg">
            <p>
              For the past several years I've been helping small teams ship
              polished interfaces — from data dashboards to mobile clients to
              libraries other developers reach for. I care most about the
              long, quiet work of making software feel obvious.
            </p>
            <p>
              When I'm not at a screen I sketch typefaces, run badly, and
              read paper journals about things I don't fully understand.
            </p>
          </div>

          <aside className="md:col-span-2">
            <dl className="grid grid-cols-1 gap-6 border-t border-muted/30 pt-6 text-sm md:grid-cols-1 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div>
                <dt className="mb-1 uppercase tracking-[0.3em] text-accent text-xs">
                  Currently
                </dt>
                <dd className="text-primary-light">
                  Senior product engineer at a small research-tools startup.
                </dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-[0.3em] text-accent text-xs">
                  Stack
                </dt>
                <dd className="text-primary-light">
                  TypeScript, React, SwiftUI, Rust, Tailwind, D3.
                </dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-[0.3em] text-accent text-xs">
                  Based
                </dt>
                <dd className="text-primary-light">Lisbon, Portugal.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </Section>
  );
}
