import { useForm } from 'react-hook-form';
import { Stack, Typography, Divider } from '@mui/material';
import FormInput from '~/components/atoms/FormInput';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
// TODO : Not implement api yet
export default function EditSocialInformationForm() {
  const editBasicHookForm = useForm();

  const handleSubmitSuccess = (data: any) => {
    console.log(data);
  };
  return (
    <Stack padding={2}>
      <Typography
        sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
      >
        Liên kết mạng xã hội
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <form onSubmit={editBasicHookForm.handleSubmit(handleSubmitSuccess)}>
        <FormInput
          control={editBasicHookForm.control}
          name=""
          label="Facebook"
        />
        <FormInput
          control={editBasicHookForm.control}
          name=""
          label="Twitter"
        />
        <FormInput
          control={editBasicHookForm.control}
          name=""
          label="Instagram"
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
