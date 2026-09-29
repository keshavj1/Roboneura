import { img } from '../lib/assets';

/*
 * Blog posts ("Latest from the Lab" on the Home page, /blog and /blog/:slug).
 * Newest first. To add a post, copy one entry to the top and change it:
 *   slug      part of the address: /blog/<slug> (lower case, hyphens)
 *   date      YYYY-MM-DD
 *   category  one of Robotics | Drones | Automation | Vision (colours and the blog filter use it)
 *   body      paragraphs as strings; { h2: 'Heading' } for a sub-heading; { list: ['…', '…'] } for bullets
 * Reading time is worked out from the text.
 * These are general engineering articles written for launch: review them before publishing.
 */
const AUTHOR = 'ROBONEURA Engineering Team';

const posts = [
  {
    slug: 'drone-inspection-infrastructure-maintenance',
    title: 'How drone inspection is changing infrastructure maintenance',
    category: 'Drones',
    date: '2026-09-18',
    image: img('ind-defense.webp'),
    excerpt:
      'Bridges, towers and pipelines need regular close-up checks. Drones make those inspections faster and safer, and give engineers data they can compare year after year.',
    body: [
      "Inspecting a bridge deck, a transmission tower or a long pipeline has traditionally meant rope access, scaffolding, lane closures or a helicopter. Each of those is slow, costly and puts people in exposed positions. Drones do not replace the engineer's judgement, but they change how the data reaches the engineer.",
      { h2: 'What a drone inspection actually captures' },
      'A typical inspection drone carries a high-resolution camera on a stabilised gimbal, often paired with a thermal camera or a LiDAR sensor. Flying a planned route, it captures overlapping images of every surface, from angles that are hard or impossible to reach on foot.',
      {
        list: [
          'High-resolution photos for cracks, spalling, corrosion and loose fittings',
          'Thermal images that reveal hot spots on electrical equipment and moisture in structures',
          '3D models and point clouds for measuring deformation and comparing surveys over time',
        ],
      },
      { h2: 'Why repeatable flights matter' },
      "The real value comes from flying the same route again. When each inspection captures the same views, engineers can place this year's images next to last year's and see exactly what has changed. Automated flight plans make that repeatability practical, and computer vision can flag likely defects so people spend their time on the images that matter.",
      { h2: 'Safety and permissions come first' },
      'Inspection flights near structures, roads and power lines need careful planning: airspace permissions, a site risk assessment, trained pilots and clear procedures if something goes wrong. A good inspection programme treats these as part of the design, not as paperwork at the end.',
      'If you manage infrastructure and want to understand what a drone inspection programme could look like for your assets, our team is happy to talk it through.',
    ],
  },
  {
    slug: 'mobile-robots-vs-fixed-automation',
    title: 'Choosing between mobile robots and fixed automation',
    category: 'Robotics',
    date: '2026-08-27',
    image: img('sol-robotics.webp'),
    imagePosition: 'center 22%',
    excerpt:
      'Autonomous mobile robots and fixed conveyors both move material. Which one fits depends on your layout, your volumes and how often your process changes.',
    body: [
      'When a plant wants to stop moving material by hand, two options usually come up: fixed automation such as conveyors and transfer lines, or autonomous mobile robots (AMRs) that drive between stations. Both work. The right choice depends less on the technology and more on how your operation runs.',
      { h2: 'When fixed automation wins' },
      'Conveyors and fixed transfer systems are hard to beat for high, steady volumes along a route that rarely changes. They are simple to operate, very predictable, and have no batteries to charge.',
      { h2: 'When mobile robots win' },
      'AMRs shine where routes change, volumes vary, or floor space is shared with people and forklifts. They navigate with onboard sensors, can be re-routed in software, and can be added one at a time as demand grows.',
      {
        list: [
          'Layouts that change with products or seasons',
          'Many pick-up and drop-off points spread across a site',
          'A need to start small and scale gradually',
          'Aisles shared with people, where a fixed line would block movement',
        ],
      },
      { h2: 'Questions to ask before you decide' },
      "Map the flows first: how many loads move per hour, between which points, and how that changes across a week. Look at floor conditions, doorways, lifts and Wi-Fi coverage. And think about the next five years, not only today's layout.",
      'Often the answer is a mix: fixed automation for the steady core of the process and mobile robots for everything around it.',
    ],
  },
  {
    slug: 'computer-vision-on-the-edge',
    title: 'Computer vision on the edge: lessons from the factory floor',
    category: 'Vision',
    date: '2026-07-30',
    image: img('ind-research.webp'),
    excerpt:
      'Running vision models next to the camera, instead of in the cloud, cuts delay and bandwidth. Here is what changes when inspection moves to the edge.',
    body: [
      'Computer vision can inspect parts, count products and spot safety risks, but only if its answers arrive in time. On a production line moving several parts per second, sending every image to a distant server and waiting for a reply is often too slow. That is why more vision systems now run at the edge, on a compact computer beside the camera.',
      { h2: 'What edge processing changes' },
      {
        list: [
          'Decisions in milliseconds, fast enough to reject a part or stop a machine',
          'Far less network traffic: only results and selected images leave the site',
          'The system keeps working if the internet connection drops',
          'Sensitive images can stay on the premises',
        ],
      },
      { h2: 'Lessons from the factory floor' },
      'Lighting matters as much as the model. A camera that sees the same scene under stable, controlled light makes almost any model more accurate than a clever model struggling with glare and shadows.',
      'Training data should come from the real line, including the awkward cases: dust, reflections, parts in unusual positions. And a model is never finished. Collecting the images it was unsure about and retraining with them is what keeps accuracy high as products and conditions change.',
      { h2: 'Edge and cloud work together' },
      'Edge devices make the fast decisions; the cloud is where models are trained, results are compared across lines and sites, and updates are rolled out. Designing both halves together is what makes a vision system maintainable.',
    ],
  },
  {
    slug: 'precision-agriculture-with-drones',
    title: 'Precision agriculture with drones: from crop maps to targeted spraying',
    category: 'Drones',
    date: '2026-07-10',
    image: img('ind-agriculture.webp'),
    excerpt:
      'From crop-health maps to targeted spraying, drones help farmers see problems earlier and use water, fertiliser and chemicals only where they are needed.',
    body: [
      'On a large farm, problems such as pests, disease or uneven irrigation often start in small patches that are hard to see from the ground. By the time they are visible, yield has already been lost. Drones give farmers a view from above, regularly and at low cost.',
      { h2: 'Seeing crop health from the air' },
      'Multispectral cameras measure how plants reflect light beyond what the eye can see. Healthy and stressed plants reflect differently, so a single flight can produce a map showing which parts of a field need attention, often before symptoms are visible.',
      { h2: 'Treating only what needs treatment' },
      'Those maps can guide spraying drones or ground equipment to apply fertiliser or crop protection only where it is needed. The goal is simple: less input used, less run-off, and the same or better crop.',
      {
        list: [
          'Early detection of pest and disease hot spots',
          'Variable-rate application of fertiliser and crop protection',
          'Checking irrigation coverage and drainage problems',
          'Counting plants and estimating yield',
        ],
      },
      { h2: 'Getting started' },
      'Most farms start with mapping flights at key growth stages, then add targeted spraying once the maps have proved useful. Regulations for agricultural spraying drones are specific, so pilots, equipment and procedures need to be approved before operations begin.',
    ],
  },
  {
    slug: 'planning-your-first-automation-project',
    title: 'Planning your first automation project: a practical checklist',
    category: 'Automation',
    date: '2026-06-19',
    image: img('sol-automation.webp'),
    excerpt:
      'Automation projects succeed or fail on preparation. A practical checklist for choosing the right process, measuring the baseline and planning for the people who will run it.',
    body: [
      'The most common reason automation projects disappoint is not the technology. It is choosing the wrong process to automate, or not knowing clearly what success looks like. A little preparation at the start saves a lot of rework later.',
      { h2: 'Choose the right first process' },
      'A good first candidate is repetitive, stable and well understood: the same task, done the same way, many times a day. Processes that change every week, or that depend on judgement nobody has written down, are better tackled later.',
      { h2: 'A practical checklist' },
      {
        list: [
          'Measure the baseline: cycle time, errors, downtime and labour today',
          'Define success in numbers before choosing any equipment',
          'Collect real samples of parts, including the difficult ones',
          'Check the space, power, network and safety requirements on site',
          'Plan who will operate, maintain and improve the system',
          'Start with a pilot that can be tested before full roll-out',
        ],
      },
      { h2: 'Plan for the people' },
      'Operators and maintenance teams know the process better than anyone. Involving them early surfaces problems that never appear in a drawing, and makes it far more likely the system will be used and looked after once it is running.',
      'A clear baseline, a measurable goal and a small pilot turn automation from a leap of faith into a series of confident steps.',
    ],
  },
  {
    slug: 'robots-for-solar-plants',
    title: 'Keeping solar plants productive with cleaning and inspection robots',
    category: 'Robotics',
    date: '2026-05-28',
    image: img('ind-energy.webp'),
    excerpt:
      'Dust and faults quietly reduce what a solar plant produces. Cleaning and inspection robots help keep large plants performing without sending people across hot, exposed rows.',
    body: [
      'A utility-scale solar plant can cover hundreds of acres, with rows of panels stretching further than the eye can see. Two things quietly reduce its output: dust and dirt on the panels, and faults that go unnoticed until someone checks. In dry, dusty regions, soiling alone can cost a noticeable share of production.',
      { h2: 'Robotic cleaning' },
      'Cleaning robots travel along the panel rows and brush the surface, many of them without water. They can run at night or early in the morning, on a schedule tuned to local dust conditions, instead of waiting for a manual crew.',
      { h2: 'Inspection from the ground and the air' },
      'Faulty cells and connections run hotter than healthy ones. Thermal cameras on drones or ground robots can survey a plant quickly and map these hot spots, so technicians go straight to the panels that need repair.',
      {
        list: [
          'Scheduled dry cleaning matched to dust levels',
          'Thermal surveys to find hot spots and failed strings',
          'Fewer people working in hot, exposed conditions',
          'Records of every clean and inspection for maintenance planning',
        ],
      },
      { h2: 'Designing for the site' },
      "Row lengths, panel tilt, gaps between tables and local weather all shape which robot fits a plant. The best results come when cleaning, inspection and the plant's own monitoring data are planned as one system.",
    ],
  },
];

const words = (post) =>
  post.body
    .map((block) => (typeof block === 'string' ? block : block.h2 || block.list.join(' ')))
    .join(' ')
    .split(/\s+/).length;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2026-09-18" → "18 Sep 2026" */
const formatDate = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

/** All posts, newest first, with reading time and display date added. */
export const blogPosts = posts
  .map((post) => ({
    ...post,
    author: post.author || AUTHOR,
    readTime: `${Math.max(2, Math.round(words(post) / 200))} min read`,
    dateLabel: formatDate(post.date),
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const postBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));

/** Filter options for the blog page: All, then each category in use. */
export const blogCategories = ['All', ...new Set(blogPosts.map((post) => post.category))];

/** Other posts to read next: same category first, then the newest. */
export function relatedPosts(post, count = 3) {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(
    0,
    count,
  );
}
