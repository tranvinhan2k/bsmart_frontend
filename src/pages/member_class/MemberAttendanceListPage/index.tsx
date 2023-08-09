import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { scrollToTop } from '~/utils/common';
import MemberViewAttendance from '~/components/molecules/MemberViewAttendance';
import TextTitle from '~/components/atoms/texts/TextTitle';

export default function MemberAttendanceListPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <TextTitle title="Thông tin điểm danh" />
      <MemberViewAttendance />
    </Stack>
  );
}
