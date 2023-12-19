import { useEffect } from 'react';

export const useSelectAndCopy = (text: string, onCopy?: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.getSelection()?.toString() === text && (event.ctrlKey || event.metaKey) && event.key === 'c') {
        onCopy && onCopy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [text, onCopy]);
};
