import { useState } from 'react';
import { CaseStudies } from '../../components/shared/CaseStudies';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { OwnerSpotlight } from '../../components/shared/OwnerSpotlight';
import { ProcessSteps } from '../../components/shared/ProcessSteps';
import { SolutionModal } from '../../components/shared/SolutionModal';
import { VideoModal } from '../../components/shared/VideoModal';
import { Seo } from '../../components/ui/Seo';
import { solutionById } from '../../data/solutions';
import { AboutStrip } from './AboutStrip';
import { ClientsMarquee } from './ClientsMarquee';
import { Faq } from './Faq';
import { Hero } from './Hero';
import { IndustriesOverview } from './IndustriesOverview';
import { LatestPosts } from './LatestPosts';
import { SolutionsPreview } from './SolutionsPreview';
import { TechStrip } from './TechStrip';
import { Testimonials } from './Testimonials';
import { VideoBanner } from './VideoBanner';
import { WhyChoose } from './WhyChoose';
import './home.css';

export default function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [solutionId, setSolutionId] = useState(null);

  return (
    <>
      <Seo description="ROBONEURA DYNAMICS PRIVATE LIMITED designs and deploys intelligent robotic, drone, automation and computer vision systems for industry. Based in Lucknow, India." />
      <Hero onWatchVideo={() => setVideoOpen(true)} />
      <TechStrip onSelect={setSolutionId} />
      <SolutionsPreview onLearnMore={setSolutionId} />
      <ClientsMarquee />
      <IndustriesOverview />
      <WhyChoose />
      <AboutStrip />
      <OwnerSpotlight />
      <CaseStudies />
      <VideoBanner onPlay={() => setVideoOpen(true)} />
      <ProcessSteps className="section--flush-top" />
      <Testimonials />
      <LatestPosts />
      <Faq />
      <CtaBanner tone="white" flushTop />

      <SolutionModal solution={solutionId ? solutionById[solutionId] : null} onClose={() => setSolutionId(null)} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
