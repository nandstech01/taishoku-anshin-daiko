export interface SalaryData {
  name: string;
  value: number;
  color: string;
}

export interface StatItem {
  id: number;
  icon?: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
  description: string;
  image: string; // Added image property based on usage
}

export interface SuccessStory {
  id: number;
  name: string;
  background: string;
  offer: string;
  course: string;
  comment: string;
  avatar: string;
  color: string;
  image: string; // Added image property based on usage
  icon: React.ReactNode; // Added icon property based on usage
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
} 