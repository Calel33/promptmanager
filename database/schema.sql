-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables and functions if they exist
DROP TRIGGER IF EXISTS version_prompt_changes ON prompts;
DROP TRIGGER IF EXISTS update_prompts_updated_at ON prompts;
DROP FUNCTION IF EXISTS create_prompt_version();
DROP FUNCTION IF EXISTS update_updated_at();
DROP TABLE IF EXISTS prompt_versions;
DROP TABLE IF EXISTS prompts;

-- Prompts Table
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

-- Prompt Versions Table
CREATE TABLE prompt_versions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  prompt_id UUID REFERENCES prompts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_versions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own prompts" ON prompts;
DROP POLICY IF EXISTS "Users can create their own prompts" ON prompts;
DROP POLICY IF EXISTS "Users can update their own prompts" ON prompts;
DROP POLICY IF EXISTS "Users can delete their own prompts" ON prompts;
DROP POLICY IF EXISTS "Users can view versions of their own prompts" ON prompt_versions;

-- Policies for prompts table
CREATE POLICY "Users can view their own prompts"
  ON prompts
  FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own prompts"
  ON prompts
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own prompts"
  ON prompts
  FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own prompts"
  ON prompts
  FOR DELETE
  USING (auth.uid() = created_by);

-- Policies for prompt_versions table
CREATE POLICY "Users can view versions of their own prompts"
  ON prompt_versions
  FOR SELECT
  USING (
    auth.uid() = created_by
    OR
    auth.uid() IN (
      SELECT created_by 
      FROM prompts 
      WHERE id = prompt_versions.prompt_id
    )
  );

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION create_prompt_version()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.content != NEW.content) THEN
    INSERT INTO prompt_versions (prompt_id, content, created_by)
    VALUES (NEW.id, OLD.content, OLD.created_by);
    NEW.version = OLD.version + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER version_prompt_changes
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION create_prompt_version();

-- Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_prompts_created_by;
DROP INDEX IF EXISTS idx_prompts_tags;
DROP INDEX IF EXISTS idx_prompts_name;
DROP INDEX IF EXISTS idx_prompt_versions_prompt_id;

-- Indexes
CREATE INDEX idx_prompts_created_by ON prompts(created_by);
CREATE INDEX idx_prompts_tags ON prompts USING GIN (tags);
CREATE INDEX idx_prompts_name ON prompts(name);
CREATE INDEX idx_prompt_versions_prompt_id ON prompt_versions(prompt_id); 