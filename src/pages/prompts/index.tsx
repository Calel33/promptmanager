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
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = React.useState(false);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Get unique tags from all prompts
  const uniqueTags = React.useMemo(() => {
    const tags = prompts.flatMap(prompt => prompt.tags);
    return Array.from(new Set(tags));
  }, [prompts]);

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

  // Filter prompts by selected tag
  const filteredPrompts = React.useMemo(() => {
    if (!selectedTag) return prompts;
    return prompts.filter(prompt => prompt.tags.includes(selectedTag));
  }, [prompts, selectedTag]);

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

      if (data.id) {
        await promptsApi.update(data.id, {
          name: data.name,
          content: data.content,
          tags: data.tags || []
        });
      } else {
        await promptsApi.create(promptData);
      }
      
      await loadPrompts();
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
      <div className="flex-1 min-h-[calc(100vh-4rem)] bg-[#0B0E14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full border-b border-gray-800/50">
            <div className="py-4 flex justify-between items-center">
              <div className="relative">
                <button
                  onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                  className="flex items-center gap-2 text-2xl font-bold text-white hover:text-gray-200 transition-colors"
                >
                  <span>{selectedTag || 'All Prompts'}</span>
                  <svg className={`h-4 w-4 text-gray-400 transition-transform ${showTagsDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showTagsDropdown && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md bg-[#1C2333] shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="tags-menu">
                      <button
                        onClick={() => {
                          setSelectedTag(null);
                          setShowTagsDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-[#6366F1]/10"
                        role="menuitem"
                      >
                        All Prompts
                      </button>
                      {uniqueTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedTag(tag);
                            setShowTagsDropdown(false);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-[#6366F1]/10"
                          role="menuitem"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                + Create New Prompt
              </button>
            </div>
          </div>

          <div className="py-4">
            {error && (
              <div className="rounded-md bg-red-900 bg-opacity-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-300">Error</h3>
                    <div className="mt-2 text-sm text-red-200">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <PromptSearch
                onSearch={(search) => loadPrompts(search)}
                onTagFilter={(tags) => loadPrompts(undefined, tags)}
                isLoading={isLoading}
              />
            </div>

            <div>
              <PromptList
                prompts={filteredPrompts}
                onEdit={() => {}}
                onDelete={handleDelete}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm z-50">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-[#1C2333] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <PromptForm
                    onSubmit={async (data) => {
                      await handleSubmit(data);
                      setShowCreateForm(false);
                    }}
                    isLoading={isLoading}
                  />
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-[#0B0E14] px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-800 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 