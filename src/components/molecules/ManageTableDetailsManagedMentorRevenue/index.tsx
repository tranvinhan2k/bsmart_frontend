import { CircularProgress, Typography, Stack, Grid } from '@mui/material';
import React from 'react';
import Icon, { IconName } from '~/components/atoms/Icon';
import { useGetManagedUserRevenue } from '~/hooks/transaction/useGetManagedUserRevenue';
import { useGetManagedMentorDetails } from '~/hooks/user/useGetManagedMentorDetails';
import sx from './style';

interface DisplayListProps {
  id: number;
  iconName: IconName;
  label: string;
  value: string;
  size: number;
}

interface ManageTableDetailsManagedMentorRevenueProps {
  rowId: number | undefined;
}
export default function ManageTableDetailsManagedMentorRevenue({
  rowId = 0,
}: ManageTableDetailsManagedMentorRevenueProps) {
  const { managedUserRevenue, isLoading } = useGetManagedUserRevenue(rowId);
  console.log('managedUserRevenue', managedUserRevenue);

  const displayList1: DisplayListProps[] = [
    {
      id: 0,
      iconName: 'visibilityIcon',
      label: 'Số lượng khóa học',
      value: 'abc',
      size: 6,
    },
    {
      id: 1,
      iconName: 'shuffleIcon',
      label: 'Trộn bài kiểm tra',
      value: 'abc',
      size: 6,
    },
    {
      id: 2,
      iconName: 'lockIcon',
      label: 'Mật khẩu',
      value: 'abc',
      size: 6,
    },
  ];

  return (
    <>
      <Typography>Doanh thu giảng viên</Typography>
      {/* <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <CircularProgress />
      </Stack> */}
      <Grid container>
        {displayList1.map((display) => (
          <Grid item xs={6} key={display.id}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1.5}
              key={display.id}
              mt={2}
              p={1}
            >
              <Icon name={display.iconName} size="small_20" />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Typography sx={sx.itemLabel}>{display.label}</Typography>
                <Typography sx={sx.itemValue}>{display.value}</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
