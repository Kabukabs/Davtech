import { z } from "zod";

export const subSchema = z.object({
    mail: z.string({
        required_error: "email is required.",
    })
})