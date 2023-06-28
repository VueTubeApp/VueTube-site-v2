import type { DocsDict } from "./types";
import path from "path";

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

export function wrapNavUrls<T extends object>(slug: string, nav: Array<T>) {
  // find all link keys on every level of the nav and add the slug to the front
  nav = structuredClone(nav);
  return nav.map((item) => {
    if ("links" in item && Array.isArray(item.links)) {
      item.links = wrapNavUrls(slug, item.links);
    }
    if ("link" in item && typeof item.link === "string") {
      item.link = path.join(slug, item.link);
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
