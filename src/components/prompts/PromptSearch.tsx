import React from 'react';

interface PromptSearchProps {
  onSearch: (search: string) => void;
  onTagFilter: (tags: string[]) => void;
}

export const PromptSearch: React.FC<PromptSearchProps> = ({ onSearch, onTagFilter }) => {
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
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}; 