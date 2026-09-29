import { Button } from '../../components/ui/Button';
import { Img } from '../../components/ui/Img';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { posts } from '../../data/content';
import { categoryHue } from '../../lib/hues';

export function LatestPosts() {
  return (
    <Section tone="light" spacing="lg">
      <Reveal>
        <SectionHeading
          eyebrow="News & Insights"
          title="Latest from the *Lab*"
          actions={
            <Button href="#" variant="outline" size="sm">
              View All Posts
            </Button>
          }
        />
      </Reveal>
      <ul role="list" className="posts">
        {posts.map((post, index) => (
          <Reveal as="li" key={post.title} delay={index * 120}>
            <article className="post" data-tilt="">
              <Img src={post.image} alt="" ratio="16 / 9" position={post.imagePosition} />
              <div className="post__body">
                <p className="post__meta">
                  <span className={`post__category hue-${categoryHue(post.category)}`}>{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </p>
                <h3 className="post__title">{post.title}</h3>
                <Button href={post.href} variant="link">
                  Read More<span className="sr-only">: {post.title}</span>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
      <PlaceholderNote>* Sample articles: they will link to the full posts once published.</PlaceholderNote>
    </Section>
  );
}
