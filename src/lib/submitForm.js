import { site } from '../config/site';

/**
 * Sends a form to the configured endpoint (any service that accepts a JSON POST,
 * e.g. Formspree). Returns { mode } where mode is:
 *  - 'sent'   : delivered to the endpoint
 *  - 'demo'   : no endpoint during `npm run dev`; nothing was sent
 *  - 'mailto' : no endpoint in a production build; the caller should hand the
 *               message to the visitor's email app (see buildMailto) so no lead is lost
 * Throws on network or server errors.
 */
export async function submitForm(kind, data) {
  const endpoint = kind === 'newsletter' ? site.forms.newsletterEndpoint : site.forms.contactEndpoint;

  if (!endpoint) {
    if (import.meta.env.DEV) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return { mode: 'demo' };
    }
    return { mode: 'mailto' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ form: kind, page: window.location.href, ...data }),
  });
  if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`);
  return { mode: 'sent' };
}

/** A mailto: link that carries the enquiry, used when no form endpoint is configured. */
export function buildMailto({ to, subject, lines }) {
  const body = lines.filter(Boolean).join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
