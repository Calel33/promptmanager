import { supabase } from '../lib/supabase';
import type { Prompt } from '../types';

// Helper function to validate the request
async function validateRequest() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch('/api/validate-request', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Request validation failed');
  }

  return session;
}

export const promptsApi = {
  async create(prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>) {
    // Validate the request server-side
    const session = await validateRequest();

    // Ensure the prompt is being created by the authenticated user
    if (prompt.created_by !== session.user.id) {
      throw new Error('Invalid user ID for prompt creation');
    }

    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .insert([{
        name: prompt.name,
        content: prompt.content,
        tags: prompt.tags || [],
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
  },

  async getById(id: string) {
    // Validate the request server-side
    await validateRequest();

    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Prompt>) {
    // Validate the request server-side
    const session = await validateRequest();

    // First, get the current prompt to verify ownership
    const { data: currentPrompt, error: fetchError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!currentPrompt) throw new Error('Prompt not found');

    // Verify ownership
    if (currentPrompt.created_by !== session.user.id) {
      throw new Error('Not authorized to edit this prompt');
    }

    // Proceed with update
    const { data, error } = await supabase
      .from('prompts')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    // Validate the request server-side
    const session = await validateRequest();

    // First, get the current prompt to verify ownership
    const { data: currentPrompt, error: fetchError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!currentPrompt) throw new Error('Prompt not found');

    // Verify ownership
    if (currentPrompt.created_by !== session.user.id) {
      throw new Error('Not authorized to delete this prompt');
    }

    const { error } = await supabase
      .from('prompts')
      .update({ 
        is_deleted: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  },

  async list(options: { tags?: string[]; search?: string; page?: number; pageSize?: number } = {}) {
    // Validate the request server-side
    const session = await validateRequest();

    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    let query = supabase
      .from('prompts')
      .select('*', { count: 'exact' })
      .eq('is_deleted', false)
      .eq('created_by', session.user.id) // Only fetch user's own prompts
      .order('created_at', { ascending: false })
      .range(start, end);

    if (options.tags?.length) {
      query = query.contains('tags', options.tags);
    }

    if (options.search) {
      query = query.ilike('name', `%${options.search}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;
    
    return {
      data: data || [],
      totalCount: count || 0,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
  }
}; 