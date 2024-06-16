import * as z from "zod";

export const createClassroomSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
});

export const joinClassroomSchema = z.object({
  _id: z
    .string({ required_error: "Classroom Id is required" })
    .min(1, "Classroom id is required"),
});
