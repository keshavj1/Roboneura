import { useReveal } from '../../hooks/useReveal';

/** Fades its content up when it scrolls into view. `delay` in ms staggers siblings. */
export function Reveal({ as: Tag = 'div', delay = 0, style, children, ...rest }) {
  const ref = useReveal();
  const mergedStyle = delay ? { ...style, '--reveal-delay': `${delay}ms` } : style;
  return (
    <Tag ref={ref} data-reveal="" style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
