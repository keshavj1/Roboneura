import { img } from '../lib/assets';
import { DroneIcon, EyeIcon, GearSixIcon, RobotIcon } from '../components/ui/icons';

/*
 * The four solution areas. The same records feed the home cards, the Learn More
 * modal, the Solutions page rows and the contact form's "I'm interested in" options.
 * `featured` items appear as image cards on the home page (the design shows three).
 * `hue` is the solution's logo colour (icons, case-study tags): blue | yellow | magenta | cyan | purple.
 */
export const solutions = [
  {
    id: 'robotics',
    title: 'Robotics',
    kicker: 'Robotics',
    icon: RobotIcon,
    hue: 'blue',
    image: img('sol-robotics.webp'),
    imagePosition: 'center 22%',
    imageAlt: 'Humanoid robot with its mechanical frame, wiring and actuators exposed',
    summary: 'Autonomous & semi-autonomous robots for industrial and commercial use.',
    body: 'Autonomous & semi-autonomous robots for industrial and commercial use. We design mobile platforms, manipulators and inspection robots around your site, payload and safety requirements.',
    features: [
      'Autonomous mobile robots (AMR)',
      'Robotic arms and pick-and-place',
      'Inspection and surveillance robots',
      'ROS-based software stack',
    ],
    useCases: ['Material transport on factory floors', 'Pick-and-place and palletising cells', 'Autonomous inspection rounds in plants'],
    industries: ['manufacturing', 'logistics', 'energy', 'research'],
    interest: 'Robotics',
    featured: true,
  },
  {
    id: 'drones',
    title: 'Drone Solutions',
    kicker: 'Drone Solutions',
    icon: DroneIcon,
    hue: 'cyan',
    image: img('sol-drone.webp'),
    imagePosition: 'center',
    imageAlt: 'Drone flying low over a field of ripe wheat',
    summary: 'Custom drone systems for surveying, inspection, agriculture and logistics.',
    body: 'Custom drone systems for surveying, inspection, agriculture and logistics, with flight software, payload integration and ground control built in-house.',
    features: [
      'Survey and mapping UAVs',
      'Infrastructure inspection',
      'Agricultural spraying and monitoring',
      'Payload and delivery drones',
    ],
    useCases: ['Bridge, tower and pipeline inspection', 'Crop health mapping and precision spraying', 'Site surveys and progress tracking'],
    industries: ['infrastructure', 'agriculture', 'construction', 'defense'],
    interest: 'Drone Solutions',
    featured: true,
  },
  {
    id: 'automation',
    title: 'Automation Systems',
    kicker: 'Automation Systems',
    icon: GearSixIcon,
    hue: 'magenta',
    image: img('sol-automation.webp'),
    imagePosition: 'center',
    imageAlt: 'Orange industrial robot arms working on an automated production line',
    summary: 'End-to-end automation for increased efficiency and precision.',
    body: 'End-to-end automation for increased efficiency and precision, connecting machines, sensors and vision into one controllable system.',
    features: [
      'Production line automation',
      'Vision-based quality control',
      'PLC and SCADA integration',
      'Data dashboards and monitoring',
    ],
    useCases: ['Assembly and packaging lines', 'Automated sorting and tracking', 'Plant-wide monitoring dashboards'],
    industries: ['manufacturing', 'logistics', 'energy'],
    interest: 'Automation',
    featured: true,
  },
  {
    id: 'vision',
    title: 'Computer Vision',
    kicker: 'Computer Vision',
    icon: EyeIcon,
    hue: 'purple',
    image: img('sol-vision.webp'),
    imagePosition: 'center',
    imageAlt: 'Industrial cameras mounted on the corner of a building',
    summary: 'Detection, tracking and measurement running at the edge.',
    body: 'Vision systems that detect, track and measure in real time. Models run on edge hardware beside the line, on the robot or on the drone, so decisions happen where the data is captured.',
    features: [
      'Defect and anomaly detection',
      'Object tracking and counting',
      'Dimensional measurement',
      'Edge deployment on embedded GPUs',
    ],
    useCases: ['Automated visual quality inspection', 'Crack and corrosion detection', 'Perimeter and intrusion monitoring'],
    industries: ['manufacturing', 'infrastructure', 'defense', 'construction'],
    interest: 'Computer Vision',
    featured: false,
  },
];

export const solutionById = Object.fromEntries(solutions.map((s) => [s.id, s]));

/** Options for the contact form, in display order. */
export const contactInterests = [...solutions.map((s) => s.interest), 'Careers'];
