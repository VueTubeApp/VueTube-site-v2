import type { DocsDict } from "./types";

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
