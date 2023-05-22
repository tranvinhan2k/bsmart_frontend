import { Stack, Alert } from '@mui/material';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import MemberProfileLayout from '~/layouts/MemberProfileLayout';
import { RoutePayload } from '~/models/routes';
import { selectProfile } from '~/redux/user/selector';
import { memberRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';

export default function MemberProfilePage() {
  const profile = useSelector(selectProfile);

  useEffect(() => {
    scrollToTop();
  }, []);

  const showMemberRoutes = () => {
    let result = null;

    if (memberRoutes.length > 0) {
      result = memberRoutes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  return (
    <MemberProfileLayout>
      {profile.isVerified ? (
        <Routes>{showMemberRoutes()}</Routes>
      ) : (
        <Stack>
          <Alert severity="warning">
            {`Xin hãy xác thực email ${profile.email} để truy cập tất cả chức năng`}
          </Alert>
        </Stack>
      )}
    </MemberProfileLayout>
  );
}
