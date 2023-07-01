import { Stack, Alert, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { useMutationResendVerify } from '~/hooks/useMutationResendVerify';
import MentorProfileLayout from '~/layouts/MentorProfileLayout';
import { RoutePayload } from '~/models/routes';
import { selectProfile } from '~/redux/user/selector';
import { mentorRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';
import toast from '~/utils/toast';

export default function MentorProfilePage() {
  const profile = useSelector(selectProfile);
  const mutationResult = useMutationResendVerify();

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
    <MentorProfileLayout>
      {profile.isVerified ? (
        <Routes>{showMentorRoutes()}</Routes>
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
    </MentorProfileLayout>
  );
}
