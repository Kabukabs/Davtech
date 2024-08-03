import { z } from 'zod';

export const subSchema = z.object({
  mail: z.string({
    required_error: 'email is required.',
  }),
});

export const ApplySchema = z.object({
  email: z.string({
    required_error: 'email is required.',
  }),
  name: z.string({
    required_error: 'name is required.',
  }),
});
