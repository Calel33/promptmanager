import React from 'react';
import { promptsApi } from '../../api/prompts';
import { Layout } from '../../components/layout/Layout';
import { PromptForm } from '../../components/prompts/PromptForm';
import { PromptList } from '../../components/prompts/PromptList';
import { PromptSearch } from '../../components/prompts/PromptSearch';
import type { Prompt } from '../../types';

export default function PromptsPage() {
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editingPrompt, setEditingPrompt] = React.useState<Prompt | null>(null);

  const loadPrompts = async (search?: string, tags?: string[]) => {
    const data = await promptsApi.list({ search, tags });
    setPrompts(data);
  };

  React.useEffect(() => {
    loadPrompts();
  }, []);

  const handleSubmit = async (data: Partial<Prompt>) => {
    setIsLoading(true);
    try {
      if (editingPrompt) {
        await promptsApi.update(editingPrompt.id, data);
      } else {
        await promptsApi.create(data);
      }
      await loadPrompts();
      setEditingPrompt(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (promptId: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      await promptsApi.delete(promptId);
      await loadPrompts();
    }
  };

  return (
    <Layout>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 