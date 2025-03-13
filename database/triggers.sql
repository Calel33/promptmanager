-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to prompts table
CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Version control trigger
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

-- Add version control trigger to prompts table
CREATE TRIGGER version_prompt_changes
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION create_prompt_version(); 