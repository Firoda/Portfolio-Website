import { readFileSync, statSync } from "node:fs";
import assert from "node:assert/strict";
const html = readFileSync("dist/index.html", "utf8");
assert.equal(
  html,
  readFileSync("dist/portfolio.html", "utf8"),
  "Both standalone exports must match",
);
const markup = html.replace(
  /(<script\b[^>]*>)[\s\S]*?<\/script>/gi,
  "$1</script>",
);
assert(
  !/<script[^>]+src=/i.test(markup),
  "Standalone HTML must not load an external script",
);
assert(
  !/<link[^>]+rel="(?:stylesheet|modulepreload)"/i.test(markup),
  "Standalone HTML must not load CSS or modules",
);
assert(
  !/\/Users\/|OneDrive-IndianSchoolofBusiness|Mettl_PM_Story_Strategy/.test(
    html,
  ),
  "Private working paths must not ship",
);
assert(
  html.includes("data:application/pdf;base64,"),
  "Profile download must be embedded",
);
for (const slug of [
  "counselmate",
  "samadhan-seva",
  "truecaller-helpline",
  "oracle-onboarding",
  "mettl-platform-scaling",
  "offline-arcgis-map",
  "number-plate-recognition",
  "search-algorithms",
  "image-preprocessing",
  "interactive-web-platform",
])
  assert(html.includes(slug), `Missing article: ${slug}`);
assert(
  statSync("dist/index.html").size < 8 * 1024 * 1024,
  "Export should fit the agreed starting budget",
);
console.log(
  "Export checks passed: standalone scripts/styles, embedded profile, all ten article routes, no private source paths; " +
    (statSync("dist/index.html").size / 1024 / 1024).toFixed(2) +
    " MB.",
);
