import type enDocs from "./en/docs";

type DocsItem = {
  text: string;
  type: string;
  key: string;
  link: string;
};

type DocsGroup = {
  text: string;
  header: true;
  links: Array<{
    text: string;
    link: string;
    key: string;
  }>;
  type: string;
  key: string;
};

export type DocsDict = Array<DocsGroup | DocsItem>;
