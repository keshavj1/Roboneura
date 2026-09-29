import { Fragment, useId, useState } from 'react';
import { IconBox } from '../../components/ui/IconBox';
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, ShieldCheckIcon } from '../../components/ui/icons';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { layerLinks, layers, securityNote } from '../../data/architecture';
import { useInView } from '../../hooks/useInView';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cx } from '../../lib/cx';
import { hueAt } from '../../lib/hues';

const LAST = layers.length - 1;

/**
 * Four-layer architecture diagram (Physical -> Edge -> Cloud -> Application).
 * The layer cards form an ARIA tablist: click or use arrow keys / Home / End to
 * choose a layer; its details appear in the panel below the diagram.
 */
export function SystemArchitecture() {
  const [selected, setSelected] = useState(0);
  const horizontal = useMediaQuery('(min-width: 1100px)');
  const [panelRef, inView] = useInView({ once: false, threshold: 0.05 });
  const baseId = useId();
  const layer = layers[selected];

  const onKeyDown = (event) => {
    const moves = { ArrowRight: selected + 1, ArrowDown: selected + 1, ArrowLeft: selected - 1, ArrowUp: selected - 1, Home: 0, End: LAST };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + layers.length) % layers.length;
    setSelected(next);
    event.currentTarget.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <Section id="architecture" tone="light" spacing="lg">
      <Reveal>
        <SectionHeading
          eyebrow="System Architecture"
          title="How Our Systems Connect, from Sensor to *Screen*"
          lead="Every ROBONEURA solution is built on the same four layers. Data flows from the machines to your team; commands and updates flow back to the machines. Select a layer to see what it does."
        />
      </Reveal>

      <Reveal delay={100} className="arch">
        <div className="arch__panel" ref={panelRef} data-inview={inView ? '' : undefined}>
          <div className="arch__grid-bg" aria-hidden="true" />
          <p className="sr-only">
            Data flows from the physical layer (robots, drones and sensors) to the edge layer, then to the cloud layer,
            and finally to the application layer (web dashboard and mobile app). Commands and updates flow the opposite way.
          </p>

          <div
            className="arch__flow"
            role="tablist"
            aria-label="Architecture layers"
            aria-orientation={horizontal ? 'horizontal' : 'vertical'}
          >
            {layers.map((item, index) => (
              <Fragment key={item.id}>
                <button
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${item.id}`}
                  aria-selected={index === selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={index === selected ? 0 : -1}
                  className={cx('arch-layer', `hue-${hueAt(index)}`, index === selected && 'is-selected')}
                  onClick={() => setSelected(index)}
                  onKeyDown={onKeyDown}
                >
                  <span className="arch-layer__top">
                    <span className="arch-layer__code">
                      {item.code} · {item.id.toUpperCase()}
                    </span>
                    {index === selected && <CheckCircleIcon weight="fill" className="arch-layer__check" aria-hidden="true" />}
                  </span>
                  <IconBox icon={item.icon} size={48} tone="glass" iconSize={26} />
                  <span className="arch-layer__name">{item.name}</span>
                  <span className="arch-layer__tagline">{item.tagline}</span>
                  <span className="arch-layer__nodes">
                    {item.nodes.map(({ label, icon: NodeIcon }) => (
                      <span key={label} className="arch-layer__node">
                        <NodeIcon weight="duotone" aria-hidden="true" />
                        {label}
                      </span>
                    ))}
                  </span>
                </button>

                {index < LAST && (
                  <div
                    className={cx('arch-link', (index === selected || index + 1 === selected) && 'is-active')}
                    aria-hidden="true"
                  >
                    <span className="arch-link__track arch-link__track--data">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="arch-link__track arch-link__track--cmd">
                      <i />
                      <i />
                    </span>
                    <span className="arch-link__label">{layerLinks[index]}</span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <div className="arch__legend" aria-hidden="true">
            <span className="arch__legend-item arch__legend-item--data">Data &amp; telemetry</span>
            <span className="arch__legend-item arch__legend-item--cmd">Commands &amp; updates</span>
          </div>
        </div>

        <div
          key={layer.id}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${layer.id}`}
          tabIndex={0}
          className={cx('arch-detail', `hue-${hueAt(selected)}`)}
        >
          <div className="arch-detail__head">
            <IconBox icon={layer.icon} size={52} tone="soft" iconSize={28} />
            <div>
              <p className="eyebrow">
                {layer.code} · {layer.tagline}
              </p>
              <h3 className="arch-detail__title">{layer.name}</h3>
            </div>
          </div>
          <p className="arch-detail__summary">{layer.summary}</p>
          <div className="arch-detail__cols">
            <div>
              <h4 className="arch-detail__label">What it does</h4>
              <ul role="list" className="check-list">
                {layer.responsibilities.map((item) => (
                  <li key={item}>
                    <CheckCircleIcon weight="duotone" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="arch-detail__flows">
              <div className="arch-flow arch-flow--data">
                <ArrowUpIcon weight="bold" aria-hidden="true" />
                <div>
                  <h4 className="arch-detail__label">Data towards your team</h4>
                  <p>{layer.up}</p>
                </div>
              </div>
              <div className="arch-flow arch-flow--cmd">
                <ArrowDownIcon weight="bold" aria-hidden="true" />
                <div>
                  <h4 className="arch-detail__label">Commands towards the machines</h4>
                  <p>{layer.down}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="arch__security">
          <ShieldCheckIcon weight="duotone" aria-hidden="true" />
          <span>
            <strong>Security &amp; observability across every layer:</strong> {securityNote}
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
