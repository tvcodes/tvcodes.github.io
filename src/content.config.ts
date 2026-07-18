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
    heroImageCaption: z.string().optional(),
    heroImageCredit: z.string().optional(),
    author: z.object({
      name: z.string(),
      role: z.string(),
      avatar: z.string().optional(),
    }),
    tags: z.array(z.string()).default([]),
    featuredIn: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog,
};