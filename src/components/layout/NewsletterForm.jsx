import { useId, useState } from 'react';
import { submitForm } from '../../lib/submitForm';
import { validateEmail } from '../../lib/validation';
import { CheckCircleIcon } from '../ui/icons';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | failed
  const id = useId();

  const onSubmit = async (event) => {
    event.preventDefault();
    const problem = validateEmail(email);
    if (problem) {
      setError(problem);
      return;
    }
    setStatus('sending');
    try {
      await submitForm('newsletter', { email: email.trim() });
      setStatus('done');
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'done') {
    return (
      <p className="newsletter__done" role="status">
        <CheckCircleIcon weight="duotone" aria-hidden="true" /> Thanks, you&apos;re subscribed.
      </p>
    );
  }

  return (
    <form className="newsletter__form" onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="newsletter__field">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError('');
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <span id={`${id}-error`} className="newsletter__error">
            {error}
          </span>
        )}
        {status === 'failed' && (
          <span className="newsletter__error" role="alert">
            Something went wrong. Please try again.
          </span>
        )}
      </div>
      <button type="submit" className="btn btn--primary btn--md newsletter__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );
}
