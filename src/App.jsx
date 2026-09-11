import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Plus,
  Minus,
  X,
  RotateCcw,
  Pause,
  Play,
  Move3D,
  ChevronRight,
  Check,
  Layers,
  Search,
  BookOpen,
  Mail,
} from "lucide-react";
import Scene from "./components/Scene.jsx";
import { chapters, features } from "./data/content.json";
import archiveCopy from "./data/archive-copy.json";
import { articles as archive } from "./data/articles.js";
import profilePdf from "./data/profile.pdf?inline";
import Demo from "./components/Demo.jsx";
const assets = import.meta.glob("./assets/*", {
  eager: true,
  query: "?inline",
  import: "default",
});
const logo = (id) =>
  Object.entries(assets).find(([path]) => path.includes("/" + id + "."))?.[1];
const allArticles = [...features, ...archive];
const baseTitle = "Aditya Firoda | Engineering to Product Management";
function Brand({ chapter, className = "" }) {
  return logo(chapter.id) ? (
    <img
      className={"brand " + chapter.id + " " + className}
      src={logo(chapter.id)}
      alt={chapter.name}
    />
  ) : (
    <span className="brand-text">{chapter.name}</span>
  );
}
function MotionButton({ paused, setPaused }) {
  return (
    <button
      className="icon-button"
      onClick={() => setPaused(!paused)}
      aria-label={paused ? "Resume motion" : "Pause motion"}
      title={paused ? "Resume motion" : "Pause motion"}
    >
      {paused ? <Play size={15} /> : <Pause size={15} />}
    </button>
  );
}
function DetailDialog({ chapter, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      className="detail-dialog"
      aria-labelledby="detail-title"
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          className="dialog-close icon-button"
          aria-label="Close details"
          onClick={onClose}
        >
          <X />
        </button>
        <Brand chapter={chapter} />
        <p className="eyebrow">{chapter.dates}</p>
        <h2 id="detail-title">{chapter.name}</h2>
        <p className="dialog-role">{chapter.role}</p>
        <p>{chapter.intro}</p>
        {chapter.details.map((g) => (
          <section key={g.title}>
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        ))}
        <button className="pill" onClick={onClose}>
          Back to the journey <ArrowRight size={16} />
        </button>
      </div>
    </dialog>
  );
}
function Experience({ paused, setPaused, onDetails }) {
  const [active, setActive] = useState(0),
    [progress, setProgress] = useState(0),
    [beat, setBeat] = useState(0),
    [explore, setExplore] = useState(false),
    [hover, setHover] = useState(null);
  const chapterRefs = useRef([]),
    controls = useRef(),
    exitRef = useRef();
  useEffect(() => {
    let frame;
    function update() {
      if (explore) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const point = matchMedia("(max-width:700px)").matches
          ? Math.min(innerHeight - 40, 430)
          : innerHeight * 0.46;
        let selected = 0;
        chapterRefs.current.forEach((e, i) => {
          if (e && e.getBoundingClientRect().top <= point) selected = i;
        });
        const r = chapterRefs.current[selected]?.getBoundingClientRect();
        if (!r) return;
        setActive(selected);
        const v = Math.min(1, Math.max(0, (point - r.top) / r.height));
        setProgress(v);
        const els =
          chapterRefs.current[selected].querySelectorAll(".story-beat");
        let b = 0;
        els.forEach((el, i) => {
          if (el.getBoundingClientRect().top < innerHeight * 0.68) b = i;
        });
        setBeat(b);
      });
    }
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [explore]);
  useEffect(() => {
    if (!explore) return;
    const y = scrollY;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    exitRef.current?.focus();
    const key = (e) => {
      if (e.key === "Escape") setExplore(false);
    };
    addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      removeEventListener("keydown", key);
      window.scrollTo({ top: y, behavior: "instant" });
    };
  }, [explore]);
  const current = chapters[active];
  const show = hover == null ? current : chapters[hover];
  return (
    <div className="experience">
      <div className="chapter-nav" aria-label="Career chapters">
        {chapters.map((c, i) => (
          <div
            className="chapter-link-wrap"
            key={c.id}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocusCapture={() => setHover(i)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setHover(null);
            }}
          >
            <a
              className={active === i ? "active" : ""}
              href={"#" + c.id}
              onClick={() => {
                setExplore(false);
                setHover(null);
              }}
              aria-label={`Jump to ${c.name}`}
            >
              <Brand chapter={c} />
              <span>{c.short}</span>
            </a>
            {hover === i && (
              <div className="company-preview">
                <b>{c.name}</b>
                <p>{c.role}</p>
                <small>{c.dates}</small>
                <button className="text-link" onClick={() => onDetails(c)}>
                  View full experience <Plus size={15} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={"journey-grid " + (explore ? "is-exploring" : "")}>
        <aside className="stage-column">
          <div className="sticky-stage">
            <div className="stage-top">
              <span>{String(active + 1).padStart(2, "0")} / 06</span>
              <span>
                {current.short} ·{" "}
                {current.id === "isb" ? "The current chapter" : "The journey"}
              </span>
              <MotionButton paused={paused} setPaused={setPaused} />
            </div>
            <div className="chapter-stage">
              <Scene
                chapter={show.id}
                beat={hover == null ? beat : 0}
                progress={progress}
                explore={explore}
                paused={paused}
                hover={hover !== null}
                controlRef={controls}
              />
            </div>
            <div className="stage-caption" key={current.id + "-" + beat}>
              <span
                className="caption-line"
                style={{ background: current.color }}
              />
              <p>{current.beats[beat]?.[4]}</p>
              <small>Illustrative model</small>
            </div>
            <div className="stage-actions">
              {explore ? (
                <>
                  <button
                    className="pill"
                    ref={exitRef}
                    onClick={() => setExplore(false)}
                  >
                    Back to story <X size={15} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => controls.current?.zoom(1.15)}
                    aria-label="Zoom out"
                  >
                    <Minus size={17} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => controls.current?.zoom(0.85)}
                    aria-label="Zoom in"
                  >
                    <Plus size={17} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => controls.current?.reset()}
                    aria-label="Reset view"
                  >
                    <RotateCcw size={16} />
                  </button>
                </>
              ) : (
                <button className="pill glass" onClick={() => setExplore(true)}>
                  <Move3D size={16} /> Explore in 3D
                </button>
              )}
            </div>
            {explore && (
              <p className="explore-hint">
                Drag to rotate · Scroll to zoom · Escape to return
              </p>
            )}
            <div className="stage-progress">
              <span
                style={{
                  width: `${progress * 100}%`,
                  background: current.color,
                }}
              />
            </div>
          </div>
        </aside>
        <div className="chapters">
          {chapters.map((c, i) => (
            <section
              key={c.id}
              id={c.id}
              className={"chapter " + (active === i ? "current" : "")}
              ref={(el) => (chapterRefs.current[i] = el)}
              style={{ "--chapter-color": c.color }}
            >
              <div className="chapter-heading">
                <Brand chapter={c} />
                <p className="chapter-date">{c.dates}</p>
                <h2>
                  {c.title.split("\n").map((line, j) => (
                    <React.Fragment key={line}>
                      {j > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="chapter-role">{c.role}</p>
                <p className="chapter-intro">{c.intro}</p>
              </div>
              {c.beats.map((b, j) => (
                <div
                  key={b[0]}
                  className={
                    "story-beat " +
                    (active === i && beat === j ? "focused" : "")
                  }
                >
                  <span className="beat-index">
                    {String(j + 1).padStart(2, "0")} <span />
                    {c.short}
                  </span>
                  <h3>{b[0]}</h3>
                  <p>{b[1]}</p>
                  <div
                    className={
                      "proof " + (b[2].length > 15 ? "long-proof" : "")
                    }
                  >
                    <strong>{b[2]}</strong>
                    <span>{b[3]}</span>
                  </div>
                  {b[5] && (
                    <a className="text-link" href={"#article/" + b[5]}>
                      Read the story <ChevronRight size={17} />
                    </a>
                  )}
                </div>
              ))}
              <button className="detail-link" onClick={() => onDetails(c)}>
                View full {c.short} experience{" "}
                <span>
                  <Plus size={18} />
                </span>
              </button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
function ProductArt({ article }) {
  return (
    <div className={"product-art " + article.theme} aria-hidden="true">
      {article.id === "counselmate" ? (
        <>
          <div className="art-label">COUNSELMATE</div>
          <div className="workflow-ui">
            <span className="ui-overline">Your court day, together.</span>
            <div className="workflow-row">
              <span>01</span>
              <b>Cause lists</b>
              <Check size={15} />
            </div>
            <div className="workflow-row">
              <span>02</span>
              <b>Live boards</b>
              <Check size={15} />
            </div>
            <div className="workflow-row">
              <span>03</span>
              <b>Case alerts</b>
              <Check size={15} />
            </div>
            <small>Workflow illustration</small>
          </div>
        </>
      ) : article.id === "samadhan-seva" ? (
        <>
          <div className="art-label">SAMADHAN SEVA</div>
          <div className="process-art">
            <span>Grievance</span>
            <ArrowDown />
            <span>Routing + verification</span>
            <ArrowDown />
            <span className="accent-node">A clearer next step</span>
          </div>
        </>
      ) : article.id === "truecaller-helpline" ? (
        <>
          <div className="art-label">AI HELPLINE CONCEPT</div>
          <div className="waveform">
            {Array.from({ length: 25 }, (_, i) => (
              <i key={i} style={{ height: 18 + Math.sin(i * 0.8) ** 2 * 72 }} />
            ))}
          </div>
          <p>Help, one interaction at a time.</p>
        </>
      ) : article.id === "oracle-onboarding" ? (
        <>
          <div className="art-label">ORACLE HEALTH</div>
          <div className="access-art">
            <div>
              <span>Advanced configuration</span>
              <Layers size={30} />
            </div>
            <ArrowRight />
            <div>
              <span>Useful defaults</span>
              <Check size={30} />
            </div>
          </div>
          <p>A simpler starting point.</p>
        </>
      ) : (
        <>
          <div className="art-label">MERCER | METTL</div>
          <div className="capacity-chart">
            <i style={{ height: "30%" }} />
            <i style={{ height: "45%" }} />
            <i style={{ height: "62%" }} />
            <i style={{ height: "78%" }} />
            <i style={{ height: "96%" }} />
          </div>
          <p>Capacity for what comes next.</p>
        </>
      )}
    </div>
  );
}
function Work() {
  return (
    <section id="work" className="work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>Ideas, made useful.</h2>
        </div>
        <p>
          Products, experiments and
          <br />
          the decisions behind them.
        </p>
      </div>
      <div className="featured-grid">
        {features.map((a, i) => (
          <a
            href={"#article/" + a.id}
            className={"feature-card " + (i === 0 ? "lead-feature" : "")}
            key={a.id}
          >
            <ProductArt article={a} />
            <div className="feature-copy">
              <p className="eyebrow">{a.category}</p>
              <h3>{a.title}</h3>
              <p>{a.intro}</p>
              <span className="text-link">
                Read the story <ArrowUpRight size={18} />
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className="archive-heading">
        <h3>The builder archive.</h3>
        <p>The projects where it started.</p>
      </div>
      <div className="archive-grid">
        {archive.map((a) => (
          <a href={"#article/" + a.id} className="archive-card" key={a.id}>
            <div className="archive-image">
              <img src={a.image} alt={a.original} loading="lazy" />
            </div>
            <div>
              <p className="eyebrow">{a.tech}</p>
              <h3>{a.title}</h3>
              <span className="text-link">
                Explore project <ArrowUpRight size={15} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
function About() {
  return (
    <section className="about-section" id="about">
      <p className="eyebrow">Beyond the work</p>
      <h2>
        Making time
        <br />
        <span>for people, too.</span>
      </h2>
      <div className="about-grid">
        <p className="about-intro">
          Outside work, I’ve volunteered in education and community programmes,
          helped social workers build everyday digital skills and stayed
          involved in sport.
        </p>
        <div className="community-list">
          {[
            [
              "Bal Basera",
              "Mar – Jun 2025",
              "Mentored students in grades 3–5 and helped mobilize community support through five events reaching more than 300 people.",
            ],
            [
              "Shiksha Bharti School",
              "Apr – May 2022",
              "Worked with faculty to create activity-based summer homework for Class IV students.",
            ],
            [
              "iVolunteer",
              "Apr 2022",
              "Delivered Microsoft Office training to social workers supporting underprivileged women.",
            ],
            [
              "On the badminton court",
              "2024",
              "Won the singles title at a Paradise Academy tournament with more than 20 participants.",
            ],
          ].map(([t, d, p]) => (
            <div key={t}>
              <div>
                <h3>{t}</h3>
                <small>{d}</small>
              </div>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <>
      <section id="contact" className="contact">
        <p className="eyebrow">The next chapter</p>
        <h2>
          Engineering experience.
          <br />
          <span>Product ambition.</span>
        </h2>
        <p>
          I’m working toward product management roles where understanding users,
          making clear tradeoffs and collaborating closely with engineering
          matter.
        </p>
        <a className="contact-cta" href="mailto:adityafiroda@gmail.com">
          Let’s talk <ArrowUpRight />
        </a>
        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/aditya-firoda/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight size={15} />
          </a>
          <a href="https://github.com/Firoda" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={15} />
          </a>
          <a href={profilePdf} download="Aditya-Firoda-Profile.pdf">
            Profile PDF <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <footer>
        <span>© {new Date().getFullYear()} Aditya Firoda</span>
        <span>Built with curiosity.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
function Article({ article, onBack, paused }) {
  const [read, setRead] = useState(0);
  useEffect(() => {
    const update = () =>
      setRead(
        Math.min(
          100,
          (scrollY /
            Math.max(1, document.documentElement.scrollHeight - innerHeight)) *
            100,
        ),
      );
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, [article.id]);
  const related =
    allArticles[
      (allArticles.findIndex((a) => a.id === article.id) + 1) %
        allArticles.length
    ];
  return (
    <main
      id="main"
      tabIndex={-1}
      className={"article article-" + article.theme}
      style={{ "--article-color": article.color }}
    >
      <div className="reading-progress" style={{ width: read + "%" }} />
      <div className="article-toolbar">
        <button className="text-link" onClick={onBack}>
          <ArrowLeft size={17} /> Back to portfolio
        </button>
        <span>{article.category}</span>
      </div>
      <header className="article-heading">
        <p className="eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p>{article.intro}</p>
        <div className="byline">
          <span className="avatar">AF</span>
          <span>
            Aditya Firoda{" "}
            <small>
              {article.blocks
                ? "Product & engineering notes"
                : "From the builder archive"}{" "}
              ·{" "}
              {Math.max(
                1,
                Math.ceil(
                  (article.blocks
                    ? article.blocks
                        .map((b) => b.paragraphs.join(" "))
                        .join(" ")
                    : article.body
                  ).split(/\s+/).length / 210,
                ),
              )}{" "}
              min read
            </small>
          </span>
        </div>
      </header>
      <div className="article-hero-media">
        {article.blocks ? (
          <ProductArt article={article} />
        ) : (
          <img src={article.image} alt={article.original} />
        )}
      </div>
      <div className="article-content">
        {article.blocks ? (
          article.blocks.map((b, i) => (
            <React.Fragment key={b.title}>
              <section>
                <h2>{b.title}</h2>
                {b.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
              {i === 0 && <Demo article={article} paused={paused} />}
            </React.Fragment>
          ))
        ) : (
          <>
            <section>
              <h2>The project</h2>
              {archiveCopy[article.id]?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
            <Demo article={article} paused={paused} />
            {article.note && (
              <aside className="editorial-note">
                <b>Reading the original work</b>
                <p>{article.note}</p>
              </aside>
            )}
            <details className="original-notes">
              <summary>
                Original implementation notes and screenshots <Plus size={16} />
              </summary>
              <div
                className="original-article"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
            </details>
          </>
        )}
        {article.id === "counselmate" && (
          <aside className="editorial-note">
            <b>About the reported results</b>
            <p>
              Approximately 300 monthly active users and 45 minutes saved per
              user per day are résumé-reported snapshots, not live metrics. A
              measurement window and savings methodology are not specified.
            </p>
          </aside>
        )}
      </div>
      <section className="article-next">
        <p className="eyebrow">Keep exploring</p>
        <a href={"#article/" + related.id}>
          <h2>{related.title}</h2>
          <ArrowRight size={30} />
        </a>
        <button className="text-link" onClick={onBack}>
          <ArrowLeft size={16} /> All work
        </button>
      </section>
      <footer>
        <span>Aditya Firoda</span>
        <a href="mailto:adityafiroda@gmail.com">Get in touch ↗</a>
      </footer>
    </main>
  );
}
export default function App() {
  const [hash, setHash] = useState(location.hash),
    [detail, setDetail] = useState(null),
    [paused, setPaused] = useState(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  const heroControl = useRef(),
    [heroExplore, setHeroExplore] = useState(false),
    returnScroll = useRef(0),
    previousHash = useRef(location.hash),
    detailTrigger = useRef(),
    restorePending = useRef(false);
  useEffect(() => {
    function change() {
      const next = location.hash;
      if (next.startsWith("#article/")) {
        if (!previousHash.current.startsWith("#article/"))
          returnScroll.current = scrollY;
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      setHash(next);
      previousHash.current = next;
    }
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  const slug = hash.startsWith("#article/") ? hash.slice(9) : null;
  const article = allArticles.find((a) => a.id === slug);
  useEffect(() => {
    document.title = article ? article.title + " | Aditya Firoda" : baseTitle;
    if (article) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (restorePending.current) {
      restorePending.current = false;
    } else if (hash)
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" }),
      );
  }, [article]);
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") setHeroExplore(false);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setPaused(q.matches);
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  const onBack = () => {
    restorePending.current = true;
    history.replaceState(
      null,
      "",
      location.pathname + location.search + "#work",
    );
    setHash("#work");
    previousHash.current = "#work";
    requestAnimationFrame(() =>
      window.scrollTo({
        top:
          returnScroll.current ||
          document.getElementById("work")?.offsetTop ||
          0,
        behavior: "instant",
      }),
    );
  };
  function onDetails(c) {
    detailTrigger.current = document.activeElement;
    setDetail(c);
  }
  function closeDetails() {
    setDetail(null);
    requestAnimationFrame(() => {
      if (detailTrigger.current?.isConnected) detailTrigger.current.focus();
      else document.querySelector(`a[href="#${detail.id}"]`)?.focus();
    });
  }
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView({ behavior: "instant" });
        }}
      >
        Skip to content
      </a>
      <header className="nav">
        <a className="wordmark" href="#top">
          Aditya Firoda<span>Engineering → Product</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#journey">Journey</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a
            className="nav-resume"
            href={profilePdf}
            download="Aditya-Firoda-Profile.pdf"
          >
            Profile PDF <ArrowDown size={13} />
          </a>
          <a className="nav-contact" href="mailto:adityafiroda@gmail.com">
            Let’s talk
          </a>
        </nav>
      </header>
      {article ? (
        <Article
          key={article.id}
          article={article}
          onBack={onBack}
          paused={paused}
        />
      ) : slug ? (
        <main className="not-found" id="main" tabIndex={-1}>
          <h1>Story not found.</h1>
          <button className="text-link" onClick={onBack}>
            Back to portfolio
          </button>
        </main>
      ) : (
        <main id="main" tabIndex={-1}>
          <section id="top" className="hero">
            <p className="eyebrow">
              A builder. A business student. Always curious.
            </p>
            <h1>Hi, I’m Aditya.</h1>
            <p className="hero-intro">
              I’m a software developer learning the business of building
              products—and working toward product management.
            </p>
            <a className="text-link" href="#journey">
              Explore my journey <ArrowDown size={17} />
            </a>
            <div className="hero-scene">
              <Scene
                chapter="hero"
                explore={heroExplore}
                paused={paused}
                controlRef={heroControl}
              />
            </div>
            <div className="hero-controls">
              <button
                className="quiet-button"
                onClick={() => setHeroExplore(!heroExplore)}
              >
                {heroExplore ? "Back to story" : "Explore the desk"}{" "}
                <Move3D size={14} />
              </button>
              {heroExplore && (
                <>
                  <button
                    className="icon-button"
                    aria-label="Zoom in"
                    onClick={() => heroControl.current?.zoom(0.85)}
                  >
                    <Plus size={15} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Zoom out"
                    onClick={() => heroControl.current?.zoom(1.15)}
                  >
                    <Minus size={15} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Reset view"
                    onClick={() => heroControl.current?.reset()}
                  >
                    <RotateCcw size={15} />
                  </button>
                </>
              )}
              <MotionButton paused={paused} setPaused={setPaused} />
            </div>
            <div className="hero-foot">
              <span>ISB PGP in Management · Class of 2027</span>
              <span>
                Scroll to discover <ArrowDown size={13} />
              </span>
            </div>
          </section>
          <section id="journey" className="intro-section">
            <p className="eyebrow">The journey so far</p>
            <h2>
              Built with code.
              <br />
              <span>Shaped by people.</span>
            </h2>
            <p>
              From making systems work to understanding which problems deserve
              to be solved.
            </p>
            <span className="journey-order">
              The present, then the path that led here.
            </span>
          </section>
          <Experience
            paused={paused}
            setPaused={setPaused}
            onDetails={onDetails}
          />
          <Work />
          <About />
          <Footer />
        </main>
      )}
      {detail && <DetailDialog chapter={detail} onClose={closeDetails} />}
    </>
  );
}
