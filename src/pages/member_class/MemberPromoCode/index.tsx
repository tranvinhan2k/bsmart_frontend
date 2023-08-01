import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import CRUDTable from '~/components/molecules/CRUDTable';
import { useGetPromoCode } from '~/hooks';
import { useCopyToClipboard } from '~/hooks/useCopyToClipboard';
import globalStyles from '~/styles';

export interface PromoCodePayload {
  id: number;
  code: string;
  description: string;
}

export default function MemberPromoCode() {
  const [value, copy] = useCopyToClipboard();
  const { data, error, isLoading } = useGetPromoCode();

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>
        Thông tin mã giới thiệu
      </Typography>
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
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