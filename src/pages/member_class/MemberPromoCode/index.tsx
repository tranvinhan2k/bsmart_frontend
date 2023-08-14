import {
  Stack,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import CRUDTable from '~/components/molecules/CRUDTable';
import {
  validationAddPromoCode,
  validationClassListFilter,
} from '~/form/validation';
import {
  useGetPromoCode,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { useCopyToClipboard } from '~/hooks/useCopyToClipboard';
import { useAddPromoCode } from '~/hooks/user/useAddPromoCode';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

export interface PromoCodePayload {
  id: number;
  code: string;
  description: string;
  percent: number;
  classId: number;
  courseId: number;
}

export default function MemberPromoCode() {
  const resolver = useYupValidationResolver(validationAddPromoCode);
  const hookForm = useForm({
    resolver,
  });

  const [value, copy] = useCopyToClipboard();
  const { data, error, isLoading } = useGetPromoCode();

  const { mutateAsync: handleSubmitCode } = useAddPromoCode();
  const { handleTryCatch } = useTryCatch('thêm mã giới thiệu');
  const onSubmit = async (params: any) => {
    await handleTryCatch(async () => handleSubmitCode(params.code));
  };

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>
        Thông tin mã giới thiệu
      </Typography>
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <Typography sx={globalStyles.textSmallLabel}>
          Thêm mã giới thiệu
        </Typography>
        <Stack
          marginTop={1}
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <FormInput name="code" variant="text" control={hookForm.control} />
          <Button
            sx={{
              marginLeft: 1,
            }}
            onClick={hookForm.handleSubmit(onSubmit, handleConsoleError)}
            variant="contained"
          >
            Thêm mã giới thiệu
          </Button>
        </Stack>
      </Stack>
      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <Typography sx={globalStyles.textSmallLabel}>
          Danh sách mã giới thiệu
        </Typography>

        <CRUDTable
          error={error}
          isLoading={isLoading}
          columns={[
            {
              field: 'id',
              headerName: 'ID',
              width: 50,
            },
            {
              field: 'code',
              flex: 1,
              headerName: 'Mã giới thiệu',
              renderCell: (params) => {
                return (
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Tooltip
                      title={
                        value === params.row.code
                          ? 'Đã sao chép'
                          : 'Sao chép nội dung'
                      }
                    >
                      <IconButton
                        disabled={value === params.row.code}
                        onClick={() => copy(params.row.code)}
                      >
                        <Icon
                          name="contentCopyIcon"
                          size="small"
                          color={value === params.row.code ? 'grey' : 'black'}
                        />
                      </IconButton>
                    </Tooltip>
                    <Typography>{params.row.code}</Typography>
                  </Stack>
                );
              },
            },
            {
              field: 'description',
              headerName: 'Mô tà',
              flex: 8,
            },
          ]}
          rows={data || []}
        />
      </Stack>
    </Stack>
  );
}
