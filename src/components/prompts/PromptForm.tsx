import React from 'react';
import { Prompt } from '../../types';

interface PromptFormProps {
  initialData?: Partial<Prompt>;
  onSubmit: (data: Partial<Prompt>) => Promise<void>;
  isLoading?: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    content: initialData?.content || '',
    tags: initialData?.tags || [],
  });

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await onSubmit(formData);
    }}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags.join(', ')}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Prompt'}
        </button>
      </div>
    </form>
  );
}; 