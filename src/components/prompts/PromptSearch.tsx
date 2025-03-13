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
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
}; 