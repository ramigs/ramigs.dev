import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { APIContext } from 'astro';

// Post bodies contain root-relative URLs (optimized image src, internal
// links) that only resolve correctly on the site itself. Feed readers have
// no such base, so rewrite them to absolute before embedding as full content.
function absolutizeUrls(html: string, site: string) {
  return html.replace(
    /((?:src|href)=")\/(?!\/)/g,
    (_match, prefix) => `${prefix}${site}/`
  );
}

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const site = context.site!.toString().replace(/\/$/, '');
  const container = await AstroContainer.create();

  const items = await Promise.all(
    posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(async (post) => {
        // Rendered via the Container API (not post.rendered.html) because
        // markdown images compile to an unresolved __ASTRO_IMAGE_ placeholder
        // that only astro:assets' component-rendering pipeline turns into a
        // final optimized <img>.
        const { Content } = await render(post);
        const html = await container.renderToString(Content);

        return {
          title: post.data.title,
          description: post.data.description,
          pubDate: post.data.date,
          link: `/blog/${post.id}/`,
          content: absolutizeUrls(html, site),
        };
      })
  );

  return rss({
    title: 'ramigs.dev',
    description:
      'Frontend engineering, AI-assisted development, and the tools I use day to day — from quick TILs to longer deep dives.',
    site: context.site!,
    items,
  });
}
