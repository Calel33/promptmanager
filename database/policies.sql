-- Enable Row Level Security
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_versions ENABLE ROW LEVEL SECURITY;

-- Prompts Policies
CREATE POLICY "Users can view their own prompts"
  ON prompts FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can insert their own prompts"
  ON prompts FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own prompts"
  ON prompts FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Prompt Versions Policies
CREATE POLICY "Users can view their own prompt versions"
  ON prompt_versions FOR SELECT
  USING (auth.uid() = created_by); 