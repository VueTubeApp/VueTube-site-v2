export default [
  {
    text: "Welcome",
    link: "/welcome",
    type: "contrib",
    key: "welcome",
  },
  {
    text: "The Mobile App",
    header: true,
    type: "contrib",
    key: "mobile-app",
    links: [
      {
        text: "Getting Started",
        link: "/mobile-app/getting-started",
        key: "mobile-app-getting-started",
      },
      {
        text: "Project Structure",
        link: "/mobile-app/project-structure",
        key: "mobile-app-project-structure",
      },
      {
        text: "Compiling",
        link: "/mobile-app/compiling",
        key: "mobile-app-compiling",
      },
    ],
  },
  {
    text: "VueTube Extractor",
    header: true,
    type: "contrib",
    key: "vuetube-extractor",
    links: [
      {
        text: "Getting Started",
        link: "/vuetube-extractor/getting-started",
        key: "vuetube-extractor-getting-started",
      },
      {
        text: "Core Concepts",
        link: "/vuetube-extractor/core-concepts",
        key: "vuetube-extractor-core-concepts",
      },
      {
        text: "Reverse Engineering",
        link: "/vuetube-extractor/reverse-engineering",
        key: "vuetube-extractor-reverse-engineering",
      },
      {
        text: "Usage Examples",
        link: "/vuetube-extractor/usage-examples",
        key: "vuetube-extractor-usage-examples",
      },
      {
        text: "Testing",
        link: "/vuetube-extractor/testing",
        key: "vuetube-extractor-testing",
      },
      {
        text: "Function References",
        link: "/vuetube-extractor/function-reference",
        key: "vuetube-extractor-function-reference",
      },
      {
        text: "Type References",
        link: "/vuetube-extractor/type-reference",
        key: "vuetube-extractor-type-reference",
      },
      {
        text: "API Reference",
        link: "/vuetube-extractor/api-reference",
        key: "vuetube-extractor-api-reference",
      },
    ],
  },
  {
    text: "Plugins",
    header: true,
    type: "contrib",
    key: "plugins",
    links: [
      {
        text: "VueTube Plugins",
        link: "/plugins/vuetube-plugins",
        key: "plugins-vuetube-plugins",
      },
      {
        text: "Capacitor Plugins",
        link: "/plugins/capacitor-plugins",
        key: "plugins-capacitor-plugins",
      },
    ],
  },
  {
    text: "Translating",
    header: true,
    type: "contrib",
    key: "translating",
    links: [
      {
        text: "Translating VueTube",
        link: "/translating/vuetube",
        key: "translating-vuetube",
      },
      {
        text: "Translating Repositories",
        link: "/translating/repositories",
        key: "translating-repositories",
      },
      {
        text: "Translating Website",
        link: "/translating/Website",
        key: "translating-website",
      },
    ],
  },
] as const;
