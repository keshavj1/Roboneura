import { site } from '../../config/site';
import { img } from '../../lib/assets';
import { Button } from '../ui/Button';
import { PlayCircleIcon } from '../ui/icons';
import { Img } from '../ui/Img';
import { Modal } from '../ui/Modal';
import './VideoModal.css';

function VideoPlayer({ url }) {
  if (/\.(mp4|webm)(\?|$)/i.test(url)) {
    return <video className="video-modal__player" src={url} controls autoPlay playsInline />;
  }
  const src = `${url}${url.includes('?') ? '&' : '?'}autoplay=1&rel=0`;
  return (
    <iframe
      className="video-modal__player"
      src={src}
      title="ROBONEURA company video"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  );
}

/** Company video. Until site.videoUrl is set, shows a poster with a "coming soon" note. */
export function VideoModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="video-modal-title" size="video">
      <h2 id="video-modal-title" className="sr-only">
        ROBONEURA company video
      </h2>
      <div className="video-modal">
        {site.videoUrl ? (
          <VideoPlayer url={site.videoUrl} />
        ) : (
          <div className="video-modal__soon">
            <Img src={img('video-poster.webp')} alt="" fill />
            <div className="video-modal__overlay">
              <PlayCircleIcon weight="duotone" aria-hidden="true" />
              <p className="video-modal__heading">Our company film is in production</p>
              <p>Meanwhile, we are happy to show you our robots and drones live.</p>
              <Button to="/contact" size="sm">
                Book a demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
