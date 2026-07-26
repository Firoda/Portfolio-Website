import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-signal"
      style={{ scaleX, width: '100%' }}
      aria-hidden="true"
    />
  );
}

export function AnimatedGroup({ children, className = '', as: Element = 'div', delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Element className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={child?.key ?? index}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26, filter: 'blur(10px)' }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.65, delay: delay + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </Element>
  );
}

export function TextMorph({ words, className = '' }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2100);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, words.length]);

  return (
    <span className={`relative inline-grid overflow-hidden align-baseline ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? {} : { y: '-100%', opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function TransitionPanel({ tabs, initial = 0 }) {
  const [active, setActive] = useState(initial);
  const id = useId();

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Case study sections">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel-${index}`}
            onClick={() => setActive(index)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === index
                ? 'border-signal bg-signal text-ink'
                : 'border-white/15 bg-white/5 text-white/72 hover:border-white/35 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-[210px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`${id}-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${active}`}
            initial={{ opacity: 0, x: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -28, filter: 'blur(10px)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ImageComparison({ before, after, alt }) {
  const [value, setValue] = useState(52);

  if (!before || !after) return null;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-white/5">
      <img src={before} alt={`${alt} before`} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <img src={after} alt={`${alt} after`} className="h-full w-full object-cover" />
      </div>
      <input
        className="comparison-range"
        type="range"
        min="0"
        max="100"
        value={value}
        aria-label={`Compare ${alt} images`}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <div
        className="pointer-events-none absolute top-0 h-full w-px bg-signal shadow-[0_0_22px_rgba(200,255,74,0.85)]"
        style={{ left: `${value}%` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-signal bg-ink/80 text-xs text-signal"
        style={{ left: `${value}%` }}
        aria-hidden="true"
      >
        <span className="h-3 w-3 rounded-full bg-signal" />
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-white/80">
        Drag to compare
      </div>
    </div>
  );
}

export function MorphingDialog({ trigger, title, eyebrow, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button type="button" className="block w-full text-left" onClick={() => setOpen(true)}>
        {trigger}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center bg-ink/80 px-4 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpen(false)}
          >
            <motion.article
              className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-white/10 bg-[#11131a] p-5 text-white shadow-glass sm:p-8"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={title}
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-aqua">{eyebrow}</p>
                  <h3 className="mt-2 text-3xl font-semibold sm:text-5xl">{title}</h3>
                </div>
                <button
                  type="button"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/12"
                  onClick={() => setOpen(false)}
                  aria-label="Close case study"
                >
                  <X size={20} />
                </button>
              </div>
              {children}
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
