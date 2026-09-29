import { Button } from '../../components/ui/Button';
import { PlayCircleIcon } from '../../components/ui/icons';
import { HeroDrone } from './HeroDrone';

// Same seeded particle field as the design: deterministic, computed once.
const PARTICLES = (() => {
  let seed = 7;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: 22 }, () => ({
    left: `${(random() * 100).toFixed(1)}%`,
    top: `${(30 + random() * 70).toFixed(1)}%`,
    size: `${(2 + random() * 3).toFixed(1)}px`,
    duration: `${(6 + random() * 8).toFixed(1)}s`,
    delay: `${(-random() * 10).toFixed(1)}s`,
  }));
})();

/** Navy banner with a hexagon pattern: headline on the left, the animated 3D drone on the right. */
export function Hero({ onWatchVideo }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={`${p.left}-${p.top}`}
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDuration: p.duration, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">
            <span>Innovation</span>
            <span aria-hidden="true">|</span>
            <span>Robotics</span>
            <span aria-hidden="true">|</span>
            <span>Drones</span>
            <span aria-hidden="true">|</span>
            <span>Automation</span>
          </p>
          <h1 id="hero-title" className="hero__title">
            Building a Smarter Tomorrow with <span className="accent">Robotics</span> &amp; Drone Technology
          </h1>
          <p className="hero__lead">
            ROBONEURA DYNAMICS PRIVATE LIMITED designs and deploys intelligent robotic and drone solutions for a safer,
            smarter and more efficient world.
          </p>
          <div className="hero__actions">
            <Button to="/solutions" size="lg" glow>
              Explore Our Solutions
            </Button>
            <Button variant="outline-light" size="lg" icon={PlayCircleIcon} onClick={onWatchVideo} aria-haspopup="dialog">
              Watch Video
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <HeroDrone />
          <p className="hero__tagline">
            Autonomous
            <br />
            Intelligent
            <br />
            Sustainable
          </p>
        </div>
      </div>
    </section>
  );
}
