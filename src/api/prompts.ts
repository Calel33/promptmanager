import { supabase } from '../lib/supabase';
import type { Prompt } from '../types';

export const promptsApi = {
  async create(prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>) {
    // Get current user's session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

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
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Prompt>) {
    // First, get the current prompt to verify ownership
    const { data: currentPrompt, error: fetchError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!currentPrompt) throw new Error('Prompt not found');

    // Get current user's session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

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
    // First, get the current prompt to verify ownership
    const { data: currentPrompt, error: fetchError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!currentPrompt) throw new Error('Prompt not found');

    // Get current user's session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

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

  async list(options: { tags?: string[]; search?: string } = {}) {
    // Get current user's session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    let query = supabase
      .from('prompts')
      .select('*')
      .eq('is_deleted', false)
      .eq('created_by', session.user.id); // Only fetch user's own prompts

    if (options.tags?.length) {
      query = query.contains('tags', options.tags);
    }

    if (options.search) {
      query = query.ilike('name', `%${options.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
}; 