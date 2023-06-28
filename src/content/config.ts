import { z, defineCollection } from "astro:content";

const baseSchema = z
  .object({
    type: z.literal("base").optional().default("base"),
    title: z.string(),
    description: z.string().optional(),
    i18nReady: z.boolean().default(false),
    githubURL: z.string().url().optional(),
    image: z.string().optional(),
  })
  .strict();

const baseCollection = defineCollection({
  schema: baseSchema,
});

export const collections = {
  base: baseCollection,
};
