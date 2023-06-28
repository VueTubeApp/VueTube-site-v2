import type { AstroGlobal } from "astro";
import { docsTranslations, wrapNavUrls } from "./utils";
import languages from "./languages";
import type { DocsDict } from "./types";

function getLangFromPath(path: string): string {
  const lang = path.split("/")[1];
  return lang in languages ? lang : "en";
}

export function getDocs(Astro: AstroGlobal): DocsDict {
  const lang = getLangFromPath(Astro.url.pathname);
  return wrapNavUrls(
    `docs/${lang}`,
    docsTranslations[lang] || docsTranslations.en,
    Astro
  );
}
