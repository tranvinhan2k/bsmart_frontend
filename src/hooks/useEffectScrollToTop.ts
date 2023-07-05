import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';

export const useEffectScrollToTop = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
};
