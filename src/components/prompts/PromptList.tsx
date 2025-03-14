import React from 'react';
import { Prompt } from '../../types';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { PromptForm } from './PromptForm';

interface PromptListProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (promptId: string) => Promise<void>;
  isLoading?: boolean;
  onSubmit: (data: Partial<Prompt>) => Promise<void>;
}

export const PromptList: React.FC<PromptListProps> = ({ prompts, onEdit, onDelete, isLoading, onSubmit }) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No prompts found. Create your first prompt above!
      </div>
    );
  }

  const handleEdit = (prompt: Prompt) => {
    if (editingId === prompt.id) {
      setEditingId(null);
    } else {
      setEditingId(prompt.id);
      onEdit(prompt);
    }
  };

  const handleSubmit = async (data: Partial<Prompt>) => {
    await onSubmit({
      ...data,
      id: editingId // Include the ID when editing
    });
    setEditingId(null);
  };

  const handleCopy = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {prompts.map((prompt) => (
        <div 
          key={prompt.id}
          className="bg-[#1C2333]/30 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col h-fit"
        >
          {editingId === prompt.id ? (
            <div className="p-4 flex flex-col">
              <PromptForm
                initialData={prompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setEditingId(null)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-2">{prompt.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{prompt.content}</p>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#6366F1]/20 text-indigo-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end items-center gap-3 pt-4 mt-4 border-t border-gray-700/50">
                <button
                  onClick={() => handleCopy(prompt)}
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                  title="Copy prompt"
                >
                  {copiedId === prompt.id ? (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs">Copied!</span>
                    </>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => handleEdit(prompt)}
                  className="text-[#6366F1] hover:text-indigo-300 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(prompt.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 