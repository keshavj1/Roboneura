import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

/** Number that counts up when it becomes visible. Screen readers get the final value. */
export function CountUp({ end, prefix = '', suffix = '', duration, className }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const value = useCountUp(end, { active: inView, duration });
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {end}
        {suffix}
      </span>
    </span>
  );
}
