import {
  ArrowsClockwiseIcon,
  CameraIcon,
  ChartLineUpIcon,
  CloudArrowUpIcon,
  CloudIcon,
  CpuIcon,
  DatabaseIcon,
  DeviceMobileIcon,
  DevicesIcon,
  DroneIcon,
  FileTextIcon,
  GearSixIcon,
  HardDrivesIcon,
  MonitorIcon,
  PathIcon,
  PlugsConnectedIcon,
  RobotIcon,
  ScanIcon,
} from '../components/ui/icons';

/*
 * System architecture shown on the Technology page:
 * Robots / Drones / Sensors -> Edge -> Cloud -> Web Dashboard / Mobile App.
 * Draft technical copy: review with the engineering team.
 */
export const layers = [
  {
    id: 'physical',
    code: 'L1',
    name: 'Physical Layer',
    tagline: 'Robots · Drones · Sensors',
    icon: RobotIcon,
    nodes: [
      { label: 'Mobile robots & robotic arms', icon: RobotIcon },
      { label: 'UAV platforms & payloads', icon: DroneIcon },
      { label: 'Cameras, LiDAR, IMU & GNSS', icon: CameraIcon },
      { label: 'Actuators, PLCs & field I/O', icon: GearSixIcon },
    ],
    summary:
      'The machines and sensors that do the physical work on site: moving, lifting, flying and measuring.',
    responsibilities: [
      'Motion, manipulation and flight',
      'Sensing the environment in real time',
      'Hardware safety: e-stops, geofences and interlocks',
    ],
    up: 'Raw sensor data, video and machine state',
    down: 'Motor commands and actuator set-points',
  },
  {
    id: 'edge',
    code: 'L2',
    name: 'Edge Layer',
    tagline: 'On-board intelligence',
    icon: CpuIcon,
    nodes: [
      { label: 'Embedded computers (Jetson, MCUs)', icon: CpuIcon },
      { label: 'Real-time control & autonomy', icon: PathIcon },
      { label: 'Computer-vision inference', icon: ScanIcon },
      { label: 'Local buffering & fail-safes', icon: HardDrivesIcon },
    ],
    summary:
      'Computing on or right next to the machine, so decisions happen in milliseconds and keep working when the network drops.',
    responsibilities: [
      'Navigation, control loops and mission execution',
      'Vision models running on the device',
      'Filtering and compressing data before upload',
    ],
    up: 'Telemetry, detections and events',
    down: 'Missions, parameters and model updates',
  },
  {
    id: 'cloud',
    code: 'L3',
    name: 'Cloud Layer',
    tagline: 'Fleet data & analytics',
    icon: CloudIcon,
    nodes: [
      { label: 'Secure telemetry ingest', icon: CloudArrowUpIcon },
      { label: 'Time-series & media storage', icon: DatabaseIcon },
      { label: 'Fleet management & OTA updates', icon: ArrowsClockwiseIcon },
      { label: 'Analytics & model training', icon: ChartLineUpIcon },
    ],
    summary:
      'A secure backbone that collects data from every machine, keeps fleets up to date and turns raw data into insight.',
    responsibilities: [
      'Device identity, authentication and access control',
      'Storing telemetry, images and inspection reports',
      'Retraining models and rolling out improvements',
    ],
    up: 'Live status, alerts and analytics',
    down: 'Mission plans, configuration and OTA updates',
  },
  {
    id: 'application',
    code: 'L4',
    name: 'Application Layer',
    tagline: 'Web dashboard · Mobile app',
    icon: DevicesIcon,
    nodes: [
      { label: 'Live monitoring dashboard', icon: MonitorIcon },
      { label: 'Mobile app & instant alerts', icon: DeviceMobileIcon },
      { label: 'Reports & inspection data', icon: FileTextIcon },
      { label: 'APIs & ERP integration', icon: PlugsConnectedIcon },
    ],
    summary:
      'The screens your team actually uses: to watch operations live, plan missions, review results and connect to business systems.',
    responsibilities: [
      'Live maps, video and machine health',
      'Mission planning and approvals',
      'Exports and integrations with ERP / MES',
    ],
    up: 'Insights for operators and managers',
    down: 'Operator actions and mission requests',
  },
];

/* How each pair of neighbouring layers talks (between layers[i] and layers[i + 1]). */
export const layerLinks = ['CAN · Ethernet · USB', 'MQTT over TLS · 4G/5G · Wi-Fi', 'REST · WebSocket'];

export const securityNote =
  'TLS encryption · device certificates · role-based access · audit logs · signed OTA updates';
