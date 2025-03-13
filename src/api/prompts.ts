import { supabase } from '../lib/supabase';
import type { Prompt } from '../types';

export const promptsApi = {
  async create(prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'version' | 'is_deleted'>) {
    const { data, error } = await supabase
      .from('prompts')
      .insert([prompt])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('prompts')
      .select('*, prompt_versions(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Prompt>) {
    const { data, error } = await supabase
      .from('prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('prompts')
      .update({ is_deleted: true })
      .eq('id', id);

    if (error) throw error;
  },

  async list(options: { tags?: string[]; search?: string } = {}) {
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('is_deleted', false);

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