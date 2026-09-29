import { HandshakeIcon, LightbulbIcon, ShieldCheckIcon, UsersThreeIcon } from '../components/ui/icons';

/*
 * The company owner: the Owner page (/owner) and the "Meet the Owner" section on the Home and
 * About pages.
 * PLACEHOLDERS: replace the name, designation, bio and message with the owner's own words.
 * Photo: add a portrait to public/images/ (e.g. owner.webp, about 900 × 1100 px) and set
 * photo: img('owner.webp') (import img from '../lib/assets').
 * LinkedIn: paste the profile URL; the LinkedIn button appears once it is set.
 */
export const owner = {
  name: 'Owner Name',
  designation: 'Founder & Director',
  photo: null,
  linkedin: '',

  intro:
    'Sets the direction for ROBONEURA Dynamics across robotics, drone systems, automation and computer vision, and stays close to every project from the first site visit to the system in service.',
  bio: [
    'The idea behind the company is simple: industrial technology should be judged by how it performs on a real site. That means safer work, fewer breakdowns and data that teams can act on.',
    'The same idea shapes how every system is scoped, built and supported, and how the engineering team is hired and grown.',
  ],

  message: {
    // Short version for the Home and About pages.
    excerpt:
      'We build robots and drones that do real work outside the lab: safer inspections, fewer repetitive tasks and better data behind every decision.',
    paragraphs: [
      'ROBONEURA was started with one goal: to build robots and drones that do real work outside the lab. In manufacturing, infrastructure, agriculture and logistics, the problems we are asked to solve are practical ones: dangerous inspections, repetitive handling and decisions made without good data.',
      'Our mechanical, electronics, embedded software and AI engineers work as one team, so every system is designed around the site, the people who will operate it and the results it has to deliver. We would rather under-promise and over-deliver than show a demo that never leaves the lab.',
      'Thank you for your interest in ROBONEURA. If you have a process that could be safer, faster or smarter, I would be glad to hear about it.',
    ],
  },

  principles: [
    {
      title: 'Engineering first',
      body: 'Decisions start from the site, the data and the physics, not from a sales pitch.',
      icon: LightbulbIcon,
    },
    {
      title: 'Safety by design',
      body: 'Every robot and drone is built with fail-safes, clear operating limits and trained operators.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Partners, not vendors',
      body: 'We stay after deployment with training, support and upgrades as your operation grows.',
      icon: HandshakeIcon,
    },
    {
      title: 'A team that builds',
      body: 'Engineers who learn fast, share what they know and take pride in systems that run in the field.',
      icon: UsersThreeIcon,
    },
  ],
};
