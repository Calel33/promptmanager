import { z } from 'zod';

// Base prompt schema for shared validation rules
const basePromptSchema = {
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less')
    .trim(),
  content: z.string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be 10000 characters or less')
    .trim(),
  tags: z.array(z.string().max(50)).max(10, 'Maximum 10 tags allowed').optional(),
};

// Schema for creating a new prompt
export const createPromptSchema = z.object({
  ...basePromptSchema,
});

// Schema for bulk prompt creation
export const bulkPromptSchema = z.array(createPromptSchema)
  .min(1, 'At least one prompt is required')
  .max(50, 'Maximum 50 prompts can be created at once');

// Schema for updating an existing prompt
export const updatePromptSchema = z.object({
  ...basePromptSchema,
}).partial(); // Makes all fields optional for updates

// Schema for list/search options
export const listOptionsSchema = z.object({
  tags: z.array(z.string().max(50)).max(10).optional(),
  search: z.string().max(100).trim().optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().min(1).max(100).optional(), // Limit max page size to prevent DoS
});

// Schema for ID validation
export const idSchema = z.string().uuid('Invalid ID format'); 