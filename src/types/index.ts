export interface Prompt {
  id: string;
  name: string;
  content: string;
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  version: number;
  is_deleted: boolean;
}

export interface Team {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
}

export interface TeamMember {
  team_id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
} 