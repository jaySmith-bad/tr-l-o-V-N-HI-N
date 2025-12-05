import { LucideIcon } from 'lucide-react';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  isTyping?: boolean;
}

export interface Course {
  title: string;
  credits: string;
  lecturer: string;
  rating: string;
  schedule: string;
  tags: string[];
  registered: boolean;
}

export interface GradeData {
  name: string;
  he10: number;
  he4: number;
}

export interface UserProfile {
  name: string;
  major: string;
  avatar: string;
  studentId: string;
  dob: string;
  class: string;
  faculty: string;
  gender: string;
  email: string;
  progress: number;
  studyYears: string;
}

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}
