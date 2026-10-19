import { defineType } from "sanity";

export default defineType({
  name: "portfolio",
  title: "Portfolio Item",
  type: "document",
  fields: [
    { name: "brand", title: "Brand", type: "string" },
    { name: "caption", title: "Caption", type: "string" },
    { name: "category", title: "Category", type: "string" },

    
{
  name: "types",
  title: "Project Types",
  description: "Select all types of work included in this project.",
  type: "array",
  of: [
    {
      type: "string",
      options: {
        layout: "dropdown",
        list: [
          { title: "Branding", value: "Branding" },
          { title: "Websites", value: "Websites" },
          { title: "Designs", value: "Designs" },
          { title: "Marketing", value: "Marketing" },
          { title: "Motion Designs", value: "Motion Designs" },
          { title: "Product Designs", value: "Product Designs" },
          { title: "Video", value: "video" },
          { title: "AI Automation", value: "AI Automation" },
        ],
      },
    },
  ],
  validation: (Rule) => Rule.required().min(1).unique(),
},

    {
      name: "src",
      title: "Media",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    },
    { name: "videoUrl", title: "Video Embed URL", type: "url" },
    { name: "clientLink", title: "Client Link", type: "url" },
    { name: "description", title: "Description", type: "text" },

    {
      name: "summaryHighlights",
      title: "Summary Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "text", type: "string", title: "Text" },
          ],
        },
      ],
    },

    {
      name: "involvement",
      title: "Zi Creates Involvement",
      type: "array",
      of: [{ type: "string" }],
    },

    {
      name: "related",
      title: "Related Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "portfolio" }] }],
    },
  ],

  preview: {
    select: {
      title: "brand",
      subtitle: "types",
      media: "thumbnail",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;

      return {
        title: title || "No file name",
        subtitle: Array.isArray(subtitle)
          ? subtitle.join(", ")
          : undefined,
        media,
      };
    },
  },
});