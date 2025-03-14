import React from 'react';

interface PromptSearchProps {
  onSearch: (search: string) => void;
  onTagFilter: (tags: string[]) => void;
  isLoading?: boolean;
}

export const PromptSearch: React.FC<PromptSearchProps> = ({ onSearch, onTagFilter, isLoading }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [tags, setTags] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    onTagFilter(tags.split(',').map(tag => tag.trim()).filter(Boolean));
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 bg-[#1F1F1F] text-white placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-700/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500 px-4 py-3"
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full rounded-md border-0 bg-[#1F1F1F] text-white placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-700/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500 px-4 py-3"
            disabled={isLoading}
          />
        </div>
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
    </form>
  );
}; 