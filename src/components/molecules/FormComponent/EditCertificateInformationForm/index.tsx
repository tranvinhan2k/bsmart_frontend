import { useForm } from 'react-hook-form';
import { Stack, Typography, Divider } from '@mui/material';
import FormInput from '~/components/atoms/FormInput';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
// TODO : Not implement api yet
export default function EditCertificateInformationForm() {
  const editBasicHookForm = useForm();

  const handleSubmitSuccess = (data: any) => {
    console.log(data);
  };
  return (
    <Stack padding={2}>
      <Typography
        sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
      >
        Thông tin bằng cấp (2 bằng cấp/chứng chỉ)
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <form onSubmit={editBasicHookForm.handleSubmit(handleSubmitSuccess)}>
        <FormInput
          variant="file"
          control={editBasicHookForm.control}
          name=""
          label="Bằng cấp 1"
        />
        <FormInput
          variant="file"
          control={editBasicHookForm.control}
          name=""
          label="Bằng cấp 2"
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
