import * as z from "zod";

export const updateUserSchema = z.object({
  access: z.boolean(),
  role: z.enum(["user", "admin", "superAdmin"]),
});
