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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Branding", value: "Branding" },
          { title: "Websites", value: "Websites" },
          { title: "Designs", value: "Designs" },
          { title: "Marketing", value: "Marketing" },
          { title: "Motion Designs", value: "Motion Designs" },
          { title: "Product Designs", value: "Product Designs" },
          { title: "Video", value: "video" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
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
      media: "thumbnail",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || "No file name",
        media,
      };
    },
  },
});
