import { Stack, Alert } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import MentorProfileLayout from '~/layouts/MentorProfileLayout';
import { RoutePayload } from '~/models/routes';
import { selectProfile } from '~/redux/user/selector';
import { mentorRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';

export default function MentorProfilePage() {
  const profile = useSelector(selectProfile);

  useEffect(() => {
    scrollToTop();
  }, []);

  const showMentorRoutes = () => {
    let result = null;

    if (mentorRoutes.length > 0) {
      result = mentorRoutes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  return (
    <MentorProfileLayout>
      {profile.isVerified ? (
        <Routes>{showMentorRoutes()}</Routes>
      ) : (
        <Stack>
          <Alert severity="warning">
            {`Xin hãy xác thực email ${profile.email} để truy cập tất cả chức năng`}
          </Alert>
        </Stack>
      )}
    </MentorProfileLayout>
  );
}
