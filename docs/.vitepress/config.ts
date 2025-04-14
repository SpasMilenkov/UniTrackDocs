import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "UniTrack Docs",
    description: "Documentation for your university management system",
    appearance: "dark",
    lastUpdated: true,
    // Fix localization configuration
    locales: {
      "/": {
        lang: "en-US",
        title: "UniTrack Docs",
        description: "Documentation for your university management system",
      },
      "/bg/": {
        lang: "bg-BG",
        title: "UniTrack Документация",
        description:
          "Документация за вашата система за управление на университет",
      },
    },
    themeConfig: {
      logo: "/logo.png",
      // Localized nav and sidebar
      localeLinks: {
        text: "Language",
        items: [
          { text: "English", link: "/" },
          { text: "Български", link: "/bg/" },
        ],
      },
      // English nav
      nav: [
        { text: "Guide", link: "/guide/" },
        {
          text: "GitHub",
          link: "https://github.com/SpasMilenkov/UniTrackRemaster",
        },
      ],
      // English sidebar
      sidebar: {
        "/": [
          {
            text: "Guide",
            collapsed: true,
            items: [
              { text: "Introduction", link: "en/intro" },
              {
                text: "Setup",
                items: [
                  {
                    text: "Getting Started",
                    link: "/en/setup/getting-started",
                  },
                  {
                    text: "Docker Development",
                    link: "/en/setup/deployment-dev",
                  },
                  {
                    text: "Docker Production",
                    link: "/en/setup/deployment-prod",
                  },
                  { text: "Configuration", link: "/en/setup/config" },
                  {
                    text: "Troubleshooting",
                    link: "/en/setup/troubleshooting",
                  },
                ],
              },
            ],
          },
          {
            text: "Modules",
            collapsed: true,
            items: [
              {
                text: "Academic",
                link: "/en/modules/academic-structure-module",
              },
              { text: "Dashboard", link: "/en/modules/dashboard-module" },
              { text: "Grading", link: "/en/modules/grading-module" },
              {
                text: "User Management",
                link: "/en/modules/user-management-module",
              },
            ],
          },
        ],
        // Bulgarian sidebar
        "/bg/": [
          {
            text: "Ръководство",
            collapsed: true,
            items: [
              { text: "Въведение", link: "/bg/intro" },
              {
                text: "Настройка",
                items: [
                  { text: "Първи стъпки", link: "/bg/setup/getting-started" },
                  {
                    text: "Docker Разработка",
                    link: "/bg/setup/deployment-dev",
                  },
                  {
                    text: "Docker Продукция",
                    link: "/bg/setup/deployment-prod",
                  },
                  { text: "Конфигурация", link: "/bg/setup/config" },
                  {
                    text: "Отстраняване на проблеми",
                    link: "/bg/setup/troubleshooting",
                  },
                ],
              },
            ],
          },
          {
            text: "Модули",
            collapsed: true,
            items: [
              { text: "Табло", link: "/bg/modules/dashboard" },
              { text: "API", link: "/bg/modules/api" },
            ],
          },
        ],
      },
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/SpasMilenkov/UniTrackRemaster",
        },
      ],
      footer: {
        message: "Released under MIT License",
        copyright: "Copyright © 2025 Spas Milenkov",
      },
    },
    ignoreDeadLinks: true,
  })
);
