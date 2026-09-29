import { PlayIcon } from '../../components/ui/icons';
import { Img } from '../../components/ui/Img';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { img } from '../../lib/assets';

export function VideoBanner({ onPlay }) {
  return (
    <Section tone="light" className="section--flush-top">
      <Reveal className="video-banner">
        <Img src={img('video-poster.webp')} alt="" fill position="center 40%" />
        <div className="video-banner__shade" aria-hidden="true" />
        <div className="video-banner__content">
          <div>
            <p className="eyebrow">See It in Action</p>
            <h2 className="video-banner__title">Watch our robots and drones at work</h2>
          </div>
          <button type="button" className="play-button" onClick={onPlay} aria-label="Play company video" aria-haspopup="dialog">
            <PlayIcon weight="fill" aria-hidden="true" />
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
