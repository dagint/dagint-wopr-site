import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const posts = blog
    .filter((p) => p.data.published !== false)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'DaGint Computer Support Blog',
    description: 'IT support, repair, networking, security, and tech tips from DaGint.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`,
    })),
    trailingSlash: false,
  });
}
