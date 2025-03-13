-- Indexes for prompts
CREATE INDEX idx_prompts_tags ON prompts USING GIN (tags);
CREATE INDEX idx_prompts_created_by ON prompts (created_by);
CREATE INDEX idx_prompts_name ON prompts (name);

-- Indexes for prompt_versions
CREATE INDEX idx_prompt_versions_prompt_id ON prompt_versions (prompt_id);

-- Indexes for team_members
CREATE INDEX idx_team_members_user_id ON team_members (user_id);
CREATE INDEX idx_team_members_team_id ON team_members (team_id); 