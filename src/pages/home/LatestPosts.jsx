import { PostCard } from '../../components/shared/PostCard';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { blogPosts } from '../../data/blog';

/** The three newest blog posts. */
export function LatestPosts() {
  return (
    <Section tone="light" spacing="lg">
      <Reveal>
        <SectionHeading
          eyebrow="News & Insights"
          title="Latest from the *Lab*"
          actions={
            <Button to="/blog" variant="outline" size="sm">
              View All Posts
            </Button>
          }
        />
      </Reveal>
      <ul role="list" className="posts">
        {blogPosts.slice(0, 3).map((post, index) => (
          <Reveal as="li" key={post.slug} delay={index * 120}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
