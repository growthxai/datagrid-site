import { defineType, defineField } from "sanity";

export const agent = defineType({
  name: "agent",
  title: "Agent",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "jobToBeDone",
      title: "Job to Be Done",
      type: "text",
      description: "What does this agent accomplish for the user?",
    }),
    defineField({
      name: "inputs",
      title: "Inputs",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "outputs",
      title: "Outputs",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "connectors",
      title: "Connectors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "connector" }] }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "Coming Soon", value: "coming-soon" },
        ],
      },
      initialValue: "live",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription" },
  },
});
