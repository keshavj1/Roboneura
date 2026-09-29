import { Link } from 'react-router';
import { categoryHue } from '../../lib/hues';
import { cx } from '../../lib/cx';
import { ArrowRightIcon } from '../ui/icons';
import { Img } from '../ui/Img';
import './PostCard.css';

/**
 * Blog post card (Home "Latest from the Lab", the blog page, "More from the Lab").
 * The title is the link; it covers the whole card, so the card is clickable anywhere.
 * featured: large side-by-side card. excerpt: show the summary. heading: h2 | h3.
 */
export function PostCard({ post, featured = false, excerpt = false, heading: Heading = 'h3' }) {
  return (
    <article className={cx('post', featured && 'post--featured')} data-tilt={featured ? undefined : ''}>
      <Img
        src={post.image}
        alt=""
        ratio={featured ? undefined : '16 / 9'}
        position={post.imagePosition}
        className="post__media"
      />
      <div className="post__body">
        <p className="post__meta">
          <span className={`post__category hue-${categoryHue(post.category)}`}>{post.category}</span>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span>{post.readTime}</span>
        </p>
        <Heading className="post__title">
          <Link to={`/blog/${post.slug}`} className="post__link">
            {post.title}
          </Link>
        </Heading>
        {(excerpt || featured) && <p className="post__excerpt">{post.excerpt}</p>}
        <span className="post__more" aria-hidden="true">
          Read More <ArrowRightIcon />
        </span>
      </div>
    </article>
  );
}
