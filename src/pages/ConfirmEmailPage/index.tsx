import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';

const texts = {
  title: 'Bạn đã xác thực email thành công.',
  subtitle: `Email tranvinhan2k@gmail.com của bạn đã được xác thực thành công.`,
  button_tittle: 'Trở về trang chủ',
};

export default function ConfirmEmailPage() {
  const navigate = useNavigate();
  const handleNavigateMainPage = () => {
    navigate('/homepage');
  };

  return (
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
