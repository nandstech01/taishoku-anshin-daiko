import { useReducedMotion } from 'framer-motion';
import { ChartOptions } from '../types';

type ChartEasing = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint';

export const useAnimationControl = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const childAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: 'easeOut'
      }
    }
  };

  const hoverAnimation = shouldReduceMotion 
    ? {}
    : {
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: 'easeOut'
        }
      };

  const getChartOptions = (baseOptions?: Partial<ChartOptions>): Partial<ChartOptions> => {
    const defaultOptions: Partial<ChartOptions> = {
      scales: {
        r: {
          min: 0,
          max: 7,
          ticks: { stepSize: 1 },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
          pointLabels: { font: { size: 12 } }
        }
      },
      plugins: {
        legend: { display: false }
      },
      animation: shouldReduceMotion ? false : {
        duration: 800,
        easing: 'easeInOutQuart' as ChartEasing
      },
      transitions: {
        active: {
          animation: {
            duration: shouldReduceMotion ? 0 : 300
          }
        }
      },
      interaction: {
        intersect: true,
        mode: 'point' as const
      }
    };

    return {
      ...defaultOptions,
      ...baseOptions
    };
  };

  return {
    containerAnimation,
    childAnimation,
    hoverAnimation,
    getChartOptions
  };
}; 