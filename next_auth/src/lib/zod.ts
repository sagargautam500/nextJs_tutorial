import {z} from "zod";

// Validation schema
export const signInSchema = z.object({
  email: z.string().refine((val) => !!val, { message: "Email is required" }).email("Enter a valid email"),
  password: z.string().refine((val) => !!val, { message: "Password is required" }).min(6, "Password must be at least 6 characters"),
})


export const signUpSchema = z
  .object({
    name: z.string().nonempty("Name is required").min(2, "Name must be at least 2 characters"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    phone: z.string().nonempty("Phone is required").regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    role: z.enum(["user", "admin"]).refine((val) => !!val, { message: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });