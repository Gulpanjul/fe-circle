import { z } from 'zod';

export const createThreadSchema = z.object({
    content: z.string().max(280),
    images: z.instanceof(FileList),
});

export type createThreadSchemaDTO = z.infer<typeof createThreadSchema>;
