import { clients } from '../../data/company';

// Each track half holds the list twice so the loop stays seamless on wide screens.
const HALF = [...clients, ...clients];

export function ClientsMarquee() {
  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="container clients__head">
        <h2 id="clients-title" className="clients__title">
          Trusted by teams across industry
        </h2>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} role="list" className="marquee__group" aria-hidden={copy === 1 ? true : undefined}>
              {HALF.map((client, index) => (
                <li key={`${client.name}-${index}`} className="client" aria-hidden={index >= clients.length ? true : undefined}>
                  <client.icon weight="duotone" aria-hidden="true" />
                  {client.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
