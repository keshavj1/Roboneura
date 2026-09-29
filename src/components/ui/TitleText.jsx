/**
 * Title text whose asterisk-wrapped words become the italic accent (Playfair Display):
 * "Case Studies from the *Field*" -> Case Studies from the <em class="title-accent">Field</em>.
 */
export function TitleText({ children }) {
  if (typeof children !== 'string' || !children.includes('*')) return children;
  return children.split(/\*([^*]+)\*/).map((part, index) =>
    index % 2 ? (
      <em key={index} className="title-accent">
        {part}
      </em>
    ) : (
      part
    ),
  );
}
