import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectSchema } from "./sanity/schemaTypes/project";
import { reviewSchema } from "./sanity/schemaTypes/review";

export default defineConfig({
  name: "chrod-portfolio",
  title: "CHRod Portfolio",

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",

  plugins: [structureTool()],

  schema: {
    types: [projectSchema, reviewSchema],
  },
});
