import { Link } from 'react-router';

/** "Home / Page" trail used in page heroes. The last item is the current page. */
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol role="list">
        {items.map((item, index) =>
          index < items.length - 1 ? (
            <li key={item.label}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ) : (
            <li key={item.label} aria-current="page">
              {item.label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
