import Section from "./Section";
import { links } from "../content/data";

export default function About() {
  return (
    <Section id="about">
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-accent md:text-sm">
          About
        </p>
        <h2 className="mb-4 text-3xl font-bold leading-tight text-primary-light md:text-5xl">
          I like to build things myself.
        </h2>
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h4 className="text-xl font-bold leading-tight text-accent md:text-2xl">
            Want the professional version?
          </h4>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl font-bold leading-tight text-accent underline decoration-accent/60 underline-offset-4 transition-colors duration-200 hover:text-primary-light hover:decoration-primary-light/60 md:text-2xl"
          >
            View my resume
            <span aria-hidden="true" className="text-base">
              ↗
            </span>
          </a>
        </div>

        <div className="md:col-span-3 space-y-5 text-base leading-relaxed text-muted md:text-lg">
          <p>
            I'm studying computer science at the University of Illinois
            Urbana-Champaign and spend most of my time building software,
            experimenting with new technology, and trying to understand things
            by taking them apart.
          </p>
          <p>
            I'm graduating with my BS in CS this spring ('27), then sticking
            around UIUC for another year to get my master's. I'm hoping to spend
            the summer putting what I've learned to work with an internship.
          </p>
          <p>
            My interests tend to bounce around, but lately I've been focused on
            developer tools, AI-assisted programming, and building software that
            people actually want to use.
          </p>
        </div>
      </div>
    </Section>
  );
}
