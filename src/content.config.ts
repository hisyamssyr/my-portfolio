import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    year: z.string(),
    stack: z.array(z.string()),
    tags: z.array(z.string()),
    order: z.number(),
    summary: z.string(),
    diagram: z.enum(["six-gate", "agents", "numeral"]).optional(),
    repo: z.string().optional(),
  }),
});

export const collections = { projects };
