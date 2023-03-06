import { useForm } from 'react-hook-form';
import { Stack, Typography, Divider } from '@mui/material';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import { FontFamily, FontSize } from '~/assets/variables';
// TODO : Not implement api yet
export default function EditBasicInformationForm() {
  const editBasicHookForm = useForm();

  const handleSubmitSuccess = (data: any) => {
    console.log(data);
  };
  return (
    <Stack padding={2}>
      <Typography
        sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
      >
        Thông tin cá nhân
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <form onSubmit={editBasicHookForm.handleSubmit(handleSubmitSuccess)}>
        <FormInput
          variant="image"
          control={editBasicHookForm.control}
          name=""
          label="Avatar"
        />
        <FormInput
          variant="text"
          control={editBasicHookForm.control}
          name=""
          label="Họ và Tên"
        />
        <FormInput
          variant="date"
          control={editBasicHookForm.control}
          name=""
          label="Ngày Sinh"
        />
        <FormInput
          control={editBasicHookForm.control}
          name=""
          label="Dịa chỉ"
        />
        <FormInput
          variant="text"
          control={editBasicHookForm.control}
          name=""
          label="Số điện thoại"
        />
        <Stack flexDirection="row">
          <FormInput
            variant="image"
            control={editBasicHookForm.control}
            name=""
            label="Căn cước công dân mặt trước"
          />
          <Stack margin={1} />
          <FormInput
            variant="image"
            control={editBasicHookForm.control}
            name=""
            label="Căn cước công dân mặt sau"
          />
        </Stack>
        <Stack marginTop={1}>
          <Button type="submit" customVariant="normal">
            Cập Nhật
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
