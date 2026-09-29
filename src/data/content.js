import { img } from '../lib/assets';

/* Client testimonials. Only the first is from the design; the others are PLACEHOLDERS. */
export const testimonials = [
  {
    quote:
      'Roboneura’s drone solutions have significantly improved our site inspection process. The system is reliable, efficient and easy to operate.',
    name: 'Rohan Mehta',
    role: 'Project Manager, InfraTech Solutions',
    initials: 'RM',
  },
  {
    quote: 'Placeholder testimonial. Replace with a verified client quote about a robotics or automation project.',
    name: 'Client Name',
    role: 'Role, Company',
    initials: 'CN',
  },
  {
    quote: 'Placeholder testimonial. A third verified quote, ideally from a different industry.',
    name: 'Client Name',
    role: 'Role, Company',
    initials: 'CN',
  },
];

/* "Latest from the Lab". Sample articles: set `href` once each post is published. */
export const posts = [
  {
    category: 'Drones',
    date: 'Sep 2026',
    readTime: '5 min read',
    title: 'How drone inspection is changing infrastructure maintenance',
    image: img('ind-defense.webp'),
    href: '#',
  },
  {
    category: 'Robotics',
    date: 'Aug 2026',
    readTime: '4 min read',
    title: 'Choosing between mobile robots and fixed automation',
    image: img('sol-robotics.webp'),
    imagePosition: 'center 22%',
    href: '#',
  },
  {
    category: 'Vision',
    date: 'Jul 2026',
    readTime: '6 min read',
    title: 'Computer vision on the edge: lessons from the factory floor',
    image: img('ind-research.webp'),
    href: '#',
  },
];

export const faqs = [
  {
    q: 'What types of robots and drones do you build?',
    a: 'We build mobile robots, robotic arms, autonomous and semi-autonomous drones, and the automation systems that connect them, designed around your site, payload and workflow.',
  },
  {
    q: 'Can you customise a solution for our industry?',
    a: 'Yes. Every project starts with a discovery phase where we study your process and constraints, then design hardware and software specifically for them.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A proof-of-concept usually takes a few weeks; full deployment depends on scope. We share a timeline after the discovery phase.',
  },
  {
    q: 'Do you provide training and maintenance?',
    a: 'We provide operator training, documentation, remote monitoring and on-site maintenance plans after deployment.',
  },
  {
    q: 'Are your drones compliant with regulations?',
    a: 'We design and operate drone systems in line with applicable aviation regulations and help clients with the required permissions.',
  },
];

/*
 * Leadership team. PLACEHOLDERS: add names, photos (public/images/team-*.webp) and LinkedIn URLs.
 * The owner has their own section and page (src/data/owner.js).
 */
export const team = [
  { name: 'Team Member', role: 'Head of Engineering', photo: null, linkedin: '#' },
  { name: 'Team Member', role: 'CTO, Robotics', photo: null, linkedin: '#' },
  { name: 'Team Member', role: 'Head of Drone Systems', photo: null, linkedin: '#' },
  { name: 'Team Member', role: 'Lead, Computer Vision', photo: null, linkedin: '#' },
];
