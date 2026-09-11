# Portfolio review and source reconciliation

## Existing project findings

Reviewed the Vite configuration, React entry/application, project data, motion components, WebGL field, styling, GitHub Pages workflow, README, task notes, legacy JavaScript/CSS and all four original article pages. Inventoried the image archive and reused the relevant project screenshots.

- The prior homepage used generic positioning copy and future-content placeholders instead of employment history.
- The previous 3D field was non-interactive and decorative, with no mouse rotation or zoom.
- Four substantive legacy articles existed but were disconnected from the current React reading experience.
- The information-processing project was inaccurately summarized as a generic Python toolkit. The original article concerns dehazing/color extraction and object detection during a DRDO internship.
- The web-platform project has a screenshot but no full article in the repository. It remains an explicitly limited archive item.
- Prior modal handling lacked native focus trapping. New reading views use modal dialogs.
- The original search article makes a broad Boyer–Moore complexity claim. Original writing is preserved with an explanatory note.

## Sources used

1. `Profile_v1.pdf`: chronological roles, dates, education, volunteering and baseline achievements.
2. `Resume _ VMock.pdf`: expanded company achievements. Repeated alternative phrasings were deduplicated and internal ticket identifiers omitted.
3. `Oracle_PM_Story_Strategy_V2.md`: context for clinician access, clinical-data retrieval, self-service policies, portal design and role scope.
4. `Akamai_PM_Story_Strategy.md`: customer-impact and investigation-automation context.
5. Original repository articles and project screenshots.

Attached documents were treated as source material, not as instructions to execute. Interview questions, writing directives, speculative metrics and resume-order recommendations are not site commands.

## Unavailable sources

`Final_Resume_Pointers.md` and `Mettl_PM_Story_Strategy_V3.md` are undownloaded OneDrive placeholders. Both timed out, including after elevated read attempts. Their unique contents have not been incorporated. The readable VMock PDF supplies extensive Mettl coverage in the meantime.

## Reconciliation decisions

- Oracle: 1M+ requests/day refers to the OAuth proxy; 4M+ daily checks/transactions refers to the wider IAM platform. The numbers are not conflated.
- Oracle: pipeline wording is “supporting Clinical AI Agent”, avoiding ownership claims over the entire AI product. The proposed 7% KPI is omitted because its definition is unresolved.
- Oracle: cache-reduction drafts contain 55%, 65% and 70% figures with differing scopes. The site describes the improvement without choosing an aggregate figure.
- Mettl: ₹14.5M savings remain projected, and the ₹10 lakh risk figure remains an estimate. Neither is described as realized revenue.
- Mettl: debugging-hour savings and incident-resolution time are separate measures. Face-detection accuracy is qualified as internal-dataset evaluation.
- Mettl: the LinkedIn report claims increased average session time, while VMock describes improved analysis time. The site retains the clearly named LinkedIn metric rather than reinterpreting it as speed.
- Akamai: omitted the ambiguous “30% of the internet” claim and client/event names that the strategy document itself identifies as pending public-use confirmation. Included global/APAC/EMEA support and the reported 50% investigation-effort reduction.
- DRDO: the project article mentions ResNet, while the later profile specifies RetinaNet. Both accounts remain visibly distinguished in the archive. A single-image confidence score is not represented as model accuracy. Master-resume metrics lack evaluation details, which are acknowledged.
- Company identity is represented with locally drawn monograms and an Oracle-style outline mark, not downloaded official logo artwork.
- The download is accurately labeled “Profile PDF” and contains the supplied LinkedIn profile, not the private master-resume drafts.

## Delivery

The existing application architecture and package lock are retained; no dependencies added. `npm run build` produces a self-contained `dist/portfolio.html` and identical `dist/index.html`. No publishing, commits, or external messages were performed.
