import * as z from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string({ required_error: "Full name is required" })
      .min(1, "Full name is required"),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is invalid" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password not bigger than 10 characters"),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
    classroomId: z.string().optional(),
    adminAccess: z.boolean().default(false).optional(),
    access: z.boolean().default(true),
    role: z.enum(["user", "admin", "superAdmin"]).default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password not bigger than 10 characters"),
});
