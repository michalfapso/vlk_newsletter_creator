// 1. Importujeme potrebné utility z `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Definujeme kolekciu pre newslettre
const newslettersCollection = defineCollection({
  type: 'content', // 'content' znamená, že pôjde o Markdown (.md) alebo MDX (.mdx) súbory
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
  }),
});

// 3. Exportujeme všetky kolekcie pod kľúčom `collections`
export const collections = {
  'newsletters': newslettersCollection,
};