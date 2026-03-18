
import { ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  features: string[];
  tags: string[];
  github: string;
  demo?: string;
  diagram: ReactNode;
  highlight: string;
  challenges?: string[];
  learnings?: string[];
  images?: string[];
  skillUsage?: { skill: string; usage: string }[];
}

export interface Skill {
  name: string;
  level: string;
  desc: string;
  icon: ReactNode;
  isMain?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  isStreaming?: boolean;
}
