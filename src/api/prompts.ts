import { supabase } from '../lib/supabase';
import type { Prompt } from '../types';
import { createPromptSchema, updatePromptSchema, listOptionsSchema, idSchema, bulkPromptSchema } from '../lib/validation';
import { ZodError } from 'zod';

// Helper function to get the current session
async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    throw new Error('Not authenticated');
  }
  return session;
}

export const promptsApi = {
  async create(prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>) {
    try {
      // Validate input
      const validatedPrompt = createPromptSchema.parse(prompt);
      
      // Get current session
      const session = await getCurrentSession();

      const { data: promptData, error: promptError } = await supabase
        .from('prompts')
        .insert([{
          ...validatedPrompt,
          created_by: session.user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_deleted: false
        }])
        .select()
        .single();

      if (promptError) {
        console.error('Error creating prompt:', promptError);
        throw promptError;
      }
      
      return promptData;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  },

  async createBulk(prompts: Array<Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>>) {
    try {
      // Validate input
      const validatedPrompts = bulkPromptSchema.parse(prompts);
      
      // Get current session
      const session = await getCurrentSession();

      // Prepare prompts with metadata
      const promptsToCreate = validatedPrompts.map(prompt => ({
        ...prompt,
        created_by: session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false
      }));

      // Use Supabase's bulk insert
      const { data: promptData, error: promptError } = await supabase
        .from('prompts')
        .insert(promptsToCreate)
        .select();

      if (promptError) {
        console.error('Error creating prompts:', promptError);
        throw promptError;
      }
      
      return {
        success: true,
        data: promptData,
        count: promptData?.length || 0
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  },

  async getById(id: string) {
    try {
      // Validate ID format
      const validatedId = idSchema.parse(id);
      
      // Get current session
      const session = await getCurrentSession();

      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', validatedId)
        .eq('created_by', session.user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Prompt not found or access denied');
        }
        throw error;
      }
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Invalid ID format: ${error.errors[0].message}`);
      }
      throw error;
    }
  },

  async update(id: string, updates: Partial<Prompt>) {
    try {
      // Validate ID and updates
      const validatedId = idSchema.parse(id);
      const validatedUpdates = updatePromptSchema.parse(updates);
      
      // Get current session
      const session = await getCurrentSession();

      // First, verify ownership
      const { data: currentPrompt, error: fetchError } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', validatedId)
        .eq('created_by', session.user.id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          throw new Error('Prompt not found or access denied');
        }
        throw fetchError;
      }

      // Proceed with update
      const { data, error } = await supabase
        .from('prompts')
        .update({
          ...validatedUpdates,
          updated_at: new Date().toISOString()
        })
        .eq('id', validatedId)
        .eq('created_by', session.user.id) // Double-check ownership
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  },

  async delete(id: string) {
    try {
      // Validate ID
      const validatedId = idSchema.parse(id);
      
      // Get current session
      const session = await getCurrentSession();

      // Soft delete with ownership check
      const { error } = await supabase
        .from('prompts')
        .update({ 
          is_deleted: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', validatedId)
        .eq('created_by', session.user.id);

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Prompt not found or access denied');
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Invalid ID format: ${error.errors[0].message}`);
      }
      throw error;
    }
  },

  async list(options: { tags?: string[]; search?: string; page?: number; pageSize?: number } = {}) {
    try {
      // Validate options
      const validatedOptions = listOptionsSchema.parse(options);
      
      // Get current session
      const session = await getCurrentSession();

      const page = validatedOptions.page || 1;
      const pageSize = validatedOptions.pageSize || 10;

      // First, get the total count
      let countQuery = supabase
        .from('prompts')
        .select('id', { count: 'exact' })
        .eq('is_deleted', false)
        .eq('created_by', session.user.id);

      if (validatedOptions.tags?.length) {
        countQuery = countQuery.contains('tags', validatedOptions.tags);
      }

      if (validatedOptions.search) {
        countQuery = countQuery.ilike('name', `%${validatedOptions.search}%`);
      }

      const { count, error: countError } = await countQuery;
      if (countError) throw countError;

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / pageSize);
      
      // Adjust page number if it exceeds total pages
      const adjustedPage = Math.min(Math.max(1, page), Math.max(1, totalPages));
      const start = (adjustedPage - 1) * pageSize;
      const end = Math.min(start + pageSize - 1, totalCount - 1);

      // If there's no data, return empty result
      if (totalCount === 0) {
        return {
          data: [],
          totalCount: 0,
          currentPage: 1,
          pageSize,
          totalPages: 0
        };
      }

      let query = supabase
        .from('prompts')
        .select('*')
        .eq('is_deleted', false)
        .eq('created_by', session.user.id)
        .order('created_at', { ascending: false })
        .range(start, end);

      if (validatedOptions.tags?.length) {
        query = query.contains('tags', validatedOptions.tags);
      }

      if (validatedOptions.search) {
        query = query.ilike('name', `%${validatedOptions.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return {
        data: data || [],
        totalCount,
        currentPage: adjustedPage,
        pageSize,
        totalPages
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  }
}; 