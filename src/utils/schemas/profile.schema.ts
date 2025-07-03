import { z } from 'zod';

export const editProfileSchema = z.object({
    fullName: z
        .string()
        .min(4, 'Full name must be at least 4 character long')
        .nonempty('Full name is required'),
    username: z
        .string()
        .min(4, 'Username must be at least 4 characters long')
        .max(12, 'Username must be at most 12 characters long')
        .nonempty('Username is required'),
    bio: z
        .string()
        .min(4, 'Bio must be at least 4 character long')
        .max(100, 'Bio must be at most 200 characters long'),
});

export type EditProfileSchemaDTO = z.infer<typeof editProfileSchema>;
