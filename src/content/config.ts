import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  blog: blogCollection,
};
