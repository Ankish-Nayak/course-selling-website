import z from 'zod';

export const adminTypes = z.object({
    username: z.string().min(1),
    password: z.string().min(6)
});

export const userTypes = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
});


export const courseTypes = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(1),
    imageLink: z.string().min(1),
    published: z.boolean()
});

export type adminParams = z.infer<typeof adminTypes>
export type userParams = z.infer<typeof userTypes>
export type courseParams = z.infer<typeof courseTypes>