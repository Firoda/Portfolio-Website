import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  Search,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
const images = import.meta.glob(
  [
    "../../img/imgproc1.png",
    "../../img/imgproc2.png",
    "../../img/imgproc3.png",
    "../../img/imgproc4.png",
    "../../img/gis1.png",
    "../../img/gis2.png",
    "../../img/ip01.png",
    "../../img/ip05.png",
  ],
  { eager: true, query: "?inline", import: "default" },
);
const img = (n) => images["../../img/" + n];
export default function Demo({ article }) {
  const [step, setStep] = useState(0),
    [query, setQuery] = useState("build"),
    [advanced, setAdvanced] = useState(false);
  const id = article.id;
  let content,
    caption = "Interactive illustration · simplified for this story";
  if (id === "counselmate") {
    const tabs = ["Cause lists", "Live boards", "Case alerts"];
    content = (
      <>
        <div className="demo-tabs" role="tablist" aria-label="Court workflow">
          {tabs.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={step === i}
              aria-controls="court-panel"
              id={"court-tab-" + i}
              onClick={() => setStep(i)}
              onKeyDown={(e) => {
                if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                  e.preventDefault();
                  const n = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setStep(n);
                  document.getElementById("court-tab-" + n)?.focus();
                }
              }}
              tabIndex={step === i ? 0 : -1}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          className="demo-panel"
          role="tabpanel"
          id="court-panel"
          aria-labelledby={"court-tab-" + step}
        >
          <small>One place to follow the court day</small>
          <h3>
            {
              [
                "Find what is listed.",
                "Follow the day’s progress.",
                "Stay aware of changes.",
              ][step]
            }
          </h3>
          <p>
            {
              [
                "Cause lists bring scheduled matters into the daily workflow.",
                "Live boards help lawyers follow court information as it changes.",
                "Alerts connect updates back to the cases being followed.",
              ][step]
            }
          </p>
        </div>
      </>
    );
  } else if (id === "samadhan-seva") {
    content = (
      <>
        <p className="demo-kicker">A grievance needs a next step.</p>
        <div className="process-demo">
          {["Submitted grievance", "Routing & verification", "Next action"].map(
            (s, i) => (
              <React.Fragment key={s}>
                <button
                  className={step === i ? "selected" : ""}
                  onClick={() => setStep(i)}
                >
                  {s}
                </button>
                {i < 2 && <ArrowRight size={18} />}
              </React.Fragment>
            ),
          )}
        </div>
        <p className="demo-explanation" aria-live="polite">
          {
            [
              "A person describes an issue that needs attention.",
              "Routing and verification are the focus of the portal.",
              "The useful outcome is clarity about what happens next.",
            ][step]
          }
        </p>
      </>
    );
    caption =
      "Concept illustration, not a reconstruction of the product’s three layers.";
  } else if (id === "truecaller-helpline") {
    content = (
      <>
        <p className="demo-kicker">A service with a business model.</p>
        <div className="demo-tabs">
          {["Need help", "Use the helpline", "Pay per use"].map((t, i) => (
            <button
              key={t}
              onClick={() => setStep(i)}
              aria-pressed={step === i}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="demo-panel">
          <h3>
            {
              [
                "A question starts an interaction.",
                "AI provides the interaction.",
                "Individual use shapes the model.",
              ][step]
            }
          </h3>
          <p>
            {
              [
                "Who needs the service, and when?",
                "What useful help can the service provide?",
                "What makes the interaction worth paying for?",
              ][step]
            }
          </p>
        </div>
      </>
    );
    caption =
      "Concept questions; no production behavior, pricing or revenue implied.";
  } else if (id === "oracle-onboarding") {
    content = (
      <>
        <div className="demo-tabs">
          <button aria-pressed={!advanced} onClick={() => setAdvanced(false)}>
            Useful defaults
          </button>
          <button aria-pressed={advanced} onClick={() => setAdvanced(true)}>
            Advanced configuration
          </button>
        </div>
        <div className="config-demo">
          <div>
            <Layers size={28} />
            <h3>
              {advanced ? "Configure each policy." : "Start with a workflow."}
            </h3>
            <p>
              {advanced
                ? "Flexible control for technically equipped teams."
                : "A simpler starting point for smaller hospital teams."}
            </p>
          </div>
          <div className="policy-list">
            {(advanced
              ? [
                  "Identity configuration",
                  "Access policy",
                  "Device settings",
                  "Session policy",
                ]
              : ["Default policy workflow"]
            ).map((t) => (
              <span key={t}>
                {t}
                <Check size={15} />
              </span>
            ))}
          </div>
        </div>
      </>
    );
  } else if (id === "mettl-platform-scaling") {
    content = (
      <>
        <p className="demo-kicker">Messaging capacity · messages per second</p>
        <div className="demo-tabs">
          <button aria-pressed={!advanced} onClick={() => setAdvanced(false)}>
            Before
          </button>
          <button aria-pressed={advanced} onClick={() => setAdvanced(true)}>
            With SQS FIFO
          </button>
        </div>
        <strong className="demo-number">{advanced ? "1,000" : "200"}</strong>
        <div className="capacity-track">
          <span style={{ width: advanced ? "100%" : "20%" }} />
        </div>
        <p>
          ₹1.45 crore annual savings in the business case — forecast, not
          realized savings.
        </p>
      </>
    );
    caption =
      "Messaging initiative only. The 43% storage-cost reduction is a separate result.";
  } else if (id === "search-algorithms") {
    const text =
      "Build for people. Build with care. Learn from what you build.";
    const q = query.trim().toLowerCase();
    const parts = q
      ? text.split(
          new RegExp(
            "(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
            "gi",
          ),
        )
      : [text];
    content = (
      <>
        <label className="search-label">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 30))}
            aria-label="Search the sample text"
            placeholder="Search a word"
          />
        </label>
        <p className="search-sample">
          {parts.map((p, i) =>
            p.toLowerCase() === q && q ? (
              <mark key={i}>{p}</mark>
            ) : (
              <React.Fragment key={i}>{p}</React.Fragment>
            ),
          )}
        </p>
        <div className="demo-tabs">
          {["Inverted index", "Boyer–Moore", "Rabin–Karp"].map((t, i) => (
            <button
              key={t}
              aria-pressed={step === i}
              onClick={() => setStep(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="demo-explanation">
          {
            [
              "Prepare a term-to-position index, then look up matching terms.",
              "Compare a pattern and skip positions using mismatch information.",
              "Compare rolling hashes, then verify candidate matches.",
            ][step]
          }
        </p>
      </>
    );
    caption =
      "Matching illustration and algorithm concepts; not a benchmark of the archived implementations.";
  } else if (id === "number-plate-recognition") {
    const stages = [
      ["imgproc1.png", "Original vehicle image"],
      ["imgproc2.png", "Input number plate"],
      ["imgproc3.png", "Morphological processing"],
      ["imgproc4.png", "Character recognition output"],
    ];
    content = (
      <>
        <div className="image-demo">
          <img src={img(stages[step][0])} alt={stages[step][1]} />
        </div>
        <div className="step-controls">
          <button
            aria-label="Previous step"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeft />
          </button>
          <span>
            {step + 1} / {stages.length} · {stages[step][1]}
          </span>
          <button
            aria-label="Next step"
            disabled={step === stages.length - 1}
            onClick={() => setStep(step + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      </>
    );
    caption =
      "Original project artifacts. Stationary vehicles photographed at a fixed distance.";
  } else if (id === "offline-arcgis-map") {
    content = (
      <>
        <div className="demo-tabs">
          <button onClick={() => setStep(0)} aria-pressed={step === 0}>
            Map view
          </button>
          <button onClick={() => setStep(1)} aria-pressed={step === 1}>
            Feature layers
          </button>
        </div>
        <div className="image-demo">
          <img
            src={img(step ? "gis2.png" : "gis1.png")}
            alt={
              step
                ? "Original feature-layer view"
                : "Original offline map application"
            }
          />
        </div>
      </>
    );
    caption =
      "Original application screenshots; switch between map and feature views.";
  } else if (id === "image-preprocessing") {
    content = (
      <>
        <div className="demo-tabs">
          <button onClick={() => setStep(0)} aria-pressed={step === 0}>
            Processing artifact
          </button>
          <button onClick={() => setStep(1)} aria-pressed={step === 1}>
            Detection example
          </button>
        </div>
        <div className="image-demo">
          <img
            src={img(step ? "ip05.png" : "ip01.png")}
            alt={
              step
                ? "Original detection example"
                : "Original image-processing artifact"
            }
          />
        </div>
      </>
    );
    caption =
      "Original artifacts. One detection example is not a dataset-wide evaluation.";
  } else return null;
  return (
    <figure className={"interactive-demo demo-" + article.theme}>
      {content}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
