import React from 'react';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

interface PromptSearchProps {
  onSearch: (search: string, tags: string[]) => void;
  onResetPage?: () => void;
  isLoading?: boolean;
}

export const PromptSearch: React.FC<PromptSearchProps> = ({ onSearch, onResetPage, isLoading }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [tags, setTags] = React.useState('');

  // Function to perform the clearing logic
  const performClearSearch = () => {
    setSearchTerm('');
    setTags('');
    onResetPage?.(); // Reset pagination state if available
    onSearch('', []); // Trigger search with empty values
  };

  // Make search state readable by CopilotKit
  useCopilotReadable({
    description: "Current state of prompt search and filters",
    value: {
      search: {
        term: searchTerm,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        isLoading
      }
    }
  });

  // Define search actions for the AI
  useCopilotAction({
    name: "set-search-term",
    description: "Set the search term for prompts",
    parameters: [
      {
        name: "term",
        type: "string",
        description: "Search term to look for in prompts"
      }
    ],
    handler: async ({ term }) => {
      setSearchTerm(String(term));
      onResetPage?.();
      onSearch(String(term), tags.split(',').map(tag => tag.trim()).filter(Boolean));
      return { success: true, message: `Set search term to: ${term}` };
    }
  });

  useCopilotAction({
    name: "set-tag-filters",
    description: "Set tag filters for prompts",
    parameters: [
      {
        name: "tagList",
        type: "string",
        description: "Comma-separated list of tags to filter by"
      }
    ],
    handler: async ({ tagList }) => {
      const newTags = String(tagList);
      setTags(newTags);
      onResetPage?.();
      onSearch(searchTerm, newTags.split(',').map(tag => tag.trim()).filter(Boolean));
      return { success: true, message: `Set tag filters to: ${tagList}` };
    }
  });

  useCopilotAction({
    name: "clear-search",
    description: "Clear all search filters",
    parameters: [],
    handler: async () => {
      performClearSearch(); // Reuse the clearing logic
      return { success: true, message: "Cleared all search filters" };
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onResetPage?.();
    const processedTags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    onSearch(searchTerm, processedTags);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="prompt-search" className="sr-only">Search prompts</label>
          <input
            id="prompt-search"
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 bg-[#1F1F1F] text-white placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-700/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500 px-4 py-3"
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="prompt-tags" className="sr-only">Filter by tags</label>
          <input
            id="prompt-tags"
            type="text"
            placeholder="Filter by tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full rounded-md border-0 bg-[#1F1F1F] text-white placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-700/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500 px-4 py-3"
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-2">
          {/* Clear Button */}
          <button
            type="button" // Use type="button" to prevent form submission
            onClick={performClearSearch}
            className="w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-md bg-[#1F1F1F] text-gray-300 hover:bg-[#2C3444] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
            disabled={isLoading}
            aria-label="Clear search filters"
          >
            Clear
          </button>
          {/* Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-[#6366F1] text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching...</span>
              </div>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}; 