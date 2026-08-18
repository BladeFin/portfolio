import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';

const EMAIL = 'hello@jordanreeves.dev';

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

        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
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
          className="inline-flex items-center gap-3 rounded-full border border-primary px-8 py-3 text-sm uppercase tracking-[0.3em] text-primary-light transition-colors duration-200 hover:bg-primary hover:text-background"
        >
          {copied ? 'Copied ✓' : EMAIL}
        </motion.a>
      </div>
    </Section>
  );
}
