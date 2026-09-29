import {
  ChatsCircleIcon,
  CubeIcon,
  HandshakeIcon,
  MagnifyingGlassIcon,
  PaperPlaneTiltIcon,
  PencilRulerIcon,
  RocketLaunchIcon,
  WrenchIcon,
} from '../components/ui/icons';

/* Discover -> Design -> Prototype -> Deploy */
export const processSteps = [
  { title: 'Discover', body: 'Understand your needs and challenges', icon: MagnifyingGlassIcon },
  { title: 'Design', body: 'Create the right solution with advanced technology', icon: PencilRulerIcon },
  { title: 'Prototype', body: 'Build and test for performance', icon: CubeIcon },
  { title: 'Deploy', body: 'Deliver and support for long-term success', icon: RocketLaunchIcon },
];

/* Careers page: how hiring works */
export const hiringSteps = [
  { title: 'Apply', body: 'Send your CV and a short note about something you have built.', icon: PaperPlaneTiltIcon },
  { title: 'Intro call', body: 'A 30-minute conversation about your experience and interests.', icon: ChatsCircleIcon },
  { title: 'Technical round', body: 'A practical task or lab visit, close to the real work.', icon: WrenchIcon },
  { title: 'Offer', body: 'A quick decision, with clear feedback at every step.', icon: HandshakeIcon },
];
