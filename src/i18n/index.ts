import type { AstroGlobal } from "astro";
import type { NavDictionary } from "./translation-helpers";
import languages from "./languages";

function getLangFromPath(path: string): string {
  const lang = path.split("/")[1];
  return lang in languages ? lang : "en";
}
