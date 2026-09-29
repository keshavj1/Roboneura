import { useId, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../../components/ui/Button';
import { CheckCircleIcon, EnvelopeSimpleIcon, PaperPlaneTiltIcon, WarningCircleIcon } from '../../components/ui/icons';
import { site } from '../../config/site';
import { contactInterests } from '../../data/solutions';
import { buildMailto, submitForm } from '../../lib/submitForm';
import { validateContact } from '../../lib/validation';

const EMPTY = { name: '', email: '', phone: '', company: '', message: '', website: '' };
const FIELD_ORDER = ['name', 'email', 'phone', 'message'];
const focusOnMount = (el) => el?.focus();

function initialValues(params) {
  const interest = params.get('interest');
  const role = params.get('role');
  return {
    ...EMPTY,
    interest: contactInterests.includes(interest) ? interest : contactInterests[0],
    message: role ? `Hello, I would like to apply for the ${role} role.\n\n` : '',
  };
}

function Field({ id, label, required, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field__error">
          <WarningCircleIcon weight="fill" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState(() => initialValues(params));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [result, setResult] = useState(null);
  const id = useId();

  const update = (name) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  };

  const inputProps = (name) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validateContact(values);
    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      setErrors(found);
      event.currentTarget.elements.namedItem(firstInvalid)?.focus();
      return;
    }

    const firstName = values.name.trim().split(/\s+/)[0];
    const email = values.email.trim();

    // Honeypot filled in: almost certainly a bot. Pretend success, send nothing.
    if (values.website) {
      setResult({ mode: 'sent', firstName, email });
      setStatus('sent');
      return;
    }

    const payload = {
      name: values.name.trim(),
      email,
      phone: values.phone.trim(),
      company: values.company.trim(),
      interest: values.interest,
      message: values.message.trim(),
    };

    setStatus('sending');
    let mode;
    try {
      ({ mode } = await submitForm('contact', payload));
    } catch {
      setStatus('failed');
      return;
    }

    // No form service configured in this build: hand the enquiry to the visitor's
    // email app instead (see the "Open email app" button in the success message).
    const mailto =
      mode === 'mailto'
        ? buildMailto({
            to: values.interest === 'Careers' ? site.email.careers : site.email.info,
            subject: `Website enquiry: ${values.interest}`,
            lines: [
              payload.message,
              '',
              `Name: ${payload.name}`,
              `Email: ${payload.email}`,
              payload.phone && `Phone: ${payload.phone}`,
              payload.company && `Company: ${payload.company}`,
            ],
          })
        : null;
    setResult({ mode, firstName, email, mailto });
    setStatus('sent');
  };

  const reset = () => {
    setValues({ ...EMPTY, interest: contactInterests[0] });
    setErrors({});
    setResult(null);
    setStatus('idle');
  };

  if (status === 'sent' && result) {
    if (result.mode === 'mailto') {
      return (
        <div className="form-success" role="status">
          <EnvelopeSimpleIcon weight="duotone" className="form-success__icon" aria-hidden="true" />
          <h3 className="form-success__title" tabIndex={-1} ref={focusOnMount}>
            Thanks, {result.firstName}. One last step.
          </h3>
          <p>
            Press the button below to send your message from your email app; it is already written for you. You can
            also reach us at <a href={`mailto:${site.email.info}`}>{site.email.info}</a>.
          </p>
          <div className="form-success__actions">
            <Button href={result.mailto} icon={EnvelopeSimpleIcon} iconPosition="start">
              Open email app
            </Button>
            <Button variant="outline" icon={null} onClick={reset}>
              Start over
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="form-success" role="status">
        <CheckCircleIcon weight="duotone" className="form-success__icon" aria-hidden="true" />
        <h3 className="form-success__title" tabIndex={-1} ref={focusOnMount}>
          Thanks, {result.firstName}. Message received.
        </h3>
        <p>An engineer will reply to {result.email} within one working day.</p>
        {result.mode === 'demo' && (
          <p className="form-success__note">Development preview: no form endpoint is configured, so nothing was sent.</p>
        )}
        <Button variant="outline" icon={null} onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <Field id={`${id}-name`} label="Full name" required error={errors.name}>
        <input {...inputProps('name')} type="text" autoComplete="name" placeholder="Your name" required />
      </Field>
      <Field id={`${id}-email`} label="Email" required error={errors.email}>
        <input {...inputProps('email')} type="email" autoComplete="email" placeholder="you@company.com" required />
      </Field>
      <Field id={`${id}-phone`} label="Phone" error={errors.phone}>
        <input {...inputProps('phone')} type="tel" autoComplete="tel" placeholder="+91" />
      </Field>
      <Field id={`${id}-company`} label="Company" error={errors.company}>
        <input {...inputProps('company')} type="text" autoComplete="organization" placeholder="Company name" />
      </Field>

      <fieldset className="field field--full">
        <legend className="field__label">I&apos;m interested in</legend>
        <div className="choice-chips">
          {contactInterests.map((interest) => (
            <label key={interest} className="choice-chip">
              <input
                type="radio"
                name="interest"
                value={interest}
                checked={values.interest === interest}
                onChange={update('interest')}
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field--full">
        <Field id={`${id}-message`} label="Project details" required error={errors.message}>
          <textarea {...inputProps('message')} rows={5} placeholder="What should the system do, where, and by when?" required />
        </Field>
      </div>

      {/* Honeypot for spam bots; hidden from people and assistive technology. */}
      <div className="contact-form__trap" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
        </label>
      </div>

      {status === 'failed' && (
        <p className="contact-form__alert field--full" role="alert">
          <WarningCircleIcon weight="fill" aria-hidden="true" />
          We couldn&apos;t send your message. Please try again or email{' '}
          <a href={`mailto:${site.email.info}`}>{site.email.info}</a>.
        </p>
      )}

      <div className="contact-form__actions field--full">
        <button type="submit" className="btn btn--primary btn--lg btn--glow" disabled={status === 'sending'}>
          <span className="btn__label">{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
          <PaperPlaneTiltIcon className="btn__icon" aria-hidden="true" />
        </button>
        <span className="contact-form__privacy">We never share your details.</span>
      </div>
    </form>
  );
}
