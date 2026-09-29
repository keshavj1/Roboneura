// Rules and messages match the approved contact-form design.
export const EMAIL_RE = /^\S+@\S+\.\S+$/;
const PHONE_RE = /^[+\d\s()-]{7,}$/;

export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email.';
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (values.message.trim().length < 10) errors.message = 'Please add a few details (10+ characters).';
  return errors;
}

export function validateEmail(email) {
  return EMAIL_RE.test(email.trim()) ? '' : 'Please enter a valid email.';
}
