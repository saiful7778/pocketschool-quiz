import * as z from "zod";

export const developerSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(30, "Title is too long"),
  category: z.enum(["issue", "bug", "improve", "feature"]),
  message: z
    .string({ required_error: "Message is required" })
    .min(1, "Message is required")
    .max(500, "Message is too long"),
});
