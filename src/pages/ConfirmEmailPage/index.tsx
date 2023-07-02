import { Stack, Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { image } from '~/constants/image';
import { useMutationProfile, useQueryVerifyEmail } from '~/hooks';
import { selectProfile } from '~/redux/user/selector';
import { addProfile } from '~/redux/user/slice';
import globalStyles from '~/styles';
import toast from '~/utils/toast';

export default function ConfirmEmailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const mutationProfile = useMutationProfile();
  const profile = useSelector(selectProfile);

  const { data, error, isLoading, reverifyMutation } = useQueryVerifyEmail(
    params?.code
  );
  const handleNavigateMainPage = async () => {
    if (error) {
      await reverifyMutation.mutateAsync();
      if (profile) {
        const responseProfile = await mutationProfile.mutateAsync();
        dispatch(addProfile(responseProfile));
      }
    } else {
      navigate('/homepage');
    }
  };

  const texts = {
    title: error
      ? 'Xác thực email thất bại'
      : 'Bạn đã xác thực email thành công.',
    subtitle: error
      ? `${(error as any).message}`
      : `Chúc mừng bạn đã trở thành thành viên của MiSmart`,
    button_tittle: error ? 'Thử lại' : 'Trở về trang chủ',
  };

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    scrollTo(0, 400);
  }, []);

  useEffect(() => {
    if (error) {
      toast.notifyErrorToast(`${error}`);
    }
  }, [error]);

  return (
    <Stack
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack
        sx={{
          transition: 'all 1s ease',
          background: Color.white,
          boxShadow: 1,
          borderRadius: MetricSize.medium_15,
          padding: 4,
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: { xs: '100%', md: '50vw' },
          minHeight: { xs: '100%', md: '400px' },
        }}
      >
        {isLoading ? (
          <Box
            component="img"
            sx={{
              width: MetricSize.extraLarge_100,
              height: MetricSize.extraLarge_100,
            }}
            src={image.loadingIcon}
            alt="loading"
          />
        ) : (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              component="img"
              src={error ? image.error : image.success}
              alt="hinh anh xac nhan"
              sx={{
                width: '400px',
                height: undefined,
                aspectRatio: 1,
                objectFit: 'contain',
              }}
            />
            <Typography sx={globalStyles.textTitle}>{texts.title}</Typography>
            <Typography sx={globalStyles.textSubTitle}>
              {texts.subtitle}
            </Typography>
            <Button
              marginTop="medium_15"
              customVariant="form"
              onClick={handleNavigateMainPage}
            >
              {texts.button_tittle}
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
