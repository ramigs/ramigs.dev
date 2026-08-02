import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    // Old posts are filed as `YYYY-MM-DD-slug.md`. Production URLs are
    // derived from the filename with that date prefix stripped (Eleventy's
    // `page.fileSlug`) — NOT from the frontmatter `slug` field, which is
    // vestigial/unused (confirmed against live production: it's wrong or
    // 404s in every case where it differs from the filename). Replicating
    // that exact behavior here for URL parity.
    generateId: ({ entry }) =>
      entry.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    // Only set on posts originally published elsewhere and cross-posted
    // here — points the canonical tag at the original instead of self.
    // Field name matches what's already in the source frontmatter (carried
    // over from the old site, previously unused/dropped by this schema).
    canonical: z.url().optional(),
  }),
});

export const collections = { blog };
