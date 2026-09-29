import { useState } from 'react';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { PageHero } from '../../components/shared/PageHero';
import { PostCard } from '../../components/shared/PostCard';
import { FilterPills } from '../../components/ui/FilterPills';
import { Section } from '../../components/ui/Section';
import { Seo } from '../../components/ui/Seo';
import { blogCategories, blogPosts } from '../../data/blog';
import './blog.css';

/** All blog posts: the newest one large, the rest in a grid, with a category filter. */
export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const shown = blogPosts.filter((post) => category === 'All' || post.category === category);
  const [featured, ...rest] = shown;

  return (
    <>
      <Seo
        title="Blog"
        description="Engineering notes from ROBONEURA Dynamics on robotics, drones, automation and computer vision: what works on real sites, and why."
      />
      <PageHero
        crumb="Blog"
        title="News & Insights from the Lab"
        lead="Engineering notes on robotics, drones, automation and computer vision: what works on real sites, and why."
      />

      <Section tone="light" spacing="lg" aria-label="Blog posts">
        <div className="blog-toolbar">
          <p className="blog-toolbar__count" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'article' : 'articles'}
            {category !== 'All' && ` in ${category}`}
          </p>
          <FilterPills options={blogCategories} value={category} onChange={setCategory} label="Filter posts by topic" />
        </div>

        {/* Keyed by category so the staggered fade replays on every change. */}
        <div className="stagger" key={category}>
          {featured && (
            <div className="blog-featured" style={{ '--i': 0 }}>
              <PostCard post={featured} featured heading="h2" />
            </div>
          )}
          {rest.length > 0 && (
            <ul role="list" className="posts blog-grid">
              {rest.map((post, index) => (
                <li key={post.slug} style={{ '--i': index + 1 }}>
                  <PostCard post={post} excerpt heading="h2" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <CtaBanner
        title="Have a *Project* in Mind?"
        text="Tell us what you want to automate, inspect or measure. An engineer will get back to you within one working day."
        flushTop
      />
    </>
  );
}
