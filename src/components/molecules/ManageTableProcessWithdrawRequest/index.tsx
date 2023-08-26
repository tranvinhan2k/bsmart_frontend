import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { read, utils } from 'xlsx';
import { defaultValueProcessWithdrawRequest } from '~/form/defaultValues';
import { ProcessWithdrawRequestFormDataPayload } from '~/models/form';
import { toastMsgError } from '~/utils/common';
import { useMutationProcessWithdrawRequest } from '~/hooks/transaction/useMutationProcessWithdrawRequest';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaManagedWithdrawUpload } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';

interface ManageTableProcessWithdrawRequestProps {
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableProcessWithdrawRequest({
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableProcessWithdrawRequestProps) {
  const resolverUpload = useYupValidationResolver(
    validationSchemaManagedWithdrawUpload
  );

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: defaultValueProcessWithdrawRequest,
    resolver: resolverUpload,
  });

  const { processCourseCreateRequestMutation } =
    useMutationProcessWithdrawRequest();
  const toastMsgLoading = 'Đang xử lý...';
  const toastMsgSuccess = 'Xử lý thành công...';
  const handleSubmitProcessWithdrawRequest = async (
    data: ProcessWithdrawRequestFormDataPayload
  ) => {
    const f = await data.file.arrayBuffer();
    const wb = read(f);
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const parsedData = utils.sheet_to_json(ws); // generate objects
    const formattedData = parsedData.map((item: any) => {
      return {
        id: item.id,
        status: item.status,
        note: item.note ?? '',
      };
    });
    const id = toast.loadToast(toastMsgLoading);
    try {
      await processCourseCreateRequestMutation.mutateAsync(formattedData);
      refetchSearch();
      refetchGetNoOfRequest();
      onClose();
      reset();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };
  return (
    <>
      <Box mb={2}>
        <Typography>
          - Định dạng file hỗ trợ: <b>.xlsx</b>
        </Typography>
        <Typography>
          - Hãy sử dụng lại File tải từ mục <b>Xuất danh sách</b>
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(handleSubmitProcessWithdrawRequest)}>
        <FormInput variant="fileRequireYup" name="file" control={control} />
        <Box mt={2}>
          <Button
            variant="contained"
            color="miSmartOrange"
            fullWidth
            type="submit"
            disabled={!formState.isDirty}
          >
            Xử lý danh sách
          </Button>
        </Box>
      </form>
    </>
  );
}
