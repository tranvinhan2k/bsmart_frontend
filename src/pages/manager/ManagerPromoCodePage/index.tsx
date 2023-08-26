import { useEffect } from 'react';
import ManageConfigReferralCodeSection from '~/components/molecules/ManageConfigReferralCodeSection';
import { scrollToTop } from '~/utils/common';

export default function ManagerPromoCodePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <ManageConfigReferralCodeSection />;
}
