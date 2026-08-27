import { motion } from "framer-motion";
import Section from "./Section";
import { links } from "../content/data";

const EMAIL = "connor.koefelda@gmail.com";

export default function Contact() {
  return (
    <Section id="contact" className="bg-background">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-accent md:text-sm">
          Contact
        </p>
        <h2 className="mb-6 text-3xl font-bold leading-tight text-primary-light md:text-5xl">
          Let's work together.
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          I'm a CS student at UIUC looking for a software engineering internship
          for Summer 2027. Interested in working together or just want to say
          hello?
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-3 rounded-full bg-primary/95 px-8 py-3 text-sm uppercase tracking-[0.3em] text-background transition-colors duration-200 hover:bg-primary-light"
          >
            Email me
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-primary/95 px-8 py-3 text-sm uppercase tracking-[0.3em] text-background transition-colors duration-200 hover:bg-primary-light"
          >
            LinkedIn
            <span aria-hidden="true">↗</span>
          </motion.a>
        </div>
      </div>
    </Section>
  );
}
