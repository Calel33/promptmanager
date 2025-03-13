import React from 'react';
import { Prompt } from '../../types';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface PromptListProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (promptId: string) => Promise<void>;
  isLoading?: boolean;
}

export const PromptList: React.FC<PromptListProps> = ({ prompts, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No prompts found. Create your first prompt above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <div 
          key={prompt.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{prompt.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{prompt.content}</p>
              <div className="mt-2 flex gap-2">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(prompt)}
                className="text-sm text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(prompt.id)}
                className="text-sm text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 