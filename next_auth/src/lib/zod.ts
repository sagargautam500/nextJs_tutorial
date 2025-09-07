import {z} from "zod";

// Validation schema
export const signInSchema = z.object({
  email: z.string().refine((val) => !!val, { message: "Email is required" }).email("Enter a valid email"),
  password: z.string().refine((val) => !!val, { message: "Password is required" }).min(6, "Password must be at least 6 characters"),
})