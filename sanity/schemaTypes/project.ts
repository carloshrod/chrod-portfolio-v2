import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (EN)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleEs",
      title: "Title (ES)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role (EN)",
      type: "string",
    }),
    defineField({
      name: "roleEs",
      title: "Role (ES)",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company / Client (EN)",
      type: "string",
    }),
    defineField({
      name: "companyEs",
      title: "Company / Client (ES)",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: "Single year (e.g. 2024) or range (e.g. 2024–2025)",
    }),
    defineField({
      name: "description",
      title: "Short Description (EN)",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descriptionEs",
      title: "Short Description (ES)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Long Description (EN)",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "longDescriptionEs",
      title: "Long Description (ES)",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "keyContributions",
      title: "Key Contributions (EN)",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key contributions or achievements in this project",
    }),
    defineField({
      name: "keyContributionsEs",
      title: "Key Contributions (ES)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "githubRepos",
      title: "GitHub Repos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", title: "URL", type: "url" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "websiteUrl",
      title: "Official Website URL",
      type: "url",
      description:
        "Official product/company website (when live demo is not available)",
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = displayed first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
