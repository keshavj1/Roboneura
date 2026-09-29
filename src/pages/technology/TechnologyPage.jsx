import { CapabilitiesGrid } from '../../components/shared/CapabilitiesGrid';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { HeroChips, PageHero } from '../../components/shared/PageHero';
import { ProcessSteps } from '../../components/shared/ProcessSteps';
import { CodeIcon, CpuIcon, PathIcon, StackIcon } from '../../components/ui/icons';
import { Seo } from '../../components/ui/Seo';
import { SystemArchitecture } from './SystemArchitecture';
import { TechStack } from './TechStack';
import './technology.css';

const chips = [
  { label: 'System architecture', to: '#architecture', icon: StackIcon },
  { label: 'Capabilities', to: '#capabilities', icon: CpuIcon },
  { label: 'Technology stack', to: '#tech-stack', icon: CodeIcon },
  { label: 'How we work', to: '#process', icon: PathIcon },
];

export default function TechnologyPage() {
  return (
    <>
      <Seo
        title="Technology"
        description="How ROBONEURA systems work: a four-layer architecture from robots, drones and sensors through edge and cloud to web dashboards and mobile apps, and the tools we build with."
      />
      <PageHero
        crumb="Technology"
        title="From Sensor to Screen"
        lead="Hardware, embedded software, edge AI and cloud platforms, engineered as one connected system."
      >
        <HeroChips items={chips} />
      </PageHero>

      <SystemArchitecture />
      <CapabilitiesGrid id="capabilities" />
      <TechStack />
      <ProcessSteps id="process" tone="light" />
      <CtaBanner tone="white" flushTop />
    </>
  );
}
