import { lazy, Suspense, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  Github,
  Linkedin,
  Mail,
  Play,
  Sparkles,
} from 'lucide-react';
import {
  AnimatedGroup,
  ImageComparison,
  MorphingDialog,
  ScrollProgress,
  TextMorph,
  TransitionPanel,
} from './components/motion-primitives.jsx';
import { highlights, profile, projects, resumeUrl } from './data/projects.js';

const WebGLField = lazy(() => import('./components/WebGLField.jsx'));

const navItems = [
  ['Signal', '#signal'],
  ['Highlights', '#highlights'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
];

function App() {
  const featured = projects.filter((project) => project.featured);
  const archive = projects.filter((project) => !project.featured);

  return (
    <main className="min-h-screen bg-ink text-white">
      <ScrollProgress />
      <SiteNav />
      <Hero />
      <SignalSection />
      <Highlights />
      <FeaturedProjects projects={featured} />
      <ProjectArchive projects={archive} />
      <About />
      <Contact />
    </main>
  );
}

function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-ink/72 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-sm font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-signal text-ink">AF</span>
          <span className="hidden sm:block">{profile.name}</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-white/68 transition hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <a
          href={resumeUrl}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-signal hover:text-signal"
          target="_blank"
          rel="noreferrer"
        >
          <Download size={16} />
          Resume
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[115vh] overflow-hidden">
      <Suspense fallback={null}>
        <WebGLField />
      </Suspense>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(110,231,249,0.18),transparent_34%),linear-gradient(180deg,rgba(9,10,15,0.12),#090a0f_88%)]" />
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8"
      >
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 font-mono text-xs uppercase tracking-[0.28em] text-aqua">
          <Sparkles size={14} />
          2026 portfolio revamp
        </p>
        <h1 className="max-w-5xl text-6xl font-semibold leading-[0.92] sm:text-7xl lg:text-8xl">
          {profile.headline}{' '}
          <TextMorph
            words={['Product', 'Strategy', 'Systems']}
            className="text-signal"
          />
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-8 text-white/72 sm:text-2xl">
          {profile.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 font-semibold text-ink transition hover:bg-aqua">
            See case studies
            <ArrowUpRight size={18} />
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:border-white/40">
            Contact
            <Mail size={18} />
          </a>
        </div>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-center font-mono text-xs uppercase tracking-[0.28em] text-white/42 md:block">
        Scroll for the narrative
      </div>
    </section>
  );
}

