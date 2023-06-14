import enDocs from "./en/docs";

// type NavDictionaryKeys = (typeof enDocs)[number]["key"];
// same as above, but includes the keys from the links array
type NavDictionaryKeys =
  | (typeof enDocs)[number]["key"]
  | NonNullable<(typeof enDocs)[number]["links"]>[number]["key"];

export type EntryDoc = EntryLink | EntryHeader;

type EntryLink = { link: string; type?: string; text: string; key: string };
type EntryHeader = {
  header: true;
  links: EntryLink[];
  type: string;
  text: string;
  key: string;
};
/**
 * @description Function to create translations based on the docs.ts file, falling back to the english version if the translation is not found.
 * @param {object} translations - The translations object to use.
 * @returns {object} The translated docs object.
 */
export function translateDocs(
  translations: Partial<Record<NavDictionaryKeys, string>>
): EntryDoc[] {
  return enDocs.map((doc) => {
    const translatedDoc = structuredClone(doc) as EntryDoc;
    if ("header" in translatedDoc) {
      translatedDoc.links = translatedDoc.links.map((link) => ({
        ...link,
        text: translations[link.key] || link.text,
      }));
    }
    translatedDoc.text = translations[doc.key] || doc.text;
    return translatedDoc;
  }) as EntryDoc[];
}
