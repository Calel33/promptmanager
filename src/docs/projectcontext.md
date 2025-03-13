Codebase Context File
Project Name: Prompt Manager
Version: 0.1.0
Backend: Supabase
Frontend: Next.js, React, Tailwind CSS

Project Overview
The Prompt Manager is a web application designed to help users create, manage, and organize prompts for AI models. It includes features like prompt versioning, tagging, search, and role-based access control. The backend is powered by Supabase, while the frontend is built with Next.js, React, and Tailwind CSS.

Key Features
Prompt Management:

Create, update, delete, and search prompts.

Version history for prompts.

Tagging for organization.

Authentication:

User sign-up, login, and logout.

Protected routes for authenticated users.

Database:

PostgreSQL database managed by Supabase.

Row-level security (RLS) for data access control.

Frontend:

Responsive UI built with Tailwind CSS.

Forms for creating and editing prompts.

Search and filter functionality.

Project Structure
Root Directory
next-env.d.ts: TypeScript configuration for Next.js.

package.json: Project dependencies and scripts.

postcss.config.js: PostCSS configuration for Tailwind CSS.

tailwind.config.js: Tailwind CSS configuration.

tsconfig.json: TypeScript configuration.

Database
Location: database/

indexes.sql: Database indexes for optimizing queries.

policies.sql: Row-level security (RLS) policies for Supabase.

schema.sql: Database schema for prompts, prompt versions, and teams.

triggers.sql: Database triggers for versioning and timestamps.

Source Code
Location: src/

API
src/api/prompts.ts: API functions for interacting with the prompts table in Supabase.

create, getById, update, delete, list.

Components
src/components/auth/ProtectedRoute.tsx: Protects routes for authenticated users.

src/components/common/LoadingSpinner.tsx: Reusable loading spinner component.

src/components/layout/Layout.tsx: Main layout component with navigation.

src/components/prompts/:

PromptForm.tsx: Form for creating/editing prompts.

PromptList.tsx: Displays a list of prompts with edit/delete options.

PromptSearch.tsx: Search and filter prompts by name and tags.

Contexts
src/contexts/AuthContext.tsx: Manages user authentication state and provides login/signup functionality.

Lib
src/lib/supabase.ts: Initializes the Supabase client.

Pages
src/pages/:

index.tsx: Redirects to the /prompts page.

_app.tsx: Wraps the app with the AuthProvider.

auth/login.tsx: Login and sign-up page.

prompts/index.tsx: Main page for managing prompts.

Styles
src/styles/globals.css: Global styles with Tailwind CSS.

Types
src/types/index.ts: TypeScript interfaces for Prompt, Team, and TeamMember.

Database Schema
Tables
prompts:

id (UUID): Primary key.

name (string): Prompt name.

content (text): Prompt content.

tags (text[]): Array of tags for categorization.

created_by (UUID): User who created the prompt.

created_at (timestamp): Timestamp of creation.

updated_at (timestamp): Timestamp of last update.

version (integer): Current version of the prompt.

is_deleted (boolean): Soft delete flag.

prompt_versions:

id (UUID): Primary key.

prompt_id (UUID): Foreign key to prompts.

content (text): Content of the prompt version.

created_at (timestamp): Timestamp of version creation.

created_by (UUID): User who created the version.

teams:

id (UUID): Primary key.

name (string): Team name.

created_by (UUID): User who created the team.

created_at (timestamp): Timestamp of creation.

team_members:

team_id (UUID): Foreign key to teams.

user_id (UUID): Foreign key to users.

role (enum): Role of the user in the team (admin, editor, viewer).

Authentication
Supabase Auth: Handles user authentication.

Protected Routes: Only authenticated users can access certain pages.

User Roles: Admins, editors, and viewers have different permissions.

Frontend Workflow
User Authentication:

Users sign up or log in via the /auth/login page.

Authentication state is managed by AuthContext.

Prompt Management:

Users can create, edit, delete, and search prompts on the /prompts page.

Prompts are fetched and updated via the promptsApi.

UI Components:

PromptForm: Handles prompt creation and editing.

PromptList: Displays prompts with edit/delete options.

PromptSearch: Allows searching and filtering prompts.

Environment Variables
NEXT_PUBLIC_SUPABASE_URL: Supabase project URL.

NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anonymous API key.

How to Run the Project
Install dependencies:

bash
Copy
npm install  
Set up environment variables:

Create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

Run the development server:

bash
Copy
npm run dev  