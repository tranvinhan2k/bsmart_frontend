import { Stack, Typography, Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { MetricSize } from '~/assets/variables';
import { IconName } from '~/components/atoms/Icon';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { image } from '~/constants/image';
import globalStyles from '~/styles';
import CRUDTable from '../CRUDTable';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { useGetIdFromUrl, useGetMemberMarkReport } from '~/hooks';

interface Props {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  imageAlt: string;
  isHidePoint?: boolean;
}

export default function UserDetailInformation({
  id,
  email,
  imageAlt,
  imageUrl,
  name,
  phone,
  isHidePoint = false,
}: Props) {
  const classId = useGetIdFromUrl('id');
  const { data: mark, error, isLoading } = useGetMemberMarkReport(classId, id);

  const columns: GridColDef[] = [
    {
      field: 'type',
      headerName: 'Loại điểm số',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Tên bài kiểm tra',
      flex: 1,
    },
    {
      field: 'created',
      headerName: 'Thời điểm đã làm',
      minWidth: 200,
      renderCell: (params) => {
        return formatISODateDateToDisplayDateTime(params.row.created);
      },
    },
    {
      field: 'grade',
      headerName: 'Điểm',
      width: 90,
    },
  ];

  return (
    <Stack>
      <Typography marginTop={1} sx={globalStyles.textSmallLabel}>
        Thông tin chung
      </Typography>
      <Stack sx={{ flexDirection: 'row' }}>
        <Stack>
          <Box
            component="img"
            sx={{
              width: '100px',
              aspectRatio: 3 / 4,
              borderRadius: MetricSize.small_5,
            }}
            src={imageUrl || image.noCourse}
            alt={imageAlt}
          />
        </Stack>

        <Stack
          sx={{
            marginLeft: 1,
          }}
        >
          {[
            { label: 'Tên', value: name, icon: 'user' },
            { label: 'Email', value: email, icon: 'mail' },
            { label: 'Số điện thoại', value: phone, icon: 'phone' },
          ].map((item, index) => (
            <Stack marginTop={1} key={index}>
              <TextPropLine
                icon={item.icon as IconName}
                label={item.label}
                value={item.value}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>

      {!isHidePoint && (
        <Stack>
          <Typography marginTop={1} sx={globalStyles.textSmallLabel}>
            Thông tin điểm số
          </Typography>
          <CRUDTable
            error={error}
            isLoading={isLoading}
            columns={columns}
            rows={mark || []}
          />
        </Stack>
      )}
    </Stack>
  );
}
