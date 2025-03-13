import React from 'react';
import { promptsApi } from '../../api/prompts';
import { Layout } from '../../components/layout/Layout';
import { PromptForm } from '../../components/prompts/PromptForm';
import { PromptList } from '../../components/prompts/PromptList';
import { PromptSearch } from '../../components/prompts/PromptSearch';
import { useAuth } from '../../contexts/AuthContext';
import type { Prompt } from '../../types';

export default function PromptsPage() {
  const { user } = useAuth();
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [editingPrompt, setEditingPrompt] = React.useState<Prompt | null>(null);

  const loadPrompts = async (search?: string, tags?: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await promptsApi.list({ search, tags });
      setPrompts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prompts');
      setPrompts([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadPrompts();
  }, []);

  const handleSubmit = async (data: Partial<Prompt>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!data.name || !data.content) {
        throw new Error('Name and content are required');
      }
      
      if (!user) {
        throw new Error('You must be logged in to create or edit prompts');
      }

      const promptData = {
        name: data.name,
        content: data.content,
        tags: data.tags || [],
        created_by: user.id
      };

      if (editingPrompt) {
        await promptsApi.update(editingPrompt.id, data);
      } else {
        await promptsApi.create(promptData);
      }
      await loadPrompts();
      setEditingPrompt(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save prompt');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (promptId: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      setIsLoading(true);
      setError(null);
      try {
        await promptsApi.delete(promptId);
        await loadPrompts();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete prompt');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {editingPrompt ? 'Edit Prompt' : 'Create New Prompt'}
              </h2>
              <div className="mt-5">
                <PromptForm
                  initialData={editingPrompt || undefined}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-gray-900">Search Prompts</h2>
              <div className="mt-5">
                <PromptSearch
                  onSearch={(search) => loadPrompts(search)}
                  onTagFilter={(tags) => loadPrompts(undefined, tags)}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-gray-900">Your Prompts</h2>
              <div className="mt-5">
                <PromptList
                  prompts={prompts}
                  onEdit={setEditingPrompt}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 