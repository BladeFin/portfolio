import { motion } from 'framer-motion';
import Section from './Section';
import type { Publication } from '../content/data';

interface FullPublicationProps {
  /** Section id — used by the navbar to anchor scrolling. */
  sectionId: string;
  /** 0-based position among featured publications. */
  index: number;
  total: number;
  publication: Publication;
}

/**
 * One full-viewport section per featured publication. Single-column on every
 * breakpoint — these are text-heavy case studies where the eye benefits from
 * a wide measure and uninterrupted reading rhythm.
 */
export default function FullPublication({
  sectionId,
  index,
  total,
  publication,
}: FullPublicationProps) {
  const position = String(index + 1).padStart(2, '0');
  const denom = String(total).padStart(2, '0');

  return (
    <Section id={sectionId} className="bg-background">
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15% 0px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="mx-auto max-w-3xl"
      >
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
          <span>
            {publication.venue} · {publication.year}
          </span>
        </motion.p>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.55 }}
          className="mb-6 text-3xl font-bold leading-[1.1] tracking-tight text-primary-light md:text-5xl lg:text-6xl"
        >
          {publication.title}
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-sm text-muted md:text-base"
        >
          {publication.authors.join(', ')}
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-base leading-relaxed text-muted md:text-lg"
        >
          {publication.abstract}
        </motion.p>

        <motion.a
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          href={publication.link}
          className="inline-flex items-center gap-2 rounded-full border border-primary px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary-light transition-colors duration-200 hover:bg-primary hover:text-background"
        >
          Read paper
          <span aria-hidden="true">→</span>
        </motion.a>
      </motion.article>
    </Section>
  );
}
