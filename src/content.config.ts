import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file, glob } from "astro/loaders";

const detailSchema = z.object({
  title: z.string(),
  description: z.string(),
  actionLabel: z.string().optional(),
  url: z.url().optional(),
  meta: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
});

const projects = defineCollection({
  loader: file("src/content/data/projects.json"),
  schema: z.object({
    title: z.string(),
    kind: z.enum(["app", "website"]),
    eyebrow: z.string(),
    summary: z.string(),
    accent: z.string(),
    size: z.enum(["wide", "tall", "standard"]),
    detail: detailSchema,
  }),
});

const books = defineCollection({
  loader: file("src/content/data/books.json"),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    color: z.string(),
    ink: z.string().default("#1f2020"),
    height: z.number().min(150).max(250),
    selected: z.boolean().default(false),
    note: z.string(),
  }),
});

const photography = defineCollection({
  loader: file("src/content/data/photography.json"),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    year: z.number(),
    palette: z.tuple([z.string(), z.string(), z.string()]),
  }),
});

const uses = defineCollection({
  loader: file("src/content/data/uses.json"),
  schema: z.object({ category: z.string(), name: z.string(), note: z.string() }),
});

const music = defineCollection({
  loader: file("src/content/data/music.json"),
  schema: z.object({ title: z.string(), artist: z.string(), year: z.number(), color: z.string(), url: z.url().optional() }),
});

const inspirations = defineCollection({
  loader: file("src/content/data/inspirations.json"),
  schema: z.object({ name: z.string(), field: z.string(), note: z.string() }),
});

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, books, photography, uses, music, inspirations, notes };
