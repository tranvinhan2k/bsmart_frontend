import { useRef } from 'react';

export const useScrollIntoView = () => {
  const ref = useRef(null);

  const executeScroll = () => {
    if (ref.current) {
      (ref.current as any).style.scrollMargin = '100px';

      (ref?.current as any)?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };
  // run this function from an event handler or an effect to execute scroll
  return {
    ref,
    executeScroll,
  };
};
