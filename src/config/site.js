import { InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon, YoutubeLogoIcon } from '../components/ui/icons';

/*
 * Company-wide settings. Edit this file to change contact details, social links,
 * the company video, or to hide the "placeholder" notes once real data is in.
 */
export const site = {
  name: 'ROBONEURA',
  shortName: 'ROBONEURA Dynamics',
  legalName: 'ROBONEURA DYNAMICS PRIVATE LIMITED',
  tagline: 'Engineering intelligent machines for a safer, smarter world.',
  pillars: 'Robotics | Drones | Automation',
  url: (import.meta.env.VITE_SITE_URL || 'https://roboneura.com').replace(/\/$/, ''),

  phone: { display: '+91 522 123 4567', href: 'tel:+915221234567' }, // placeholder number
  email: { info: 'info@roboneura.com', careers: 'careers@roboneura.com' },
  // Office address. Also update the JSON-LD block in index.html if it changes.
  address: {
    lines: ['B2-0205, 2nd Floor, DLF MyPad', 'Vibhuti Khand, Gomti Nagar', 'Lucknow, Uttar Pradesh – 226010'],
    short: 'DLF MyPad, Vibhuti Khand, Gomti Nagar, Lucknow', // header info bar
    full: 'B2-0205, 2nd Floor, DLF MyPad, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh – 226010',
  },
  hours: { short: 'Mon – Sat, 9:30 – 6:30', long: 'Mon – Sat, 9:30 AM – 6:30 PM IST' },
  map: {
    embedUrl:
      'https://www.google.com/maps?q=DLF%20MyPad%2C%20Vibhuti%20Khand%2C%20Gomti%20Nagar%2C%20Lucknow%20226010&output=embed',
    linkUrl:
      'https://www.google.com/maps/search/?api=1&query=DLF%20MyPad%2C%20Vibhuti%20Khand%2C%20Gomti%20Nagar%2C%20Lucknow%20226010',
  },

  // Replace "#" with the real profile URLs.
  social: [
    { label: 'LinkedIn', href: '#', icon: LinkedinLogoIcon },
    { label: 'X', href: '#', icon: XLogoIcon },
    { label: 'YouTube', href: '#', icon: YoutubeLogoIcon },
    { label: 'Instagram', href: '#', icon: InstagramLogoIcon },
  ],

  // Company video: a YouTube embed URL (https://www.youtube-nocookie.com/embed/VIDEO_ID)
  // or a path to an .mp4 file in public/. Leave empty to show the "coming soon" poster.
  videoUrl: '',

  forms: {
    contactEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
    newsletterEndpoint: import.meta.env.VITE_NEWSLETTER_ENDPOINT || '',
  },

  flags: {
    // Shows the small "* Placeholder…" notes next to figures that still need verified data.
    // Hidden on request; the figures, roles, articles and legal text are still examples (see README).
    showPlaceholderNotes: false,
    // The logo loading screen on first visit.
    showPreloader: true,
    // Address / email / office-hours bar above the menu on wide screens (hidden on request).
    showHeaderInfoBar: false,
  },
};

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Owner', to: '/owner' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'Technology', to: '/technology' },
  { label: 'Blog', to: '/blog' },
  { label: 'Career', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

export const legalNav = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
];
