import { useForm } from 'react-hook-form';
import { Stack, Typography, Divider } from '@mui/material';
import FormInput from '~/components/atoms/FormInput';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
// TODO : Not implement api yet
export default function EditAccountInformationForm() {
  const editBasicHookForm = useForm();

  const handleSubmitSuccess = (data: any) => {
    console.log(data);
  };
  return (
    <Stack padding={2}>
      <Typography
        sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
      >
        Thông tin mật khẩu
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <form onSubmit={editBasicHookForm.handleSubmit(handleSubmitSuccess)}>
        <FormInput control={editBasicHookForm.control} name="" label="Email" />
        <FormInput
          control={editBasicHookForm.control}
          name=""
          variant="password"
          label="Password"
        />
        <FormInput
          control={editBasicHookForm.control}
          name=""
          variant="password"
          label="Xác nhận Password"
        />
        <FormInput
          control={editBasicHookForm.control}
          name="gmail"
          label="Liên kết Gmail"
        />
        <Stack marginTop={2}>
          <Button type="submit" customVariant="normal">
            Cập nhật
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
