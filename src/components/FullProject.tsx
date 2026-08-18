import { motion } from "framer-motion";
import Section from "./Section";
import type { Project } from "../content/data";

interface FullProjectProps {
  /** Section id — used by the navbar to anchor scrolling. */
  sectionId: string;
  /** 0-based position among featured projects (drives the "01 / 03" label). */
  index: number;
  /** Total number of featured projects for the denominator of the label. */
  total: number;
  project: Project;
}

/**
 * One full-viewport section per featured project. Mirrors a quiet
 * case-study layout: typography on the left, abstract visual on the right
 * (mobile: stack vertically).
 */
export default function FullProject({
  sectionId,
  index,
  total,
  project,
}: FullProjectProps) {
  const position = String(index + 1).padStart(2, "0");
  const denom = String(total).padStart(2, "0");

  return (
    <Section id={sectionId} className="bg-background">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 items-center"
      >
        {/* Text column */}
        <div className="md:col-span-7">
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45 }}
            className="mb-6 text-xs uppercase tracking-[0.4em] text-accent md:text-sm"
          >
            <span className="text-primary-light">{position}</span>
            <span className="mx-3 text-muted/60">/</span>
            <span>{denom}</span>
            <span className="mx-3 text-muted/60">·</span>
            <span>{project.category}</span>
          </motion.p>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.55 }}
            className="mb-8 text-4xl font-bold leading-[1.05] tracking-tight text-primary-light md:text-6xl lg:text-7xl"
          >
            {project.title}
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {project.description}
          </motion.p>

          <motion.ul
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-wrap gap-2"
          >
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-muted/40 px-3 py-1 text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.a
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            href={project.link}
            className="inline-flex items-center gap-2 rounded-full border border-primary px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary-light transition-colors duration-200 hover:bg-primary hover:text-background"
          >
            View project on GitHub
            <span aria-hidden="true">→</span>
          </motion.a>
        </div>

        {/* Visual placeholder column. Could host a project image / video later. */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.96 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-muted/30 bg-gradient-to-br from-primary/15 via-background to-accent/15">
            {/* Decorative layered rings */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-3/4 w-3/4 rounded-full border border-primary/20" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-1/2 w-1/2 rounded-full border border-accent/30" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-1/4 w-1/4 rounded-full bg-primary-light/10 blur-xl" />
            </div>
            {/* Big numeral anchored bottom-left */}
            <span className="absolute bottom-6 left-6 text-7xl font-bold text-primary-light/30 md:text-8xl">
              {position}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
