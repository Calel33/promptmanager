# Prompt Manager - Project Context Document

## Project Overview
A tool designed to help developers and teams manage, version, and organize prompts for AI models. Built with Next.js, Supabase, and TypeScript.

## Current Environment
env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
## Project Structure
src/
├── pages/
│ ├── app.tsx (with AuthProvider)
│ ├── index.tsx (redirects to /prompts)
│ ├── auth/
│ │ └── login.tsx (email/password auth)
│ └── prompts/
│ └── index.tsx (main prompts page)
├── components/
│ ├── layout/
│ │ └── Layout.tsx
│ ├── auth/
│ │ └── ProtectedRoute.tsx
│ ├── common/
│ │ └── LoadingSpinner.tsx
│ └── prompts/
│ ├── PromptForm.tsx
│ ├── PromptList.tsx
│ └── PromptSearch.tsx
├── contexts/
│ └── AuthContext.tsx
├── lib/
│ └── supabase.ts
├── types/
│ └── index.ts
└── styles/
└── globals.css

## Database Schema

### Tables
1. **prompts**
   ```sql
   CREATE TABLE prompts (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     name VARCHAR NOT NULL,
     content TEXT NOT NULL,
     tags TEXT[],
     created_by UUID REFERENCES auth.users(id),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
     version INTEGER DEFAULT 1,
     is_deleted BOOLEAN DEFAULT FALSE
   );
   ```

2. **prompt_versions**
   ```sql
   CREATE TABLE prompt_versions (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     prompt_id UUID REFERENCES prompts(id),
     content TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
     created_by UUID REFERENCES auth.users(id)
   );
   ```

### Security Policies
- Row Level Security (RLS) enabled on all tables
- Users can only access their own prompts
- Version history accessible to prompt owners

### Database Features
- Automatic versioning via triggers
- Updated timestamp maintenance
- Indexed fields for performance
- GIN index for tag searching

## Authentication
- Email/password authentication implemented
- Protected routes using AuthContext
- Sign up and sign in flows complete
- Session management handled by Supabase

## Components

### Auth Components
typescript
// AuthContext.tsx
interface AuthContextType {
user: User | null;
loading: boolean;
signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
signOut: () => Promise<void>;
}

### UI Components
1. **PromptForm**: Creates and edits prompts
2. **PromptList**: Displays user's prompts
3. **PromptSearch**: Searches and filters prompts
4. **Layout**: Main application layout with navigation
5. **LoadingSpinner**: Loading state indicator

## Implementation Status

### Completed ✅
1. Project setup and structure
2. Database schema and policies
3. Basic authentication
4. Core component structure
5. Protected routing

### In Progress 🚧
1. Testing database setup
2. Implementing CRUD operations
3. UI component development

### Pending 📋
1. Error handling
2. Form validation
3. Loading states
4. Version history viewer
5. Search functionality
6. Tag filtering

## Next Steps

### Immediate Tasks
1. Test database setup and policies
2. Implement prompt CRUD operations
3. Complete UI components
4. Add error handling

### Future Enhancements
1. Password reset functionality
2. Email verification
3. Batch operations
4. Advanced search features

## Dependencies

{
"dependencies": {
"@supabase/supabase-js": "^2.39.0",
"next": "^14.0.0",
"react": "^18.2.0",
"react-dom": "^18.2.0"
},
"devDependencies": {
"@types/node": "^20.0.0",
"@types/react": "^18.2.0",
"@types/react-dom": "^18.2.0",
"autoprefixer": "^10.4.0",
"postcss": "^8.4.0",
"tailwindcss": "^3.3.0",
"typescript": "^5.0.0"
}
}

## Development Notes
- All database operations should use RLS policies
- UI components use Tailwind CSS for styling
- TypeScript strict mode enabled
- Next.js handles routing and SSR

## Known Issues
1. Need to implement proper error handling
2. Form validation needs improvement
3. Loading states not fully implemented
4. Version history viewer pending

## Testing Requirements
1. Authentication flows
2. CRUD operations
3. Security policies
4. UI component functionality

## Resources
- Supabase Dashboard: https://app.supabase.com
- Project Repository: [Add repository URL]
- Original PRD: [Add PRD location]