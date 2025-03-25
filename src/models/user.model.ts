import { z } from "zod";

export const userScheme = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must have a maximum of 20 characters" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must have a maximum of 20 characters" }),
  role: z.enum(["Admin", "User"], {
    errorMap: () => ({ message: "Role must be either 'Admin' or 'User'" }),
  }),
  active: z.boolean({
    required_error: "Active is required",
    invalid_type_error: "Active must be a boolean",
  }),
});

export type UserModel = z.infer<typeof userScheme>;
