import { RefObject, KeyboardEvent } from 'react';

export function useKeyboardNavigation(ref: RefObject<HTMLDivElement | null>) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    switch (event.key) {
      case 'Tab':
        // タブキーでのナビゲーションは自然な挙動を維持
        break;
      case 'Escape':
        // フォーカスを外す
        ref.current.blur();
        break;
      case 'Home':
        // 最初の要素にフォーカス
        const firstFocusable = ref.current.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        firstFocusable?.focus();
        event.preventDefault();
        break;
      case 'End':
        // 最後の要素にフォーカス
        const focusableElements = ref.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const lastFocusable = focusableElements[focusableElements.length - 1];
        lastFocusable?.focus();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return { handleKeyDown };
} 