import React from 'react';
import { Prompt } from '../../types';

interface PromptFormProps {
  initialData?: Partial<Prompt>;
  onSubmit: (data: Partial<Prompt>) => Promise<void>;
  isLoading?: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState({
    id: initialData?.id || undefined,
    name: initialData?.name || '',
    content: initialData?.content || '',
    tags: initialData?.tags || [],
  });
  const [currentTag, setCurrentTag] = React.useState('');

  // Reset form when initialData changes (e.g., when switching between create/edit modes)
  React.useEffect(() => {
    setFormData({
      id: initialData?.id || undefined,
      name: initialData?.name || '',
      content: initialData?.content || '',
      tags: initialData?.tags || [],
    });
    setCurrentTag('');
  }, [initialData]);

  const resetForm = () => {
    setFormData({
      id: undefined,
      name: '',
      content: '',
      tags: [],
    });
    setCurrentTag('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Only reset if we're not in edit mode (initialData is undefined)
      if (!initialData) {
        resetForm();
      }
    } catch (error) {
      // If there's an error, we keep the form data to allow the user to fix it
      console.error('Error submitting form:', error);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedTag = currentTag.trim();
      if (trimmedTag && !formData.tags.includes(trimmedTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, trimmedTag]
        }));
        setCurrentTag('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-0 bg-[#1F1F1F] text-white placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-700/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500 px-4 py-3"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-0 bg-[#1F1F1F] text-white placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-700/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500 px-4 py-3"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Tags (press Enter to add)
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="mt-1 block w-full rounded-md border-0 bg-[#1F1F1F] text-white placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-700/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500 px-4 py-3"
              placeholder="Type tag and press Enter to add"
              disabled={isLoading}
            />
            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#6366F1]/20 text-indigo-200 group"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-indigo-200 hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isLoading}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#6366F1] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save Prompt'
          )}
        </button>
      </div>
    </form>
  );
}; 