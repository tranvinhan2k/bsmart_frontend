import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';

export default function ManageTableWithdrawWaitingRequest() {
  const { control, handleSubmit, formState } = useForm();

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        mt={2}
      >
        <Button
          variant="contained"
          color="miSmartOrange"
          startIcon={<Icon name="download" size="small" color="white" />}
        >
          Lấy danh sách
        </Button>
        <Button
          variant="contained"
          color="miSmartOrange"
          startIcon={<FileUploadIcon />}
          disabled
        >
          Xử lý danh sách
        </Button>
      </Stack>
      <FormInput name="" control={control} variant="file" />
    </Stack>
  );
}
