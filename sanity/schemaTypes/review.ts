import { defineField, defineType } from "sanity";

export const reviewSchema = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Position (EN)",
      type: "string",
    }),
    defineField({
      name: "roleEs",
      title: "Role / Position (ES)",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar Initials",
      type: "string",
      description: "2-letter initials shown as avatar (e.g. SM)",
      validation: (r) => r.max(2),
    }),
    defineField({
      name: "text",
      title: "Review Text (EN)",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "textEs",
      title: "Review Text (ES)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Direct Client", value: "direct" },
          { title: "Workana", value: "workana" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "direct",
    }),
    defineField({
      name: "sourceLabel",
      title: "Custom Source Label",
      type: "string",
      description: 'Label shown when Source is set to "Custom"',
      hidden: ({ document }) => document?.source !== "custom",
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      description: "Shown as stars — most relevant for Workana reviews",
      validation: (r) => r.min(1).max(5),
      hidden: ({ document }) =>
        document?.source !== "workana" && document?.source !== "direct",
    }),
    defineField({
      name: "lang",
      title: "Submission Language",
      type: "string",
      description: "Language in which the review was originally written",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Spanish", value: "es" },
        ],
        layout: "radio",
      },
      initialValue: "en",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description:
        "Toggle on to show this review in the portfolio carousel. New submissions start unpublished.",
      initialValue: false,
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description: "Link to the original review (e.g. Workana profile)",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn Profile URL",
      type: "url",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: false },
      description: "Optional — shown instead of role · company text",
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
    select: { title: "name", subtitle: "company", media: "published" },
    prepare({ title, subtitle }: { title: string; subtitle?: string }) {
      return { title, subtitle };
    },
  },
});
