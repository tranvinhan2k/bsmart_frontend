import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';
import MemberViewAttendance from '~/components/molecules/MemberViewAttendance';

export default function MemberAttendanceListPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <MemberViewAttendance />;
}
