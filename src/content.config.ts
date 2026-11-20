import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      /** One line, shown on the home-page tile. */
      summary: z.string(),
      /** Lucide icon name, e.g. "car", "keyboard". See https://lucide.dev/icons */
      icon: z.string(),
      /** Optional small photo to use on the tile instead of the icon. */
      thumbnail: image().optional(),
      tags: z.array(z.string()).min(1).max(4),
      role: z.string(),
      dates: z.string(),
      featured: z.boolean().default(false),
      order: z.number(),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      heroCaption: z.string().optional(),
      team: z.string().optional(),
      tools: z.array(z.string()).optional(),
      stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
      links: z
        .object({
          github: z.url().optional(),
          live: z.url().optional(),
          other: z.array(z.object({ label: z.string(), url: z.url() })).optional(),
        })
        .optional(),
      /** Optional tabs: split the body with <!-- tab: id --> markers; each tab can have its own hero, role, tools and stats. */
      tabs: z
        .array(
          z.object({
            id: z.string(),
            label: z.string(),
            role: z.string().optional(),
            tools: z.array(z.string()).optional(),
            heroImage: image().optional(),
            heroAlt: z.string().optional(),
            heroCaption: z.string().optional(),
            stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
          }),
        )
        .optional(),
      /** Set true to hide a project from the build. */
      draft: z.boolean().default(false),
    })
    .refine((d) => !d.heroImage || d.heroAlt, { message: 'heroAlt is required when heroImage is set' }),
});

export const collections = { projects };
