import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 bg-background snap-start"
    >
      {/* Subtle background accent — large accent glow behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-primary-light md:text-sm"
        >
          Hi, my name is
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-primary md:text-7xl lg:text-8xl"
        >
          Connor Koefelda
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted md:text-xl"
        >
          I build thoughtful, accessible digital products at the intersection of
          design and engineering — with a soft spot for typography, motion, and
          well-named variables.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          href="#about"
          className="inline-flex items-center gap-2 rounded-full border border-primary px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary-light transition-colors duration-200 hover:bg-primary hover:text-background"
        >
          View my work
          <span aria-hidden="true">→</span>
        </motion.a>
      </div>
    </section>
  );
}
