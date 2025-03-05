import { z } from "zod";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required", invalid_type_error: "Username must be a string" }).min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
});

export default loginSchema;
