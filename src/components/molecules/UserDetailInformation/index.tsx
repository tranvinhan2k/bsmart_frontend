import { Stack, Typography, Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { MetricSize, FontFamily, FontSize, Color } from '~/assets/variables';
import { IconName } from '~/components/atoms/Icon';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { image } from '~/constants/image';
import { MarkOfStudentPayload } from '~/pages/mentor_class/MentorClassMarkReportPage';
import globalStyles from '~/styles';
import CRUDTable from '../CRUDTable';
import { formatISODateStringToDisplayDateTime } from '~/utils/date';
import { useGetIdFromUrl, useGetMemberMarkReport } from '~/hooks';
import { selectProfile } from '~/redux/user/selector';

interface Props {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  imageAlt: string;
}

export default function UserDetailInformation({
  email,
  imageAlt,
  imageUrl,
  name,
  phone,
}: Props) {
  const profile = useSelector(selectProfile);
  const id = useGetIdFromUrl('id');
  const {
    data: mark,
    error,
    isLoading,
  } = useGetMemberMarkReport(id, profile.id);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên bài kiểm tra',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'time',
      headerName: 'Thời điểm',
      width: 200,
      renderCell: (params) => {
        return formatISODateStringToDisplayDateTime(params.row.time);
      },
    },
    {
      field: 'grade',
      headerName: 'Điểm',
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
    </Stack>
  );
}
