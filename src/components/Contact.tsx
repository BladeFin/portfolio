import { useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { links } from "../content/data";

const EMAIL = "connor.koefelda@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be unavailable; opening a mailto link is the fallback
      // (the link below already covers the common case).
    }
  };

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
          I'm always open to conversations about new products, research
          collaborations, and the occasional typeface deep-dive.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            href={`mailto:${EMAIL}`}
            onClick={(e) => {
              // macOS / mobile users get the native mail client via the link;
              // for everyone else we copy the address so they can paste it.
              if (/Win|Linux/i.test(navigator.platform)) {
                e.preventDefault();
                void copyEmail();
              }
            }}
            className="inline-flex items-center gap-3 rounded-full bg-primary/95 px-8 py-3 text-sm uppercase tracking-[0.3em] text-background transition-colors duration-200 hover:bg-primary-light"
          >
            {copied ? "Copied ✓" : "Copy Email"}
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
