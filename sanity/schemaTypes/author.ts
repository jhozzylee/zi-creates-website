import { defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "role", title: "Role / Title", type: "string" },
    { name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] },
    {
      name: "social",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
