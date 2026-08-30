import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Reduce a Markdown body to plain prose for full-text indexing: drop code
// (fenced + inline), images, link/HTML syntax, and block markers, keeping
// the human-readable words. Not a parser — a deliberately cheap pass that
// runs once at build time, when this endpoint is rendered to a static
// `/search.json` file.
function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, ' ') // HTML comments
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`([^`\n]+)`/g, '$1') // inline code -> keep the term itself
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/^\s*\[[^\]]+\]:.*$/gm, ' ') // reference-link definitions
    .replace(/<[^>]+>/g, ' ') // raw HTML tags
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // ATX headings
    .replace(/^\s{0,3}>\s?/gm, '') // blockquote markers
    .replace(/^\s{0,3}(?:[-*+]|\d+\.)\s+/gm, '') // list markers
    .replace(/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/gm, ' ') // thematic breaks
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // emphasis
    .replace(/~~([^~]+)~~/g, '$1') // strikethrough
    .replace(/\|/g, ' ') // table pipes
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  const index = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => ({
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      date: post.data.date.toISOString(),
      body: markdownToPlainText(post.body ?? ''),
    }));

  return new Response(JSON.stringify(index), {
    headers: { 'content-type': 'application/json' },
  });
};
