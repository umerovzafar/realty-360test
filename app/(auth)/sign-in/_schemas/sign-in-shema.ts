import { z } from "zod";

export const signInSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
});
