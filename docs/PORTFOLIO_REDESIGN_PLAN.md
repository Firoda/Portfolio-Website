# Aditya Firoda — Portfolio redesign research and plan

**Prepared:** 12 September 2026  
**Status:** Research and planning only. The existing application is unchanged.  
**Direction:** A white, cinematic, scroll-driven personal story, followed by spacious editorial project articles.  
**Primary reference:** [Apple iPhone Duo](https://www.apple.com/iphone-duo/).

**Latest content update:** The separate [portfolio content master](PORTFOLIO_CONTENT.md) now contains homepage copy, achievements, article drafts and a source/claim register from the readable supplied documents. Aditya confirmed a developer-to-product-management introduction, a PM/HR audience, April 2027 completion and mandatory single-file offline delivery on GitHub Pages. The Mettl strategy file remains unreadable; both résumés support its current draft. Implementation remains a later phase. Where earlier storyboard questions remain below, the content master supplies conservative wording and records unresolved details; the full questionnaire does not need to be answered again.

## 1. The experience we are designing

Start with **“Hi, I’m Aditya.”** Give the visitor a face and a sense of personality. Then use scrolling to move through the most recent chapter first:

**Introduction → ISB → Oracle → Mercer | Mettl → Akamai → DRDO → VIT / early foundations → Selected work → Contact.**

Each chapter answers four questions: Where was I? What problem mattered? What did I personally contribute? What changed?

The central visual changes with the story. It should demonstrate the work, rather than sit above a separate résumé. White space, large sans-serif typography, authentic company marks, soft lighting and deliberate camera movement establish the visual language.

The original requirements for Three.js and geometry generated in code remain in scope. Genuine portraits, company logos and project screenshots are image assets; they are not external 3D models. The single-file offline requirement is confirmed. Publish that self-contained HTML on GitHub Pages, with bundled runtime code and embedded assets rather than network-dependent libraries or media.

### Decisions already supplied by Aditya

- Clean white presentation across the site.
- Apple-like attention to typography, spacing, imagery and interaction.
- Scroll-led changes in focus, with recent experience before older experience.
- ISB must be the first experience chapter, followed by Oracle.
- Actual organization logos, replacing the current invented monograms.
- A personal introduction about a software developer learning business to become a product manager; the exact portrait or personal-object selection remains open.
- Primary audience: product managers, hiring managers and HR/recruiters.
- ISB expected completion: April 2027.
- One self-contained offline HTML file, hosted on GitHub Pages.
- Project articles should share Apple’s editorial clarity.
- Research and a detailed Markdown plan precede further implementation.

### Proposed defaults, awaiting Aditya’s answers

- A real portrait combined with a restrained, procedural laptop-and-coffee scene.
- Any further AI/platform specialization is optional; the confirmed positioning is an engineer learning business and moving toward product management.
- One coherent white editorial system for all articles, differentiated through subject imagery and useful demonstrations.
- Native scrolling controls the story. Free camera interaction is an optional, explicit mode.
- A compact narrative on the homepage, with every deduplicated achievement accessible through company detail views.

## 2. Research: what to take from Apple

### 2.1 Product storytelling

I opened the supplied iPhone Duo page in Chrome, inspected its accessibility structure and compared screenshots at the hero, highlights and successive design-section positions. Observed features include a centered introduction, dominant product imagery, a compact persistent local navigation bar, broad spacing, feature galleries and progressive focus on different product aspects. Controls include play/pause, gallery tabs, finish selection and an opening/closing interaction. The visual hierarchy remains consistent while the subject changes. These observations support a chapter-driven portfolio with one clear visual focus at a time. [Reference](https://www.apple.com/iphone-duo/)

**Our adaptation:** the person and the work replace the product. A laptop becomes the connective visual; its screen and surrounding procedural objects change with each career chapter. Scroll determines the narrative pose. A chapter navigation menu lets a recruiter jump directly to Oracle, ISB or the work archive.

**Important distinction:** visual behavior was observed; Apple’s private animation implementation was not reverse-engineered. This plan does not claim Apple uses Three.js, GSAP, or our proposed camera architecture. Exact Apple choreography is not a dependency.

### 2.2 Editorial storytelling

The inspected [Apple Stories developer profile](https://www.apple.com/newsroom/2025/11/developers-decode-their-journeys-from-app-ideas-to-app-store/) uses a large centered title, explanatory deck, category/date metadata, a narrow reading column, portraits, captions and prominently attributed quotations. At the inspected desktop viewport, its title measured 56px with 60px line height and 700 weight; the heading region was approximately 817px wide. These are sampled measurements, not universal Apple specifications.

[Apple’s Things developer article](https://developer.apple.com/articles/things/) is an additional reference for presenting engineering decisions as a readable narrative.

**Our adaptation:** lead with a concrete problem, tell the decision story, show the artifact, explain the result and finish with reflection. Use first-person authorship for Aditya. Avoid press-release language, invented quotes and a wall of résumé bullets. Technical detail belongs in readable sections and optional implementation notes.

### 2.3 Typography

Apple documents SF Pro as its platform system font. Its downloadable font license is not a general-purpose website embedding license. [Apple Fonts](https://developer.apple.com/fonts/)

Use the browser’s native system stack:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
```

This gives native Apple typography on Apple devices and appropriate fallbacks elsewhere. Match hierarchy, weight, spacing and line breaks instead of downloading Apple’s font files. If identical cross-platform letterforms become essential, choose a separately licensed webfont later.

### 2.4 Interaction and accessibility research

The existing project already includes Motion. Its `useScroll` exposes scroll progress that can drive transforms, making it suitable for an initial implementation with CSS sticky positioning. [Motion documentation](https://motion.dev/docs/react-use-scroll)

GSAP ScrollTrigger supports scrubbed timelines and pinning. It is a viable alternative if the prototype demonstrates that our multi-stage sequencing needs it; adding a second animation engine is not the default. [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

Reduced-motion preferences must switch the presentation to readable static chapter states. W3C’s guidance for animation triggered by interaction supports allowing nonessential movement to be disabled; that particular criterion is AAA, not a claim that all such animation violates AA. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

## 3. What changes from the current portfolio

| Current experience | Planned experience | Reason |
|---|---|---|
| Dark green surface with serif accents | White and pale gray surfaces, strong sans-serif hierarchy | Align with the requested visual direction |
| Five small islands presented simultaneously | One large workspace subject and a focused chapter at a time | Make the visual legible and the narrative sequential |
| Oldest-to-newest history | ISB first, then reverse chronology | Lead with current identity and recent impact |
| Hero-only atlas and long text chapters | Scroll-linked scene changes throughout the career story | Connect animation directly to the work |
| Invented organization marks | Genuine logos sourced from official material | Preserve recognizable identity |
| Large hover panel containing many bullets | Small hover preview, persistent click/tap details | Keep reading comfortable and make mobile behavior equivalent |
| Differently tinted modal articles | Full-page white editorial reading views | Give the writing space and stable navigation |
| Repeated resume formulations | One primary story per chapter with supporting proof | Improve comprehension without discarding evidence |

Preserve existing project slugs, original screenshots, useful contact links, the résumé/profile download and all substantive article content. Keep source caveats in editorial notes where necessary. Do not silently convert projected benefits into achieved outcomes.

## 4. Page structure and pacing

The following are **proposed design budgets**, not measured Apple values. A “viewport” is roughly one screen height of page travel; it is not a timed autoplay step.

| Sequence | Purpose | Desktop scroll budget | Main visual | Deeper content |
|---|---|---:|---|---|
| Introduction | Establish person and direction | 1.5 viewports | Portrait plus open laptop and coffee | Short about text |
| ISB, 2026–27 | Explain current leadership and product building | 2.4 | Workshops → grievance workflow → helpline concept | Club, Samadhan Seva and Truecaller details |
| Oracle, 2024–26 | Show healthcare product judgment and scale | 2.4 | Login journey, policy flow or retrieval pipeline | Full Oracle achievements |
| Mercer Mettl, 2021–24 | Show platform and customer workflow improvements | 2.4 | Assessment workflow and gateway | Full Mettl achievements |
| Akamai, 2020–21 | Show customer-facing reliability | 1.6 | Streaming path and diagnostic view | Incident/automation story |
| DRDO, 2019–20 then 2018 | Show technical foundations | 1.8 | Image processing followed by offline map layers | Two original project articles |
| VIT / foundations | Give educational and human context | 0.8 | Early project screenshot or personal photo | Education and volunteering |
| Selected work | Invite deeper exploration | Content-driven | Large editorial thumbnails | Five existing project entries |
| Contact | Make the next step obvious | 0.8 | Small portrait or quiet workspace composition | Email, LinkedIn, résumé |

Aim for approximately 14–18 desktop viewports including the work index, subject to content length. The compact chapter menu provides a faster route. Mobile uses substantially shorter transitions and natural content height.

VIT overlaps the internship years. Label it as an educational foundation, not a job that occurred after DRDO. Volunteer roles from 2022–23 belong in a clearly dated “Beyond work” subsection, not in a misleading chronological employment sequence.

## 5. Chapter-by-chapter storyboard and inputs

All proposed headlines below are drafts. Dates and achievements come from supplied documents; the narrative emphasis still needs Aditya’s input.

### 5.1 Introduction — “Hi, I’m Aditya.”

**First screen**

- Name and a one-line personal introduction.
- A real portrait with a clean crop; a laptop and coffee provide a personal workspace context.
- Two clear actions: “Explore my story” and “Read my work”.
- A small indication of the current ISB chapter.

**Scroll sequence**

1. Begin with the face and greeting fully readable. Do not hide them behind a loading screen.
2. The workspace moves gently toward the center; the laptop lid opens a little further.
3. The portrait and introductory text recede without rotating the face in 3D.
4. The laptop screen becomes the visual window into ISB. Its position is shared with the opening pose of the next chapter.

**3D detail specification**

Rounded laptop body, hinge, keyboard keycaps, trackpad, screen bezel, camera opening, ports, ceramic cup with handle and a small notebook. Neutral metal, soft shadow, restrained reflections, white studio lighting. All geometry generated from code. Optional coffee steam is subtle and disabled with reduced motion. No prebuilt model, fake Apple logo or invented personal likeness.

**What I need from Aditya**

- Hero choice: real portrait plus workspace, portrait only, or fully procedural workspace.
- A preferred portrait: ideally a sharp original at least 1600px on the long side, with some space around the head and shoulders. This is a preferred asset specification, not a hard upload gate.
- One sentence describing how you introduce yourself in conversation.
- Two or three genuine personal details that belong in the scene: coffee, books, music, a particular hobby, or a favorite object.
- The primary audience and roles you are targeting.

**Without the portrait:** use the procedural workspace and the written introduction. Do not generate a face and present it as Aditya.

### 5.2 ISB — current identity

**Source:** [Aditya_Firoda_v4.docx](</Users/adityafiroda/Library/CloudStorage/OneDrive-IndianSchoolofBusiness/ISB/Resume/Draft PDF versions/Aditya_Firoda_v4.docx>). These are résumé-reported achievements, not independently audited results. The document places the club and competition bullets directly under ISB; specific dates and individual ownership remain to be supplied.

**Known:** PGP in Management, April 2026–April 2027 (expected). Aditya explicitly confirmed April 2027, resolving the older LinkedIn date discrepancy. Campus remains unspecified. “Class of 2027” works as the short headline.

**Draft headline:** “Learning. Building. Bringing people together.”

**Proposed opening copy:** “At ISB, I’m combining product building with community leadership—from technology workshops to AI projects that address everyday problems.”

This gives the first chapter real evidence. Use three scroll beats, with short headlines and one lead number at a time.

#### Beat A — Business Technology Club

**Documented:** Tech Coordinator; conducted 15+ workshops with 20+ alumni, engaging 300+ students.

**Draft copy:** “Bringing builders into the conversation.” A short paragraph states the role and what the workshops helped students do, once the topics are supplied.

**Visual:** official ISB logo and a clean workshop/event surface on the laptop. Three actual event photos or slides can advance with the scroll. Until those exist, use factual event text and a restrained diagram, not invented workshop photographs.

**Proof hierarchy:** 15+ workshops as the main callout; 20+ alumni and 300+ students as supporting context. Do not imply that 300+ is per-workshop attendance, unique students or a cumulative figure until clarified.

**Interaction:** click/tap “Inside the workshops” for topics, dates, role and selected artifacts. Hover may preview a workshop title, but is never required to read the story.

#### Beat B — Samadhan Seva

**Documented:** first runner-up at a Replit AI hackathon; ₹1 lakh prize; a three-layer AI portal to route and verify grievances. The following résumé bullet describes official-source retrieval, guardrails against unsupported answers and routing risky cases for review; confirm that it belongs to Samadhan Seva.

**Draft copy:** “A clearer path from a grievance to the right action.”

**Visual:** the workshop screen transitions into a grievance workflow. A short illustrative request is classified and routed; a source/evidence panel appears; a review checkpoint makes the guardrail visible. Treat these as a proposed explanatory sequence, not the names of the product’s actual three architectural layers. We need those layer definitions from Aditya.

**Proof hierarchy:** “First runner-up” plus the exact event name; ₹1 lakh prize as secondary evidence. Avoid implying the award or prize was individual rather than team-based until confirmed.

**Interaction:** a deterministic, prewritten example toggles between a supported response and a “Needs review” state. This can run fully offline; a live AI service is not required for a portfolio demonstration. Use clearly fictional sample grievance content.

#### Beat C — Truecaller Microtransaction Challenge

**Documented:** National Finalist; résumé notation “10/3000+”; a pay-per-use AI helpline concept.

**Draft copy:** “Making help available, one conversation at a time.”

**Visual:** a clean handset/call interface appears beside the laptop. It walks through the helpline user journey and, if relevant, an explicitly illustrative payment step. Do not invent the actual price, audience, call performance or transaction volume.

**Proof hierarchy:** “National finalist” is usable from the résumé. “Top 10 of 3,000+” requires confirmation of what those counts refer to. The ₹54 crore annual-revenue statement must not be presented as earned revenue; its status is unresolved. If confirmed as a forecast, label it as the proposed annual opportunity and explain the assumptions in detail view.

**Interaction:** “Explore the concept” opens the target user, problem, pricing rationale, personal contribution and competition outcome. Do not simulate a real payment or live call.

#### Chapter entry and exit

The hero workspace holds its position as the authentic ISB mark enters. The laptop screen becomes the continuity device across community → grievance workflow → helpline concept. Each beat has a readable hold before the next transition. Exit from the helpline’s access step into Oracle’s clinician access story; keep the link conceptual rather than claiming the projects share technology.

**Desktop budget:** increase the provisional ISB budget to 2.4 viewports for three concise beats. If text grows, use natural reading height and optional details instead of extending a long pinned interval. Mobile presents the three beats vertically with short media transitions.

#### What is now supplied

- Programme name.
- Club title and three reported activity/engagement counts.
- Samadhan Seva name, high-level purpose, hackathon placement and prize.
- Truecaller finalist status and basic product concept.

#### What I still need

1. Campus, if it should appear; expected completion is confirmed as April 2027.
2. Club role start date, workshop topics, one example of personal impact, and whether participant/alumni counts are unique or cumulative.
3. Exact hackathon name/date, team size, personal role, prize allocation if relevant, and demo/screenshots.
4. Samadhan Seva’s actual three layers and whether the RAG/guardrails bullet belongs to it.
5. Truecaller event date, meaning of “10/3000+”, intended users, prototype/shipped status and personal role.
6. Whether ₹54 crore is a forecast/opportunity, with the model assumptions; omit the figure from headline copy until clarified.
7. One personal sentence about how ISB changed the way you approach products.

#### CounselMate — a strong related story, kept separate from ISB attribution

The same résumé identifies CounselMate as a separate product beginning in December 2025: 30+ lawyer interviews, approximately 300 monthly active users, and reported savings of approximately 45 minutes per user per day. Its workflow combines cause lists, live boards, case details, orders, judgments and alerts for Rajasthan High Court lawyers; the résumé says it is available on iOS and Play Store.

**Recommendation:** make CounselMate a leading item in Selected Work and a candidate for the first new editorial case study. Link to it from the ISB chapter only if Aditya confirms that relationship. Its start predates ISB, so do not label it an ISB course project or competition entry. Ask for store links, launch date, current measurement window, basis of the time-saving estimate, collaborator roles and screenshots before designing the full case study.

### 5.3 Oracle — healthcare access and product judgment

**Known:** Senior Member of Technical Staff, April 2024–April 2026, Bengaluru.

**Draft headline:** “Making complex systems easier to use.”

**Recommended primary story:** clinician single sign-on, followed by self-serve hospital onboarding. Clinical AI retrieval becomes either the third beat or the primary story if AI/platform roles are the chosen audience.

**Narrative beats**

1. Show the user problem: clinicians navigating multi-step access or hospital IT teams struggling with configuration.
2. Show the design choice: modular login or an API workflow complemented by simpler defaults.
3. Show one clearly defined outcome with its population and scope.
4. Offer “Explore my Oracle work” for the remaining achievements.

**Visual and transition**

A neutral, explicitly illustrative login flow simplifies into a single path. Policy controls settle into sensible defaults. For AI, a compact records-to-retrieval diagram explains the data pipeline. Use a real red Oracle wordmark alongside the role; never distort or morph the logo. Transition to Mettl by turning the neutral workflow surface into an assessment setup journey.

**Candidate proof points already present**

- 17+ hospitals and 23% fewer support change requests for self-serve onboarding.
- Authorization latency improvement: earlier documents say 64%; the newly supplied v4 résumé says 17%. Hold this figure out of headline copy until scope and baseline are reconciled.
- 27% lower manual update/fetch effort for the clinical-data pipeline.
- 1M+ daily proxy requests versus 4M+ daily IAM checks: different scopes.

**What I need**

- Which story best represents you: SSO, self-serve onboarding or clinical AI?
- In 3–5 sentences: the original user pain, your decision, the alternative rejected and the outcome.
- Your precise ownership boundary and the collaborators involved.
- For the chosen metric: baseline, denominator/population, measurement period and source.
- Whether we can show a sanitized artifact, or should use a clearly illustrative workflow.
- One personal lesson; any customer names or product details you want omitted.

**Content issue to resolve:** the latest résumé was supplied to inform ISB, so it does not silently overwrite the Oracle source record. Resolve its 17% latency claim against the earlier 64% claim before selecting the metric. Keep the ambiguous proposed 7% KPI out. Choose the actual scope before using any of the differing cache-reduction figures. These uncertainties do not prevent the chapter from being designed.

### 5.4 Mercer | Mettl — assessments and platform scale

**Known:** Software Developer, September 2021–March 2023; Senior Software Engineer, March 2023–March 2024; Gurugram.

**Draft headline:** “Less friction. More room to grow.”

**Recommended primary story:** making assessment integration and configuration easier. Gateway reliability supplies the performance proof. The infrastructure business case is a supporting story unless Aditya chooses it as the lead.

**Narrative beats**

1. Show a real administrator/integration problem.
2. Reveal the gateway or configuration redesign as a concrete simplification.
3. Surface two supporting outcomes at most.
4. Make the promotion and recognition visible without interrupting the story.

**Visual and transition**

An assessment interface sits on the laptop. An intentional “Before / After” control compares configuration or integration paths. A few procedural request blocks move through a gateway to illustrate service separation. A six-action configuration module is an alternative demonstration. The exiting request path becomes Akamai’s delivery path.

**Candidate proof points**

99.4% of requests under 200ms; 43% lower incident-resolution time; 15% fewer false candidate flags; 14% higher self-service adoption. Select only metrics attached to the featured story. ₹14.5M remains a projected annual infrastructure saving, not realized profit.

**What I need**

- Rank your two strongest stories: gateway, configuration assistant, image-quality improvement, Qmark SSO, or SQS business case.
- One specific before/after example and your personal decision.
- Confirm prototype versus shipped status for AI assistant and migration claims.
- Clarify whether the 20% report measure concerns longer engagement or faster analysis.
- Confirm the provisioning units and batch size for the Qmark improvement.
- Any usable demo screenshot, diagram, award image or public project link.
- The readable contents of the Mettl V3 story note when available; its OneDrive copy previously timed out.

### 5.5 Akamai — reliability experienced by people

**Known:** Technical Solutions Engineer Associate, July 2020–August 2021, Bengaluru.

**Draft headline:** “When the stream matters, every second does.”

**Narrative beats**

1. Establish the human consequence of buffering during an important event.
2. Show how you investigated the delivery path.
3. Show the repeated manual work turned into log-analysis automation.
4. End on the reported 50% reduction in manual investigation effort.

**Visual and transition**

A simple video surface and delivery path show where an interruption occurs. Scroll reveals a diagnostic lens and consolidated log view. Use abstract content or an authorized asset; the scene does not need real match footage. A playback indicator stabilizes as the result appears. Transition by flattening the delivery path into an offline mapping surface.

**What I need**

- One incident story: symptom, stakes, investigation, action and result.
- What the script actually read and automated.
- How the 50% improvement was estimated or measured.
- Whether Sony, Sky Media and particular sporting events may be named, or should remain generalized.
- Your most important customer-facing lesson from the role.

**Avoid:** assigning a corporate-wide internet traffic statistic to your personal contribution.

### 5.6 DRDO — two distinct internships

**Known:** SDE internship, December 2019–May 2020; software-development traineeship, May–June 2018; Jodhpur.

**Draft headline:** “Finding the signal in difficult conditions.”

**Narrative beats, recent to old**

1. 2019–20: image preprocessing, dominant-color extraction and detection.
2. A controlled before/after demonstration shows what the processing changes.
3. 2018: offline mapping, layers, coordinate formats and feature inspection.
4. Link directly to the corresponding original article for each project.

**Visual and transition**

Use repository images with a labeled comparison slider for the vision story. A procedural layered map then exposes tiles, a feature layer and a coordinate readout. Keep the visual grounded in the existing artifacts; avoid a dramatic military scene unrelated to the demonstrated work. The map recedes into the early-build archive.

**What I need**

- Exact laboratory/organization names for both internships. The profile labels differ and should be reconciled before choosing the emblem.
- Whether RetinaNet was used with a ResNet backbone, or whether the article and profile describe different iterations.
- Whether 97% refers to accuracy, another evaluation metric or a particular dataset, and the evaluation conditions.
- The basis for the 30% operating-cost and 50% analysis-effort claims.
- Which original images and implementation details are appropriate to display.

### 5.7 VIT and beyond work

**Known:** B.Tech, Computer Science, 2016–2020; volunteering with iVolunteer, Shiksha Bharti School and Kherwadi Social Welfare Association.

**Draft headline:** “The curiosity came first.”

Keep this short: one origin story, one early build and one human contribution. Use a genuine VIT logo if the institution is featured prominently. Volunteer dates remain explicit. Do not invent more 3D objects merely to fill this section.

**What I need**

- One origin story about beginning to build software.
- Whether to include GPA, Riviera/HEARTS-VIT involvement, or a college photograph.
- Which volunteer experience you want to emphasize and what you personally did.
- Whether this material deserves its own chapter or a compact closing section.

### 5.8 Contact

**Draft:** “Let’s build what comes next.”

A clear target-role line, email, LinkedIn, GitHub and résumé download. End on a calm composition of the opening workspace; avoid a forced animation before contact links become usable.

**What I need:** preferred résumé file, exact availability wording, target roles, preferred contact method and any location preference to make public. Do not infer job availability from graduation dates.

## 6. Actual logos: sourcing and treatment

The implementation will use genuine artwork. The research phase identifies official sources; it does not claim every final vector has already been downloaded or its usage cleared.

| Organization | Source identified | Planned treatment | Remaining detail |
|---|---|---|---|
| ISB | [Official logo and brand page](https://www.isb.edu/news/logo-and-brand) | Current blue mark and wordmark, preserved as provided | Choose supplied variant suitable for white |
| Oracle | [Brand guidelines](https://www.oracle.com/a/ocom/docs/oracle-brand-guidelines.pdf), [logo usage guidance](https://www.oracle.com/sn/legal/logos/) | Genuine red wordmark, correct proportions | Obtain appropriate official artwork and check stated usage terms |
| Mercer Mettl | [Official site](https://mettl.com/en/), [official co-branded document](https://mettl.com/clients/wp-content/uploads/sites/18/2022/12/CS-Celebal-Technologies-Hackathone.pdf) | Complete Mercer/Mettl lockup | Confirm historical/current variant; obtain clean SVG or transparent image |
| Akamai | [Official media resources and logo download](https://www.akamai.com/newsroom/media-resources) | Complete wave plus wordmark | Use the provided artwork and usage guidance |
| DRDO | [Official organization site](https://www.drdo.gov.in/) | Genuine appropriate emblem | First reconcile exact laboratory identity |
| VIT | [Official institution site](https://vit.ac.in/) | Genuine institutional mark | Include only if the foundations section is retained |

ISB has a refreshed identity; use the current official source rather than an old search-image result. Akamai specifically keeps the wave and wordmark together. Oracle and Akamai publish conditions for third-party logo use; public availability is not itself a blanket license. These are asset-production considerations, not a reason to stop planning. No outreach will be sent on Aditya’s behalf without a request.

Do not redraw, recolor arbitrarily, stretch, extrude or break apart the marks. Animate the surrounding panel and scene. Keep each logo readable, with clear space, and identify it as an employer or educational affiliation. In single-file delivery, embed the approved assets locally rather than hotlinking.

## 7. Visual system

These are proposed portfolio specifications, not exact Apple tokens.

| Element | Proposed direction |
|---|---|
| Canvas | White `#FFFFFF`; quiet section surface `#F5F5F7` |
| Primary type | Near-black `#1D1D1F` |
| Supporting text | Gray around `#626267`, checked against the actual surface |
| Links/actions | Restrained blue; organization color only as a local accent |
| Hero title | 80–112px desktop; 44–56px mobile; responsive line breaks |
| Chapter headline | 48–72px desktop; 32–44px mobile |
| Main explanatory copy | 20–24px desktop; 17–20px mobile |
| Article body | 19–21px desktop, 17–19px mobile; 1.55–1.7 line height |
| Metadata/navigation | Generally 14–16px; 12–13px only for secondary labels |
| Reading column | Approximately 650–720px maximum |
| Wide media | Approximately 1100–1320px maximum, responsive |
| Section spacing | 100–160px desktop, 56–88px mobile, adjusted to content |
| Corners | Mostly 20–28px for large media surfaces; avoid boxing every paragraph |
| Lighting | White studio lighting, soft contact shadows, restrained metal and ceramic materials |

Remove pervasive tiny uppercase monospace labels, dark grids, neon effects and decorative serif italics. Use monospace only for actual code or coordinates. The portrait, work artifacts and typography should carry the personality.

## 8. Scroll and interaction contract

### Story mode: the default

- Native wheel, trackpad and touch scrolling always moves the page.
- A sticky visual stage persists through the active chapter’s short narrative beats.
- Chapter progress drives camera, object pose, screen content and text emphasis.
- Scrolling backward reverses the sequence deterministically.
- Stopping scroll holds the narrative pose. Only subtle optional idle motion continues.
- No scroll hijacking, timed unlocks, mandatory snapping or horizontal trapping.
- Text remains real, selectable HTML; it is never readable only inside a canvas.

### Optional “Explore the scene” mode

The original request for mouse rotation, scroll zoom and idle rotation must coexist with the new scroll story. A deliberate “Explore in 3D” button resolves the conflict:

1. Enter exploration and hold the current chapter pose.
2. Enable drag rotation and wheel/pinch zoom only inside that explicitly active viewer.
3. Offer labeled zoom controls, reset, pause and an obvious “Back to story”.
4. Escape exits exploration and restores page scrolling at the same position.
5. Idle rotation is slow, limited and disabled by reduced-motion preference.

Do not attach always-active OrbitControls wheel handling to the entire narrative canvas. That would consume the same gesture needed to advance the story.

### Company hover, click and touch

A compact employer strip or chapter menu uses actual logos. Hover/focus gives a brief preview and subtle scene emphasis. Moving away restores the story pose. Click/tap opens a persistent details panel with every relevant achievement grouped by subject. It must have a clear close action, Escape support and focus restoration.

This preserves the original desire to explore all company pointers while preventing a long document from disappearing when the pointer moves. Full details are never hover-only. Adding detail content must not destabilize a pinned scene; use a separate reading panel or a disclosure outside the pinned interval.

### Proposed transition timing

For a major chapter: first 15% establishes identity; 15–45% demonstrates the problem; 45–75% reveals the decision; 75–90% holds the result; final 10% prepares the next visual. These percentages are starting points and will be tuned to actual reading time.

One master narrative progress value owns the camera. Hover and exploration apply temporary offsets instead of competing independent camera animations. Hand-offs share a compatible exit/entry pose.

## 9. Articles: one editorial identity, different demonstrations

### Shared article structure

1. Category, title and one-sentence deck.
2. Author, honest date/update information and calculated reading time.
3. Large image or concise project demonstration.
4. Opening paragraph explaining the user problem.
5. Constraint and context.
6. Decision and alternatives considered.
7. Implementation through two or three readable subsections.
8. Evidence: screenshots, a diagram, measured results or clearly stated qualitative outcome.
9. Limitations and what Aditya would do differently now.
10. Related project and return-to-portfolio link.

Use captions that explain what a screenshot demonstrates. Pull quotes must come from a real supplied statement. If a number is illustrative, label it. Archive dates must not be invented. Existing articles can be edited for clarity while preserving original source material in the repository.

### Existing project plan

| Article | Editorial angle | Distinct useful interaction | Missing input |
|---|---|---|---|
| Offline ArcGIS map | Making geospatial tools useful without connectivity | Toggle tile/feature layers and inspect coordinates on an illustrative map | User context, workflow example, source availability, confirmed dates |
| Number-plate recognition | Turning an image into structured text | Step through original → grayscale → segmentation → result using existing outputs | Test conditions, evaluation set, known failure cases |
| Search algorithms | Choosing a search strategy for the problem | Step through a small string using the three approaches; optional comparison table | Implementation variants, code link and supported complexity claims |
| Image preprocessing/detection | Improving input quality before detection | Before/after slider using corresponding source images; detection output with caption | Model/backbone clarification and evaluation details |
| Interactive web platform | An early interface experiment | Simple screenshot gallery, only if more artifacts exist | What it did, who it served, contribution, date and repository/demo |

Keep all five discoverable. The web-platform entry stays a short archive note unless enough real material arrives to support an article. Do not pad it into a fictional case study.

### Optional new articles, subject to content readiness

CounselMate is the recommended first new story because it has a concrete user-research-to-product arc. Samadhan Seva is a strong second candidate. Oracle self-serve onboarding, Mettl’s infrastructure business case and the Truecaller concept can follow as material becomes ready. Present these as new feature stories above the retained builder archive, subject to Aditya’s selection. No new article has been written or published in this planning phase.

### Reading behavior

Full-page article views replace the current overlay feel. Browser Back restores the portfolio’s prior position. Preserve existing `#article/<slug>` links in the single-file version. On a separately served website, real static article URLs are preferable for individual metadata and indexing. This is a delivery decision, not permission to drop the single-file requirement.

Most article content scrolls normally. Use one purposeful interactive demonstration per article; do not pin every paragraph or repeat the homepage’s camera journey.

## 10. Technical implementation plan

### Retain

Vite, React, Three.js, the package lock, project data and original screenshots. Reuse existing Motion before considering a new dependency. Keep the current portfolio recoverable through version control.

### Replace or restructure after this plan is agreed

- Replace the atlas composition with a `StoryScene` and procedural workspace primitives.
- Introduce a data-driven `StoryChapter` structure with story beats separated from full achievements.
- Move genuine logo references into a brand asset manifest.
- Separate camera timeline, interaction offsets and reduced-motion poses.
- Replace ad-hoc article extraction as the primary presentation with structured article sections; retain source HTML as the archive reference.
- Keep a shared white design system across homepage, details and articles.

### Scene data contract

Each chapter needs: ID, institution, role, dates, official logo asset, headline, short narrative beats, selected metric with context, source note, full achievements, visual asset references, entry/exit camera poses, mobile/static fallback and related article IDs.

Each metric needs: value, unit, baseline, population, timeframe, source and status (`measured`, `estimated`, `projected`, or `unconfirmed`). Only supported values enter public copy.

### Rendering and asset strategy

Use one WebGL renderer and reuse geometry/materials where possible. Create chapter objects on demand, pause rendering off-screen/in background, and dispose obsolete resources. Cap device-pixel ratio and reduce geometry/shadow cost on mobile. Show a real static hero immediately while the scene initializes.

The laptop screen may use a texture for decorative visuals, but essential prose and controls remain DOM elements. Do not embed sensitive application screenshots; illustrative diagrams are clearly identified. Procedural geometry remains the default for all 3D objects.

### Single-file decision

**Confirmed:** One self-contained offline HTML file, published on GitHub Pages. Embed scripts, styles, fonts (if used), logos and selected media. Article navigation must work inside this artifact and when opened locally. Do not depend on a CDN, API or server route for core content or interaction. External contact and source links can still require connectivity.

This rules out a separate optimized multi-page site as the primary deliverable. Keep the existing source/build workflow if useful, but validate the final artifact with networking disabled and under the GitHub Pages repository path.

Do not promise cinematic image sequences at a tiny file size. Favor live procedural geometry and a small, optimized set of real photos. Suggested starting target for the offline artifact is 6–8 MB total, revisited once the portrait and article media are selected. This is an engineering budget, not a measured result or hard user requirement.

## 11. Mobile, accessibility and performance

On phones, place the greeting and a meaningful part of the visual in the opening screen. Use a shorter scene, fewer camera changes and vertically stacked proof. A large empty pinned interval is not acceptable. At increased text size, disable pinning where it would clip content.

With reduced motion, show static chapter compositions and all narrative text in order. Pause means no idle rotation, steam or repeated animated accents. Keyboard visitors must be able to navigate chapters, open full details, operate demos and return without touching the canvas. Keep visible focus and readable contrast; allow browser zoom.

Before delivery, test at 390px mobile, tablet, 1440px desktop and 200% text enlargement. Include Chrome and Safari when available, touch scrolling, fast scroll/reverse scroll, deep links, browser Back, context loss and missing-asset fallback.

For a published version, target LCP ≤2.5s, INP ≤200ms and CLS ≤0.1, recognizing that field metrics are evaluated at the 75th percentile and cannot be certified from a single local run. [Web Vitals](https://web.dev/articles/vitals)

Additional project budgets: smooth desktop motion near 60fps, a mobile fallback if frame cost is persistently high, no layout movement when media loads, and no forced animation delay before content can be read. Measure on agreed devices rather than claiming universal frame rates.

## 12. Implementation sequence and review points

| Phase | Concrete output | Completion condition |
|---|---|---|
| 0. Research and intake — this phase | This plan, official source list and chapter questions | Aditya can assess the intended experience and supply missing inputs |
| 1. Content and assets | Final chapter order, selected stories, portrait decision, logo files and metric register | No invented ISB achievements or unresolved headline claims |
| 2. Representative prototype | White introduction → ISB → Oracle, with one complete scene transition | Personal introduction, scroll progression and genuine logos work together on desktop and phone |
| 3. Remaining narrative | Mettl, Akamai, DRDO, foundations and contact | Reverse chronology, reversible transitions and complete detail access |
| 4. Editorial system | One fully rewritten article, then remaining archive entries | Readable page, genuine evidence and a subject-specific demonstration |
| 5. Validation and export | Tested build and requested delivery format | Performance/accessibility checks pass; sources and limitations documented |

Aditya asked to plan before proceeding, so implementation begins only after the content/direction conversation. This is not an additional approval requirement inferred from a skill. Publishing remains a separate action from a local redesign.

## 13. Questions for Aditya — reply in manageable batches

### First batch: needed before the visual prototype

1. **Opening:** portrait + laptop/coffee, portrait only, or procedural workspace only? Which personal objects belong in the scene?
2. **Positioning — answered:** software developer learning business to become a product manager; primary audience PM/HR.
3. **ISB:** the new résumé supplies the core activities. Remaining questions are campus, individual roles and project artifacts, plus the Truecaller revenue/count interpretation. See the revised ISB storyboard above.
4. **Delivery — answered:** one offline HTML file is mandatory; host it on GitHub Pages.

Positioning, delivery and the completion month are answered. The supplied documents now support the separate content master. Retain the remaining questions as a future reference, not a prerequisite for this content phase. The exact hero assets and ambiguous revenue interpretation remain unresolved.

### Second batch: the work stories

5. **Oracle:** choose the lead story; give the before/after, your decision and a clearly scoped metric.
6. **Mettl:** choose the lead story; confirm prototype/shipped status and the measurement ambiguity noted above.
7. **Akamai:** give one representative incident and what the log tool automated; indicate whether client/event names should remain generalized.
8. **DRDO:** confirm laboratory names, model lineage and any headline evaluation metric.

### Third batch: finishing the editorial picture

9. **Foundations:** which VIT or volunteering story deserves space?
10. **Articles:** choose the first two to rewrite, provide any code/demo links and decide whether a new ISB or work case study should join them.
11. **Assets:** identify your preferred portrait, any personal/campus photos, sanitized project artifacts and official logo files you already have. I can source the official logos; you do not need to hunt for every file.
12. **Contact:** preferred final résumé, availability statement and target-role wording.

### Copy-and-fill answer sheet

```text
OPENING
Hero choice:
Personal objects / personality:
One-line introduction: Software developer learning business to become a product manager
Primary audience / target roles: Product Manager / HR
Single offline HTML still mandatory?: Yes; GitHub Pages

ISB
Campus / expected completion month: Campus unspecified / April 2027 (confirmed)
Why I chose this chapter:
Business Technology Club — role dates / workshop topics / count definitions:
Samadhan Seva — event date / team / my role / three layers / status / demo:
Truecaller — date / ranking meaning / my role / status / revenue interpretation:
Available photo or project artifact:
CounselMate — connection to ISB, if any / store links / metric window:

FOR EACH COMPANY
Company:
Story I want people to remember:
Who had the problem:
What happened before:
My exact responsibility:
Decision I made and alternative I rejected:
What changed:
Metric — value / baseline / timeframe / scope:
One lesson:
Artifact or link:
Details to omit or generalize:

ARTICLES / CLOSING
First two articles to prioritize:
Any new project to include:
VIT or volunteer story:
Preferred résumé and contact wording:
```

## 14. Definition of a successful redesign

- The first screen introduces Aditya as a person and shows a polished visual immediately.
- Scrolling reveals the correct recent-to-old sequence, beginning with ISB.
- Each major chapter uses a distinct demonstration tied to actual work.
- Official company marks are recognizable and unaltered.
- A recruiter can understand the primary story quickly, then access the full evidence.
- Reversing scroll, switching chapters and returning from an article feel predictable.
- Full detail is accessible by keyboard and touch, without requiring hover.
- White editorial articles make the existing projects easier to read and understand.
- The result respects the selected delivery format and works with reduced motion or unavailable WebGL.
- Unresolved facts remain questions; they are not disguised by attractive animation.

## 15. Source update register

| New source | Incorporated into this plan | Still unresolved |
|---|---|---|
| Aditya_Firoda_v4.docx, supplied 12 September 2026 | ISB PGP title; club leadership; Samadhan Seva; Truecaller concept; CounselMate as a separate case-study candidate | Campus; dates and team roles; Truecaller ranking and revenue status; personal ownership; metric measurement windows |

This document is a résumé draft and contains other changed company metrics. The most material conflict noticed is Oracle authorization latency (17% here versus 64% earlier). The website is unchanged; reconciliation belongs in the content phase. The ₹54 crore figure is held as unconfirmed, and CounselMate is not attributed to ISB without evidence.
