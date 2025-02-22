import { DiagnosisResult } from '@/types/diagnosis';
import { PersonalityTrait } from '@/types/diagnosis';
import { GallupCategory } from '@/types/diagnosis';
import { Variants } from 'framer-motion';
import { personalityTraits } from '@/data/personality-definitions';

export interface SectionProps {
  result: DiagnosisResult;
  selectedCategory?: GallupCategory | null;
  selectedCharacteristic?: string | null;
  onCategoryClick?: (category: GallupCategory) => void;
  onCharacteristicClick?: (characteristic: string) => void;
  shouldReduceMotion?: boolean;
  containerAnimation?: Variants;
  childAnimation?: Variants;
}

export interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  description?: string;
  icon?: React.ReactNode;
}

export interface ChartDisplayProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  options?: Partial<ChartOptions>;
  shouldReduceMotion?: boolean;
}

export interface ChartOptions {
  scales: {
    r: {
      min: number;
      max: number;
      ticks: { stepSize: number };
      grid: { color: string };
      angleLines: { color: string };
      pointLabels: { font: { size: number } };
    };
  };
  plugins: {
    legend: { display: boolean };
  };
  animation: false | {
    duration: number;
    easing: string;
  };
  transitions: {
    active: {
      animation: {
        duration: number;
      };
    };
  };
  interaction: {
    intersect: boolean;
    mode: 'point' | 'nearest' | 'index' | 'dataset' | 'x' | 'y';
  };
}

export interface RecommendationListProps {
  recommendations: string[];
  title?: string;
  icon?: React.ReactNode;
}

export interface AnimationConfig {
  containerAnimation: Variants;
  childAnimation: Variants;
  hoverAnimation: any;
  getChartOptions: (baseOptions?: Partial<ChartOptions>) => Partial<ChartOptions>;
}

export interface AccessibilityConfig {
  sectionDescriptions: {
    [key: string]: string;
  };
  ariaLabels: {
    [key: string]: string;
  };
}

export interface UnifiedDiagnosisResultProps {
  result: DiagnosisResult;
  isLoading?: boolean;
  error?: string;
}

// Section-specific types
export interface PersonalitySectionProps extends SectionProps {
  personalityTraits: typeof personalityTraits;
}

// CareerSectionPropsは独自の型定義を使用
export interface CareerSectionProps {
  result: DiagnosisResult;
  selectedCategory?: string | null;
  onCategoryClick?: (category: string) => void;
  shouldReduceMotion?: boolean;
  containerAnimation?: Variants;
  childAnimation?: Variants;
}

export interface EngagementSectionProps extends SectionProps {
  gallupCategoryDescriptions: Record<GallupCategory, string>;
  categoryRelationships: Record<GallupCategory, {
    related: GallupCategory[];
    impact: string;
  }>;
}

export interface StressSectionProps extends SectionProps {
  stressLevels?: Record<string, any>;
  copingStrategies?: Record<string, any>;
} 