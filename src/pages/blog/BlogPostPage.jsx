import { useParams } from 'react-router';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { PageHero } from '../../components/shared/PageHero';
import { PostCard } from '../../components/shared/PostCard';
import { Button } from '../../components/ui/Button';
import { ArrowLeftIcon, CalendarBlankIcon, ClockIcon, UserIcon } from '../../components/ui/icons';
import { Img } from '../../components/ui/Img';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Seo } from '../../components/ui/Seo';
import { postBySlug, relatedPosts } from '../../data/blog';
import { categoryHue } from '../../lib/hues';
import NotFoundPage from '../NotFoundPage';
import './blog.css';

/** Paragraphs as strings, { h2 } sub-headings and { list } bullets (see src/data/blog.js). */
function ArticleBody({ blocks }) {
  return blocks.map((block, index) => {
    if (typeof block === 'string') return <p key={index}>{block}</p>;
    if (block.h2) return <h2 key={index}>{block.h2}</h2>;
    return (
      <ul key={index}>
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  });
}

/** One blog article: /blog/:slug. */
export default function BlogPostPage() {
  const { slug } = useParams();
  const post = postBySlug[slug];
  if (!post) return <NotFoundPage />;

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <PageHero crumb={post.title} trail={[{ label: 'Blog', to: '/blog' }]} title={post.title} lead={post.excerpt}>
        <ul role="list" className="article-meta">
          <li className={`article-meta__category hue-${categoryHue(post.category)}`}>{post.category}</li>
          <li>
            <CalendarBlankIcon aria-hidden="true" />
            <time dateTime={post.date}>{post.dateLabel}</time>
          </li>
          <li>
            <ClockIcon aria-hidden="true" />
            {post.readTime}
          </li>
          <li>
            <UserIcon aria-hidden="true" />
            {post.author}
          </li>
        </ul>
      </PageHero>

      <Section tone="white" spacing="lg" aria-label="Article">
        <article className="article">
          <Img src={post.image} alt="" ratio="16 / 9" position={post.imagePosition} priority className="article__image" />
          <div className="article__body">
            <ArticleBody blocks={post.body} />
          </div>
          <div className="article__footer">
            <Button to="/blog" variant="outline" icon={ArrowLeftIcon} iconPosition="start">
              All posts
            </Button>
            <Button to="/contact">Discuss a Project</Button>
          </div>
        </article>
      </Section>

      <Section tone="light" spacing="lg" aria-labelledby="more-posts-title">
        <Reveal>
          <SectionHeading eyebrow="Keep Reading" title="More from the *Lab*" id="more-posts-title" />
        </Reveal>
        <ul role="list" className="posts">
          {relatedPosts(post).map((other, index) => (
            <Reveal as="li" key={other.slug} delay={index * 100}>
              <PostCard post={other} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBanner flushTop />
    </>
  );
}
