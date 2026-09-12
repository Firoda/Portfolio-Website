import gis from "../../portfolio-item01.html?raw";
import plates from "../../portfolio-item02.html?raw";
import search from "../../portfolio-item03.html?raw";
import vision from "../../portfolio-item05.html?raw";
const images = import.meta.glob(
  [
    "../../img/gis*.png",
    "../../img/imgproc*.png",
    "../../img/dsa*.png",
    "../../img/ip*.png",
    "../../img/iwp01.png",
  ],
  { eager: true, query: "?inline", import: "default" },
);
function body(source) {
  const match = source.match(
    /<div class="portfolio-item-individual">([\s\S]*?)<\/div>/,
  );
  return (match?.[1] || "")
    .replace(
      /src="img\/([^"]+)"/g,
      (_, name) => `src="${images["../../img/" + name]}"`,
    )
    .replace(/<img /g, '<img loading="lazy" ');
}
export const articles = [
  {
    id: "offline-arcgis-map",
    number: "01",
    title: "Maps that work beyond the network.",
    original: "Offline Map Application",
    category: "Geospatial systems",
    theme: "map",
    color: "#24664f",
    tech: "Java / ArcGIS",
    intro:
      "What does a map need to do when connectivity disappears? A desktop application built during my DRDO internship explores the answer.",
    body: body(gis),
    image: images["../../img/gis1.png"],
    note: "This original article describes a four-week project. The profile lists the internship across May–June 2018.",
  },
  {
    id: "number-plate-recognition",
    number: "02",
    title: "Turning pixels into a number plate.",
    original: "Vehicle Number Plate Recognition",
    category: "Image processing",
    theme: "scan",
    color: "#245ca3",
    tech: "MATLAB / Segmentation",
    intro:
      "A step-by-step image-processing pipeline: localize the plate, remove noise, isolate characters and recognize the result.",
    body: body(plates),
    image: images["../../img/imgproc1.png"],
    note: "The project assumes stationary vehicles photographed at a fixed distance. No production accuracy benchmark is provided.",
  },
  {
    id: "search-algorithms",
    number: "03",
    title: "Different ways to find the same word.",
    original: "Search Algorithms Explorer",
    category: "Algorithms & tradeoffs",
    theme: "search",
    color: "#7153a3",
    tech: "C++ / Data structures",
    intro:
      "Inverted indexes, Boyer–Moore and Rabin–Karp: three approaches to searching long-form text, each with a different tradeoff.",
    body: body(search),
    image: images["../../img/dsa01.png"],
    note: "Historical implementation notes are preserved below. Boyer–Moore complexity depends on the variant and heuristics; the original article’s linear worst-case statement is not a universal guarantee.",
  },
  {
    id: "image-preprocessing",
    number: "04",
    title: "A clearer image. A better signal.",
    original: "Image Pre-processing for Object Detection",
    category: "Computer vision",
    theme: "vision",
    color: "#8a6509",
    tech: "Python / Deep learning",
    intro:
      "Exploring dehazing and dominant-color extraction as preparation for detecting armored vehicles in challenging images.",
    body: body(vision),
    image: images["../../img/ip05.png"],
    note: "The original article describes a ResNet model; the later profile specifies RetinaNet. These accounts are preserved without treating them as equivalent. The 0.722 confidence and 7.2-second runtime describe one example, not overall accuracy or a controlled benchmark.",
  },
  {
    id: "interactive-web-platform",
    number: "05",
    title: "An early exploration of the web.",
    original: "Interactive Web Platform",
    category: "Builder archive",
    theme: "web",
    color: "#a54839",
    tech: "Web / Interface design",
    intro:
      "An early web project retained from the previous portfolio. The surviving material is a screenshot, rather than a complete implementation write-up.",
    body: `<h2>The surviving artifact</h2><p>This project appeared in the earlier portfolio as Interactive Web Platform. The repository retains its screenshot, but does not contain a corresponding long-form article or measured outcomes.</p><img src="${images["../../img/iwp01.png"]}" alt="Original Interactive Web Platform screenshot"><h2>Part of the builder archive</h2><p>It remains here as a record of early interface work alongside the more fully documented GIS, search and computer-vision projects.</p>`,
    image: images["../../img/iwp01.png"],
  },
];
