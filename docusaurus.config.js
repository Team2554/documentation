/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Team 2554 Documentation",
  tagline: "Hawks fly high",
  url: "https://team-2554.gitlab.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Team 2554",
  projectName: "documentation",
  themeConfig: {
    navbar: {
      title: "Team 2554 Documentation",
      logo: {
        alt: "Team 2554 Logo",
        src: "img/warhawks_logo.png",
      },
      items: [
        {
          href: "https://gitlab.com/team-2554/documentation",
          label: "GitLab",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "Our Website",
              href: "https://jpsrobotics2554.org/index.html",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/jpsrobotics2554/",
            },
            {
              label: "Blue Alliance",
              href: "https://www.thebluealliance.com/team/2554",
            },
          ],
        },
        {
          title: "Code",
          items: [
            {
              label: "Github",
              href: "https://github.com/team2554",
            },
            {
              label: "Gitlab",
              href: "https://gitlab.com/team-2554",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Team 2554. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://gitlab.com/team-2554/documentation/-/tree/master",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
