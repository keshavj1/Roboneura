import { DroneIcon, EyeIcon, GearSixIcon, RobotIcon } from '../components/ui/icons';

/*
 * Core capabilities: the white strip under the home hero (`strip` text) and the
 * "Capabilities Inside Every System" cards (`body` text). `hue` matches the solution's logo colour.
 */
export const capabilities = [
  {
    id: 'robotics',
    name: 'Robotics',
    icon: RobotIcon,
    hue: 'blue',
    strip: 'Intelligent machines for real-world challenges',
    body: 'Motion control, navigation and manipulation for machines that work beside people.',
    solutionId: 'robotics',
  },
  {
    id: 'drones',
    name: 'Drone Systems',
    icon: DroneIcon,
    hue: 'cyan',
    strip: 'Aerial solutions for smarter operations',
    body: 'Flight controllers, autonomy and payloads for aerial operations.',
    solutionId: 'drones',
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: GearSixIcon,
    hue: 'magenta',
    strip: 'Boosting productivity with intelligent systems',
    body: 'Control systems that raise throughput and repeatability.',
    solutionId: 'automation',
  },
  {
    id: 'vision',
    name: 'Computer Vision',
    icon: EyeIcon,
    hue: 'purple',
    strip: 'Seeing beyond possibilities',
    body: 'Detection, tracking and measurement running at the edge.',
    solutionId: 'vision',
  },
];
