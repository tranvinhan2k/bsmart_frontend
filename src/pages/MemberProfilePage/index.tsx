import { Stack, Alert, Typography, Button } from '@mui/material';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { FontFamily } from '~/assets/variables';
import { useMutationResendVerify } from '~/hooks/useMutationResendVerify';
import MemberProfileLayout from '~/layouts/MemberProfileLayout';
import { RoutePayload } from '~/models/routes';
import { selectProfile } from '~/redux/user/selector';
import { memberRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';
import toast from '~/utils/toast';

export default function MemberProfilePage() {
  const profile = useSelector(selectProfile);
  const mutationResult = useMutationResendVerify();

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

  const handleResendVerify = async () => {
    const id = toast.loadToast('Đang gửi lại mail..');
    try {
      await mutationResult.mutateAsync();
      toast.updateSuccessToast(id, 'Đã gửi mail thành công');
    } catch (error: any) {
      toast.updateFailedToast(id, `Đã gửi mail thất bại: ${error.message}`);
    }
  };

  return (
    <MemberProfileLayout>
      {profile.isVerified ? (
        <Routes>{showMemberRoutes()}</Routes>
      ) : (
        <Stack>
          <Alert
            action={
              <Button onClick={handleResendVerify}>
                <Typography
                  sx={{
                    fontFamily: FontFamily.medium,
                  }}
                >
                  Gửi lại email
                </Typography>
              </Button>
            }
            severity="warning"
          >
            <Typography
              sx={{
                fontFamily: FontFamily.light,
              }}
            >
              Xin hãy xác thực email{' '}
              <span style={{ fontFamily: FontFamily.bold }}>
                {profile.email}
              </span>{' '}
              để truy cập tất cả chức năng.
            </Typography>
          </Alert>
        </Stack>
      )}
    </MemberProfileLayout>
  );
}
