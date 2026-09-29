import { CircuitryIcon, CloudIcon, DroneIcon, EyeIcon, GearSixIcon, RobotIcon } from '../components/ui/icons';

/*
 * Technology stack, grouped by discipline. `layers` ties each group to the
 * architecture layers (L1-L4). Representative list: confirm with engineering.
 */
export const techStack = [
  {
    title: 'Robotics & Autonomy',
    icon: RobotIcon,
    layers: ['L1', 'L2'],
    purpose: 'Navigation, manipulation and simulation for ground robots.',
    items: ['ROS 2', 'Nav2', 'MoveIt 2', 'Gazebo', 'SLAM'],
  },
  {
    title: 'Flight & Drones',
    icon: DroneIcon,
    layers: ['L1', 'L2'],
    purpose: 'Flight control, mission planning and precise positioning.',
    items: ['PX4', 'ArduPilot', 'MAVLink', 'QGroundControl', 'RTK GNSS'],
  },
  {
    title: 'Vision & AI',
    icon: EyeIcon,
    layers: ['L2', 'L3'],
    purpose: 'Training and deploying perception models at the edge.',
    items: ['OpenCV', 'PyTorch', 'YOLO-class detectors', 'ONNX Runtime', 'TensorRT'],
  },
  {
    title: 'Embedded & Edge',
    icon: CircuitryIcon,
    layers: ['L1', 'L2'],
    purpose: 'Real-time firmware and on-board computing.',
    items: ['NVIDIA Jetson', 'STM32 / ESP32', 'C / C++ / Python', 'FreeRTOS', 'Docker'],
  },
  {
    title: 'Industrial Automation',
    icon: GearSixIcon,
    layers: ['L1', 'L2'],
    purpose: 'Connecting machines and controllers on the shop floor.',
    items: ['PLCs (IEC 61131-3)', 'Modbus', 'OPC UA', 'SCADA / HMI'],
  },
  {
    title: 'Cloud, Data & Apps',
    icon: CloudIcon,
    layers: ['L3', 'L4'],
    purpose: 'Fleet data, dashboards and mobile apps.',
    items: ['MQTT', 'PostgreSQL / TimescaleDB', 'Grafana', 'React', 'React Native'],
  },
];
