import { Stack } from '@mui/material';
import { useEffect } from 'react';
import EditAccountInformationSection from '~/containers/EditProfileSection/EditAccountInformationSection';
import EditBasicInformationSection from '~/containers/EditProfileSection/EditBasicInformationSection';
import EditCertificateInformationSection from '~/containers/EditProfileSection/EditCertificateInformationSection';
import EditSocialInformationSection from '~/containers/EditProfileSection/EditSocialInformationSection';
import { scrollToTop } from '~/utils/common';

export default function MentorEditProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <EditBasicInformationSection />
      <Stack marginTop={1}>
        <EditCertificateInformationSection />
      </Stack>
      <Stack marginTop={1}>
        <EditAccountInformationSection />
      </Stack>
      <Stack marginTop={1}>
        <EditSocialInformationSection />
      </Stack>
    </Stack>
  );
}
