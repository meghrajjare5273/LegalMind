import { z } from "zod";

export const emailOnlySchema = z.object({
  email: z.string().trim().email().max(200),
});

export const emailPasswordSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Use at least one letter and one number."
    ),
});

export type EmailOnlyInput = z.infer<typeof emailOnlySchema>;
export type EmailPasswordInput = z.infer<typeof emailPasswordSchema>;
