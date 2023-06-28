import { getCollection } from "astro:content";

export const allDocs = await getCollection("docs");
