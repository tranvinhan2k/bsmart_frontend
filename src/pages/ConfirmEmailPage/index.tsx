import { Stack, Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MetricSize } from '~/assets/variables';
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
    subtitle: error ? `${error}` : `Email của bạn đã được ${data?.message}`,
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

  return isLoading ? (
    <Stack
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        component="img"
        sx={{
          width: MetricSize.extraLarge_100,
          height: MetricSize.extraLarge_100,
        }}
        src={image.loadingIcon2}
        alt="loading"
      />
    </Stack>
  ) : (
    <Stack
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack sx={globalStyles.textTitle}>{texts.title}</Stack>
      <Stack sx={globalStyles.textSubTitle}>{texts.subtitle}</Stack>
      <Button
        marginTop="medium_15"
        customVariant="normal"
        onClick={handleNavigateMainPage}
      >
        {texts.button_tittle}
      </Button>
    </Stack>
  );
}
