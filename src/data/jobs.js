import { CpuIcon, GraduationCapIcon, RocketLaunchIcon, TargetIcon } from '../components/ui/icons';

/* Open roles. EXAMPLES from the design: replace with current openings. */
export const jobDepartments = ['All', 'Robotics', 'Drones', 'AI & Vision'];

export const jobs = [
  { id: 'robotics-engineer-ros', title: 'Robotics Engineer (ROS)', dept: 'Robotics', location: 'Lucknow', type: 'Full-time' },
  { id: 'drone-flight-software', title: 'Drone Flight Software Engineer', dept: 'Drones', location: 'Lucknow', type: 'Full-time' },
  { id: 'computer-vision-engineer', title: 'Computer Vision Engineer', dept: 'AI & Vision', location: 'Lucknow / Hybrid', type: 'Full-time' },
  { id: 'embedded-systems-engineer', title: 'Embedded Systems Engineer', dept: 'Robotics', location: 'Lucknow', type: 'Full-time' },
  { id: 'uav-pilot-field-technician', title: 'UAV Pilot & Field Technician', dept: 'Drones', location: 'On-site', type: 'Contract' },
];

/* Careers page: why join. Draft copy: confirm with HR. */
export const perks = [
  {
    title: 'Work that leaves the lab',
    body: 'Your code, circuits and designs run on real machines at customer sites, not only in simulation.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Hardware on your desk',
    body: 'Robots, drones, sensors and edge computers to build and test with from your first week.',
    icon: CpuIcon,
  },
  {
    title: 'Learn across disciplines',
    body: 'Mechanical, electronics, embedded and AI engineers work as one team and learn from each other.',
    icon: GraduationCapIcon,
  },
  {
    title: 'Ownership from day one',
    body: 'Small, senior-led teams where you own features end to end, from site visit to deployment.',
    icon: TargetIcon,
  },
];
