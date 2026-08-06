import {z} from 'zod';
export const CHAT_MODELS = ['gpt-4o-mini', 'gpt-4o'] as const;
export const createWorkspaceSchema = z.object({
    title: z.string().min(1, {message: 'Title is required'}).max(100, {message: 'Title must be less than 100 characters'}),
    description: z.string().max(500, {message: 'Description must be less than 500 characters'}).optional(),
    icon: z.string().trim().max(12, {message: 'Icon must be less than 12 characters'}).optional(),
    defaultModel:z.enum(CHAT_MODELS, {message: 'Invalid model selected'}).optional(),
});

export const updateWorkspaceSchema = createWorkspaceSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;

export const workspaceIdParamSchema = z.object({
    workspaceId: z.string().trim().min(1, {message: 'Workspace ID is required'})
    // .max(36, {message: 'Workspace ID must be less than 36 characters'})
    
});