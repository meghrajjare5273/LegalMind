import { z } from "zod";

export const emailOnlySchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(200),
});

export const emailPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(200),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number"
    ),
});

export const signUpSchema = emailPasswordSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
});

export type EmailOnlyInput = z.infer<typeof emailOnlySchema>;
export type EmailPasswordInput = z.infer<typeof emailPasswordSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
