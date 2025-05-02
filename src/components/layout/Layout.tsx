import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { CopilotPopup } from "@copilotkit/react-ui";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { signOut } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <nav className="bg-[#0B0E14] border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-[#6366F1]">Prompt Manager</h1>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={signOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[#6366F1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {children}

        <CopilotPopup
          instructions="You are a helpful AI assistant for the Prompt Manager application. Help users manage their prompts, understand the application features, and provide guidance on best practices for prompt engineering."
          labels={{
            title: "Prompt Manager Assistant",
            initial: "👋 Hi! I'm your Prompt Manager assistant. I can help you:\n\n- Create and manage prompts\n- Use prompt templates effectively\n- Understand best practices\n- Navigate the application\n\nHow can I assist you today?"
          }}
        />
      </div>
    </ProtectedRoute>
  );
}; 