function SignalSection() {
  return (
    <section id="signal" className="relative border-y border-white/10 bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="sticky top-24 h-fit">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">Positioning</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-6xl">A portfolio built for the hiring skim.</h2>
        </div>
        <AnimatedGroup className="grid gap-4">
          {[
            'Technical enough to understand constraints without hiding behind them.',
            'Business-minded enough to ask whether the product should exist.',
            'Structured enough to turn projects into decisions, outcomes, and tradeoffs.',
          ].map((line) => (
            <div key={line} className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
              <p className="text-2xl font-medium leading-snug sm:text-3xl">{line}</p>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section id="highlights" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-aqua">Career arc</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-6xl">From implementation details to product judgment.</h2>
        </div>
        <AnimatedGroup className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="min-h-[340px] rounded-lg border border-white/10 bg-white/[0.06] p-6">
              <div className="mb-16 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/48">{item.label}</span>
                <span className="text-5xl font-semibold text-signal">{item.metric}</span>
              </div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-white/68">{item.copy}</p>
            </article>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

function FeaturedProjects({ projects }) {
  return (
    <section id="projects" className="bg-[#11131a] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">Featured case studies</p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-6xl">Projects reframed as product decisions.</h2>
          </div>
          <p className="max-w-sm text-white/60">
            Each card opens into a recruiter-friendly case study with problem, process, impact, media, and links.
          </p>
        </div>
        <AnimatedGroup className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectDialog key={project.slug} project={project} />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

function ProjectDialog({ project }) {
  return (
    <MorphingDialog
      title={project.title}
      eyebrow={`${project.category} / ${project.role}`}
      trigger={<ProjectCard project={project} />}
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <img src={project.image} alt={project.title} className="aspect-[16/11] w-full rounded-lg object-cover" />
          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/68">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <ImageComparison before={project.comparison?.[0]} after={project.comparison?.[1]} alt={project.title} />
          </div>
        </div>
        <TransitionPanel
          tabs={[
            {
              label: 'Overview',
              content: <CaseCopy title="What it is" copy={project.summary} meta={project.timeline} />,
            },
            {
              label: 'Problem',
              content: <CaseCopy title="The constraint" copy={project.challenge} />,
            },
            {
              label: 'Process',
              content: <CaseCopy title="How I approached it" copy={project.approach} />,
            },
            {
              label: 'Impact',
              content: <CaseCopy title="Outcome" copy={project.outcome} />,
            },
            {
              label: 'Media',
              content: <MediaPanel project={project} />,
            },
            {
              label: 'Takeaway',
              content: <CaseCopy title="Recruiter signal" copy={project.takeaway} />,
            },
          ]}
        />
      </div>
    </MorphingDialog>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-ink transition duration-500 hover:-translate-y-1 hover:border-signal/60">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs text-white/75 backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2 text-sm text-aqua">
          <BriefcaseBusiness size={16} />
          {project.role}
        </div>
        <h3 className="text-3xl font-semibold">{project.title}</h3>
        <p className="mt-4 text-white/65">{project.summary}</p>
        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-signal">
          Open case study
          <ArrowUpRight size={16} />
        </div>
      </div>
    </article>
  );
}

function CaseCopy({ title, copy, meta }) {
  return (
    <div>
      {meta ? <p className="mb-3 font-mono text-xs uppercase tracking-[0.26em] text-white/42">{meta}</p> : null}
      <h4 className="text-3xl font-semibold">{title}</h4>
      <p className="mt-5 text-lg leading-8 text-white/70">{copy}</p>
    </div>
  );
}

function MediaPanel({ project }) {
  return (
    <div>
      <h4 className="text-3xl font-semibold">Media and writing</h4>
      <p className="mt-5 text-lg leading-8 text-white/70">
        Screenshots are wired in now. Video embeds and blog links are ready for your next content pass.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {project.video ? (
          <a href={project.video} className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-ink" target="_blank" rel="noreferrer">
            <Play size={16} />
            Watch video
          </a>
        ) : (
          <span className="rounded-full border border-white/12 px-4 py-2 text-white/48">Video slot ready</span>
        )}
        {project.blog ? (
          <a href={project.blog} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white" target="_blank" rel="noreferrer">
            Read blog
            <ArrowUpRight size={16} />
          </a>
        ) : (
          <span className="rounded-full border border-white/12 px-4 py-2 text-white/48">Blog slot ready</span>
        )}
      </div>
    </div>
  );
}

function ProjectArchive({ projects }) {
  return (
    <section className="bg-paper px-4 py-20 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">Archive</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Earlier builds, kept in context.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="rounded-lg border border-ink/10 bg-white p-5">
              <img src={project.image} alt={project.title} className="mb-5 aspect-[16/9] w-full rounded-md object-cover" />
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink/45">{project.category}</p>
              <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-ink/68">{project.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-aqua">About</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-6xl">Built by a former developer learning to ask sharper product questions.</h2>
        </div>
        <div className="space-y-6 text-xl leading-9 text-white/70">
          <p>
            This site is intentionally moving away from a 2020 developer portfolio. The new version keeps the proof of technical depth, but the story is now about product judgment, strategic framing, and execution.
          </p>
          <p>
            The next content pass should add MBA highlights, newer projects, internships, competitions, product teardowns, strategy work, and blog/video artifacts. The structure is ready for that without redesigning the site again.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-signal px-4 py-20 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em]">Next step</p>
          <h2 className="mt-4 text-5xl font-semibold sm:text-7xl">Resume, context, conversation.</h2>
          <p className="mt-6 text-xl text-ink/70">
            For product, strategy, and builder-PM roles where technical fluency is useful, not ornamental.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={resumeUrl} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white" target="_blank" rel="noreferrer">
            <Download size={18} />
            Resume
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 font-semibold">
            <Mail size={18} />
            Email
          </a>
          <a href={profile.linkedin} className="grid h-12 w-12 place-items-center rounded-full border border-ink/20" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={profile.github} className="grid h-12 w-12 place-items-center rounded-full border border-ink/20" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default App;
