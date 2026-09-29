import { cx } from '../../lib/cx';
import './FilterPills.css';

/** Row of toggle buttons for filtering a list. */
export function FilterPills({ options, value, onChange, label, className }) {
  return (
    <div className={cx('pills', className)} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="pill"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
