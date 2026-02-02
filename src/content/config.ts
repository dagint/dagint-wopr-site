import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(true),
    /** Hero/feature image path from site root (e.g. /blog/hero-windows.jpg). Shown on list and post page. */
    image: z.string().optional(),
    /** Optional icon path for list cards (e.g. /blog/icons/windows.svg). Falls back to image or default icon. */
    icon: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
