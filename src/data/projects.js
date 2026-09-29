import { img } from '../lib/assets';

/*
 * Case studies. Results are PLACEHOLDERS: replace with measured outcomes.
 * category must be one of projectCategories.
 */
export const projectCategories = ['All', 'Robotics', 'Drones', 'Automation'];

export const projects = [
  {
    category: 'Drones',
    title: 'Aerial inspection of a highway bridge network',
    result: 'Inspection time reduced',
    image: img('ind-infrastructure.webp'),
  },
  {
    category: 'Robotics',
    title: 'Autonomous material handling for a factory floor',
    result: 'Throughput improved',
    image: img('ind-manufacturing.webp'),
  },
  {
    category: 'Automation',
    title: 'Vision-guided quality control line',
    result: 'Defect detection automated',
    image: img('sol-automation.webp'),
  },
  {
    category: 'Drones',
    title: 'Precision crop monitoring across farmland',
    result: 'Field coverage per day',
    image: img('ind-agriculture.webp'),
  },
  {
    category: 'Robotics',
    title: 'Solar plant cleaning and inspection robot',
    result: 'Maintenance cycles',
    image: img('ind-energy.webp'),
  },
  {
    category: 'Automation',
    title: 'Warehouse sorting and tracking system',
    result: 'Order accuracy',
    image: img('ind-logistics.webp'),
  },
];
