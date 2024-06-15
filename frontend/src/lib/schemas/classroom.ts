import * as z from "zod";

export const createClassroomSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
});
