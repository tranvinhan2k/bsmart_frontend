import { useEffect } from 'react';
import WalletManagementSection from '~/containers/WalletManagementSection';
import { scrollToTop } from '~/utils/common';

export default function WalletManagementPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <WalletManagementSection />;
}
