import React from 'react';
import { promptsApi } from '../../api/prompts';
import { Layout } from '../../components/layout/Layout';
import { PromptForm } from '../../components/prompts/PromptForm';
import { PromptList } from '../../components/prompts/PromptList';
import { PromptSearch } from '../../components/prompts/PromptSearch';
import { BulkPromptUpload } from '../../components/prompts/BulkPromptUpload';
import { useAuth } from '../../contexts/AuthContext';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import type { Prompt } from '../../types';

export default function PromptsPage() {
  const { user } = useAuth();
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = React.useState(false);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Add pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);

  // Get unique tags from all prompts
  const uniqueTags = React.useMemo(() => {
    const tags = prompts.flatMap(prompt => prompt.tags);
    return Array.from(new Set(tags));
  }, [prompts]);

  // Make application state readable by CopilotKit
  useCopilotReadable({
    description: "Current state of the Prompt Manager application",
    value: {
      prompts: {
        items: prompts,
        total: totalCount,
        currentPage,
        totalPages,
        pageSize,
        uniqueTags,
        selectedTag
      },
      user: {
        id: user?.id,
        email: user?.email,
        isAuthenticated: !!user
      },
      ui: {
        isLoading,
        error: error || undefined,
        showCreateForm,
        showTagsDropdown
      }
    }
  });

  // Define AI actions for prompt management
  useCopilotAction({
    name: "search-prompts",
    description: "Search for prompts by name or content",
    parameters: [
      {
        name: "searchTerm",
        type: "string",
        description: "The text to search for in prompt names and content"
      },
      {
        name: "tags",
        type: "string[]",
        description: "Optional array of tags to filter by"
      }
    ],
    handler: async ({ searchTerm, tags }) => {
      await loadPrompts(searchTerm, Array.isArray(tags) ? tags : []);
      return { success: true, message: "Search completed" };
    }
  });

  useCopilotAction({
    name: "create-prompt",
    description: "Create a new prompt",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "Name of the prompt"
      },
      {
        name: "content",
        type: "string",
        description: "Content of the prompt"
      },
      {
        name: "tags",
        type: "string[]",
        description: "Array of tags for the prompt"
      }
    ],
    handler: async ({ name, content, tags }) => {
      await handleSubmit({ 
        name: String(name), 
        content: String(content), 
        tags: Array.isArray(tags) ? tags : [] 
      });
      return { success: true, message: "Prompt created successfully" };
    }
  });

  useCopilotAction({
    name: "delete-prompt",
    description: "Delete a prompt by ID",
    parameters: [
      {
        name: "promptId",
        type: "string",
        description: "ID of the prompt to delete"
      }
    ],
    handler: async ({ promptId }) => {
      await handleDelete(String(promptId));
      return { success: true, message: "Prompt deleted successfully" };
    }
  });

  useCopilotAction({
    name: "change-page",
    description: "Navigate to a different page of prompts",
    parameters: [
      {
        name: "pageNumber",
        type: "number",
        description: "Page number to navigate to"
      }
    ],
    handler: async ({ pageNumber }) => {
      await handlePageChange(Number(pageNumber));
      return { success: true, message: `Navigated to page ${pageNumber}` };
    }
  });

  useCopilotAction({
    name: "filter-by-tag",
    description: "Filter prompts by a specific tag",
    parameters: [
      {
        name: "tag",
        type: "string",
        description: "Tag to filter by, or null to show all prompts"
      }
    ],
    handler: async ({ tag }) => {
      setSelectedTag(tag || null);
      setShowTagsDropdown(false);
      return { success: true, message: tag ? `Filtered by tag: ${tag}` : "Showing all prompts" };
    }
  });

  const loadPrompts = async (search?: string, tags?: string[], page = currentPage) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await promptsApi.list({ search, tags, page, pageSize });
      setPrompts(result.data);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prompts');
      setPrompts([]);
      setTotalCount(0);
      setTotalPages(1);
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
  }, []); // Only load on mount

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
        try {
          await promptsApi.create(promptData);
        } catch (createError) {
          console.error('Prompt creation error:', createError);
          if (createError instanceof Error) {
            if (createError.message.includes('Not authenticated')) {
              throw new Error('Your session has expired. Please log in again.');
            } else if (createError.message.includes('Invalid user ID')) {
              throw new Error('There was an issue with your user session. Please try logging out and back in.');
            }
            throw createError;
          }
          throw new Error('An unexpected error occurred while saving the prompt');
        }
      }
      
      await loadPrompts();
      setShowCreateForm(false);
    } catch (err) {
      console.error('Form submission error:', err);
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

  const handlePageChange = async (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && !isLoading) {
      try {
        await loadPrompts(undefined, undefined, newPage);
        // Scroll after data is loaded
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
      } catch (error) {
        console.error('Error changing page:', error);
      }
    }
  };

  const handleBulkUpload = async (prompts: Array<Partial<Prompt>>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error('You must be logged in to create prompts');
      }

      const promptsData = prompts.map(prompt => ({
        name: prompt.name!,
        content: prompt.content!,
        tags: prompt.tags || [],
        created_by: user.id
      }));

      const result = await promptsApi.createBulk(promptsData);
      await loadPrompts();
      
      // Show success message
      alert(`Successfully imported ${result.count} prompts`);
    } catch (err) {
      console.error('Bulk upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload prompts');
    } finally {
      setIsLoading(false);
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
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <BulkPromptUpload
                  onUpload={handleBulkUpload}
                  isLoading={isLoading}
                />
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white w-full sm:w-auto"
                >
                  + Create New Prompt
                </button>
              </div>
            </div>
          </div>

          <div className="py-4 prompts-content">
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
                onSearch={async (search, tags) => await loadPrompts(search, tags)}
                onResetPage={() => setCurrentPage(1)}
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

            {/* Add pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1 || isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1C2333] rounded-md disabled:opacity-50 hover:bg-[#2C3444] transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Page</span>
                  <span className="px-3 py-1 text-sm text-white bg-[#1C2333] rounded-md">
                    {currentPage} of {totalPages}
                  </span>
                  <span className="text-sm text-gray-400">({totalCount} total)</span>
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1C2333] rounded-md disabled:opacity-50 hover:bg-[#2C3444] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
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