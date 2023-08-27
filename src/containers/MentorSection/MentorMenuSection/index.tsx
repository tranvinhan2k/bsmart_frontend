import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import toast from '~/utils/toast';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import MentorItem from '~/components/molecules/MentorItem';
import { MentorQuickPayload } from '~/models/mentor';
import { PagingFilterPayload, PagingFilterRequest } from '~/models';
import CustomPagination from '~/components/atoms/CustomPagination';

interface MentorMenuSectionPayload {
  error: any;
  data: PagingFilterPayload<MentorQuickPayload> | null | undefined;
  isLoading: boolean;
  onChangePage: (page: number) => void;
}

export default function MentorMenuSection(props: MentorMenuSectionPayload) {
  const { data, error, isLoading, onChangePage } = props;
  const navigation = useNavigate();
  const [dropDownValue, setDropDownValue] = useState('');

  const handleChange = (event: any) => {
    setDropDownValue(event.target.value);
  };

  const handleNavigateMentorDetail = (id: string) => {
    navigation(`mentor-detail/${id}`);
  };

  let mentorData = null;

  switch (true) {
    case Boolean(error):
      toast.notifyErrorToast(error.message);
      mentorData = (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              color: Color.red,
              fontFamily: FontFamily.light,
            }}
          >
            {error.message}
          </Typography>
        </Stack>
      );

      break;
    case isLoading:
      mentorData = (
        <Stack
          sx={{
            paddingY: MetricSize.medium_15,
          }}
          flexDirection="row"
          flexWrap="wrap"
          alignContent="space-around"
          alignItems="stretch"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <MentorItem isSkeleton key={item} />
          ))}
        </Stack>
      );
      break;
    case data?.items.length === 0:
      mentorData = (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              color: Color.grey,
              fontFamily: FontFamily.light,
            }}
          >
            Không có giáo viên phù hợp.
          </Typography>
        </Stack>
      );
      break;
    case isLoading === false:
      mentorData = (
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          alignContent="space-around"
          // alignItems="stretch"
        >
          {data?.items.map((item) => (
            <MentorItem
              key={item.id}
              item={item}
              onClick={() => handleNavigateMentorDetail(`${item.id}`)}
            />
          ))}
        </Stack>
      );
      break;
    default:
      break;
  }

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack
        sx={{ width: '100%' }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      />
      {mentorData}
      {data && data.items.length > 0 && (
        <Stack justifyContent="center" alignItems="center" padding={2}>
          <CustomPagination
            onChange={onChangePage}
            currentPage={data.currentPage}
            totalPages={data.totalPages}
          />
        </Stack>
      )}
    </Stack>
  );
}
