import {
  AsteriskIcon,
  BuildingsIcon,
  CertificateIcon,
  CirclesThreeIcon,
  CodeIcon,
  CubeIcon,
  DiamondIcon,
  EyeIcon,
  HandshakeIcon,
  HeadsetIcon,
  HeartIcon,
  HexagonIcon,
  KanbanIcon,
  LeafIcon,
  LightbulbIcon,
  MedalIcon,
  PlanetIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  StarFourIcon,
  TargetIcon,
  TriangleIcon,
  TrophyIcon,
  UsersIcon,
  UsersThreeIcon,
} from '../components/ui/icons';

/* "Why Choose ROBONEURA?" */
export const reasons = [
  { title: 'Innovative Solutions', body: 'Cutting-edge robotics & drone technology.', icon: LightbulbIcon },
  { title: 'Custom Development', body: 'Solutions tailored to your needs.', icon: CodeIcon },
  { title: 'Expert Team', body: 'Skilled engineers & domain experts.', icon: UsersThreeIcon },
  { title: 'End-to-End Support', body: 'From deployment to maintenance.', icon: HeadsetIcon },
  { title: 'Quality & Reliability', body: 'Built for real-world performance.', icon: SealCheckIcon },
  { title: 'Sustainability Focus', body: 'For a cleaner and greener future.', icon: LeafIcon },
];

/* Headline figures. PLACEHOLDERS until verified company data is available. */
export const stats = [
  { value: 100, suffix: '+', label: 'Projects Delivered', icon: KanbanIcon },
  { value: 50, suffix: '+', label: 'Happy Clients', icon: HandshakeIcon },
  { value: 20, suffix: '+', label: 'Team Members', icon: UsersIcon },
  { value: 5, suffix: '+', label: 'Industries Served', icon: BuildingsIcon },
];

export const satisfaction = { value: 98, suffix: '%', label: 'Client Satisfaction Rate' }; // placeholder

/* Mission / Vision / Values */
export const pillars = [
  { title: 'Mission', body: 'Make advanced robotics practical for everyday industry.', icon: TargetIcon },
  { title: 'Vision', body: 'Safer, smarter work through intelligent machines.', icon: EyeIcon },
  { title: 'Values', body: 'Reliability, openness and long-term support.', icon: HeartIcon },
];

/* Awards & certifications. PLACEHOLDERS: replace with real certificates and awards. */
export const awards = [
  { title: 'Quality Certification', sub: 'Placeholder, e.g. ISO standard', icon: CertificateIcon },
  { title: 'Safety Compliance', sub: 'Placeholder', icon: ShieldCheckIcon },
  { title: 'Innovation Award', sub: 'Placeholder, year', icon: TrophyIcon },
  { title: 'Startup Recognition', sub: 'Placeholder', icon: MedalIcon },
];

/* Client logo strip. PLACEHOLDER names: swap for real client names or logo images. */
export const clients = [
  { name: 'Client One', icon: HexagonIcon },
  { name: 'Client Two', icon: CirclesThreeIcon },
  { name: 'Client Three', icon: TriangleIcon },
  { name: 'Client Four', icon: DiamondIcon },
  { name: 'Client Five', icon: AsteriskIcon },
  { name: 'Client Six', icon: PlanetIcon },
  { name: 'Client Seven', icon: CubeIcon },
  { name: 'Client Eight', icon: StarFourIcon },
];
