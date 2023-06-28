import type { DocsDict } from "./types";
import path from "path";
import type { AstroGlobal } from "astro";

function mapExports<T>(modules: Record<string, { default: T }>) {
  const exports: Record<string, T> = {};
  for (const [path, module] of Object.entries(modules)) {
    const [_dot, lang] = path.split("/");
    exports[lang] = module.default;
  }
  return exports;
}

export const docsTranslations = mapExports<DocsDict>(
  import.meta.glob("./*/docs.ts", { eager: true })
);

export function wrapNavUrls<T extends object>(
  slug: string,
  nav: Array<T>,
  Astro: AstroGlobal
) {
  // find all link keys on every level of the nav and add the slug to the front
  nav = structuredClone(nav);
  return nav.map((item) => {
    if ("links" in item && Array.isArray(item.links)) {
      item.links = wrapNavUrls(slug, item.links, Astro);
    }
    if ("link" in item && typeof item.link === "string") {
      item.link = new URL(
        path.join(slug, item.link),
        Astro.url.origin
      ).toString();
    }
    return item;
  });
}

export function getLangFromPath(path: string) {
  const [lang] = path.split("/");
  return lang;
}
export function stripLangFromPath(path: string) {
  const [, ...rest] = path.split("/");
  return rest.join("/");
}
