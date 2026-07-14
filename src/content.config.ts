import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(["live", "die", "remember"]),
    featured: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = {
  blog,
};