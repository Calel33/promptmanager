import React, { useState, useCallback } from 'react';
import type { Prompt } from '../../types';

interface BulkPromptUploadProps {
  onUpload: (prompts: Array<Partial<Prompt>>) => Promise<void>;
  isLoading?: boolean;
}

const SAMPLE_JSON = `[
  {
    "name": "Example Prompt",
    "content": "Your prompt content here",
    "tags": ["tag1", "tag2"]
  }
]`;

export function BulkPromptUpload({ onUpload, isLoading }: BulkPromptUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Check file type
      if (!file.type.match('application/json')) {
        throw new Error('Please upload a JSON file');
      }

      // Read file
      const text = await file.text();
      const prompts = JSON.parse(text);

      // Basic validation
      if (!Array.isArray(prompts)) {
        throw new Error('File must contain an array of prompts');
      }

      // Validate each prompt has required fields
      prompts.forEach((prompt, index) => {
        if (!prompt.name || !prompt.content) {
          throw new Error(`Prompt at index ${index} is missing required fields (name or content)`);
        }
      });

      await onUpload(prompts);
      event.target.value = ''; // Reset file input
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    }
  }, [onUpload]);

  return (
    <div className="inline-block relative">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <label className="relative cursor-pointer">
          <span className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            {isLoading ? 'Uploading...' : 'Import Prompts'}
          </span>
          <input
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            disabled={isLoading}
            className="hidden"
          />
        </label>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute left-0 bottom-full mb-2 w-96 p-4 bg-gray-900 rounded-md shadow-lg z-50">
            <div className="text-sm text-gray-200">
              <p className="font-medium mb-2">Expected JSON Format:</p>
              <pre className="bg-gray-800 p-2 rounded-md overflow-x-auto">
                <code className="text-xs text-gray-200">{SAMPLE_JSON}</code>
              </pre>
              <ul className="mt-2 list-disc list-inside text-xs">
                <li>File must be JSON format</li>
                <li>Must contain an array of prompts</li>
                <li>Each prompt requires name and content</li>
                <li>Tags are optional</li>
              </ul>
            </div>
            {/* Arrow */}
            <div className="absolute bottom-[-6px] left-6 transform rotate-45 w-3 h-3 bg-gray-900"></div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="absolute mt-2 w-64 text-sm text-red-400 bg-red-900/50 rounded-md p-2">
          {error}
        </div>
      )}
    </div>
  );
} 