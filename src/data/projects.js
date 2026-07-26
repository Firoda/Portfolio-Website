import dsa01 from '../../img/dsa01.png';
import dsa02 from '../../img/dsa02.png';
import dsa06 from '../../img/dsa06.png';
import gis1 from '../../img/gis1.png';
import gis2 from '../../img/gis2.png';
import imgproc1 from '../../img/imgproc1.png';
import imgproc2 from '../../img/imgproc2.png';
import imgproc4 from '../../img/imgproc4.png';
import ip01 from '../../img/ip01.png';
import ip03 from '../../img/ip03.png';
import ip05 from '../../img/ip05.png';
import iwp01 from '../../img/iwp01.png';

export const resumeUrl =
  'https://drive.google.com/file/d/14LjwnlwKAFvRZuHf0yVsN-FTVWgz0-aL/view?usp=sharing';

export const profile = {
  name: 'Aditya Firoda',
  headline: 'Builder PM in progress.',
  subtitle:
    'MBA student targeting product and strategy roles, with a developer background and a bias for turning ambiguous problems into shipped systems.',
  email: 'adityafiroda@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aditya-firoda/',
  github: 'https://github.com/Firoda',
};

export const highlights = [
  {
    label: 'Technical foundation',
    title: 'Started as a builder',
    copy:
      'Built software projects across GIS, image processing, information retrieval, and web systems before moving toward product and business decisions.',
    metric: 'CS',
  },
  {
    label: 'MBA pivot',
    title: 'Now framing markets and users',
    copy:
      'The next chapter is product and strategy: sizing problems, designing tradeoffs, and explaining why a product should exist.',
    metric: 'MBA',
  },
  {
    label: 'Recruiter signal',
    title: 'A bridge profile',
    copy:
      'Technical fluency plus business context makes the portfolio intentionally useful for PM, product strategy, and transformation teams.',
    metric: 'PM',
  },
];

export const projects = [
  {
    slug: 'offline-arcgis-map',
    title: 'Offline Map Application',
    category: 'Technical product',
    role: 'Developer, GIS intern',
    timeline: 'DRDO internship',
    featured: true,
    image: gis1,
    comparison: [gis1, gis2],
    skills: ['Java', 'ArcGIS Runtime SDK', 'Offline workflows', 'Geospatial UX'],
    summary:
      'A Java application that made selected ArcGIS capabilities usable offline for large tile packages, shapefiles, and coordinate inspection.',
    challenge:
      'Massive geospatial images cannot be loaded naively. The product problem was to make field-style map exploration responsive without relying on paid online platform workflows.',
    approach:
      'Used tiled map packages, shapefile feature layers, coordinate readouts, and a focused desktop interface to expose only the interactions the user needed.',
    outcome:
      'The project became a practical example of translating platform capability into a constrained, user-specific workflow.',
    takeaway:
      'I can understand a technical platform deeply enough to choose the minimum useful product surface.',
    video: '',
    blog: '',
  },
  {
    slug: 'number-plate-recognition',
    title: 'Vehicle Number Plate Recognition',
    category: 'Applied AI workflow',
    role: 'Developer',
    timeline: 'Academic project',
    featured: true,
    image: imgproc1,
    comparison: [imgproc2, imgproc4],
    skills: ['MATLAB', 'Image processing', 'Segmentation', 'Pattern recognition'],
    summary:
      'An image-processing pipeline that localized a vehicle plate, segmented characters, and recognized the final alphanumeric output.',
    challenge:
      'The system had to extract useful structure from noisy visual input while assuming fixed-distance stationary vehicle images.',
    approach:
      'Converted images to grayscale, used dilation and histogram filtering to isolate the region of interest, then segmented and matched characters.',
    outcome:
      'The work showed how a sequence of narrow decisions can turn fuzzy input into a product-ready output.',
    takeaway:
      'I am comfortable breaking complex technical workflows into explainable product steps.',
    video: '',
    blog: '',
  },
  {
    slug: 'search-algorithms',
    title: 'Search Algorithms Explorer',
    category: 'Systems thinking',
    role: 'Developer',
    timeline: 'Academic project',
    featured: true,
    image: dsa01,
    comparison: [dsa02, dsa06],
    skills: ['C++', 'Data structures', 'Search', 'Performance tradeoffs'],
    summary:
      'A comparison of inverted indexes, Boyer-Moore, and Rabin-Karp search using long-form text as the test surface.',
    challenge:
      'Search is not one problem. It changes depending on input size, update frequency, exact-match needs, and acceptable preprocessing cost.',
    approach:
      'Implemented multiple search strategies and documented their runtime behavior, tradeoffs, and fit for browser or database-like use cases.',
    outcome:
      'The project became a foundation for explaining performance tradeoffs clearly to non-specialists.',
    takeaway:
      'I can translate engineering tradeoffs into decision language.',
    video: '',
    blog: '',
  },
  {
    slug: 'interactive-web-platform',
    title: 'Interactive Web Platform',
    category: 'Web product',
    role: 'Developer',
    timeline: 'Academic project',
    featured: false,
    image: iwp01,
    skills: ['Web development', 'Interface design', 'Frontend architecture'],
    summary:
      'A legacy web project from the original portfolio, retained as part of the builder archive.',
    challenge: 'The new portfolio should preserve earlier technical breadth without letting it dominate the current PM narrative.',
    approach: 'Present the work as an archive item with concise context and room for future case-study expansion.',
    outcome: 'Keeps historical continuity while making the 2026 positioning sharper.',
    takeaway: 'Builder history, now reframed for product roles.',
    video: '',
    blog: '',
  },
  {
    slug: 'python-information-processing',
    title: 'Information Processing Toolkit',
    category: 'Technical archive',
    role: 'Developer',
    timeline: 'Academic project',
    featured: false,
    image: ip03,
    comparison: [ip01, ip05],
    skills: ['Python', 'Data handling', 'Automation'],
    summary:
      'A technical archive project showing experimentation with data handling and implementation detail.',
    challenge: 'Older projects need a cleaner bridge into the current product and strategy story.',
    approach: 'Condense the narrative into role, method, and transferable decision-making signal.',
    outcome: 'Makes the archive scannable for recruiters without hiding the technical base.',
    takeaway: 'Technical curiosity remains part of the operating model.',
    video: '',
    blog: '',
  },
];
