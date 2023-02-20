import React from 'react';
import { Stack, Box, Typography, Rating, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { MentorPayload } from '~/models/mentor';
import {
  Colors,
  Common,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import { formatDate } from '~/utils/date';

interface CourseDetailBasicInformationSectionProps {
  mentorData: MentorPayload;
  percentOfFeedback: number;
  numOfRating: number;
  numOfRegisterStudent: number;
  numOfOpenClass: number;
  openDate: string;
  description: string;
  field: string;
}

export default function CourseDetailBasicInformationSection({
  description,
  mentorData,
  numOfOpenClass,
  numOfRating,
  numOfRegisterStudent,
  openDate,
  percentOfFeedback,
  field,
}: CourseDetailBasicInformationSectionProps) {
  const handleShareCourse = () => [];

  return (
    <Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            alt="mentor avatar"
            src={mentorData.avatar}
            sx={{
              width: IconSize.large,
              height: IconSize.large,
              borderRadius: Common.borderCircle,
            }}
          />
          <Stack
            sx={{
              flexDirection: 'row',
              paddingLeft: MetricSize.medium,
              fontSize: FontSize.small,
              fontFamily: FontFamilies.regular,
              color: Colors.grey,
            }}
          >
            <Typography>by</Typography>
            <Typography
              sx={{
                fontSize: FontSize.small,
                fontFamily: FontFamilies.bold,
                color: Colors.black,
                paddingLeft: MetricSize.small,
              }}
            >
              {mentorData.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ flexDirection: 'row' }}>
          <Rating color={Colors.orange} readOnly value={percentOfFeedback} />
          <Typography
            sx={{ fontSize: FontSize.small, fontFamily: FontFamilies.regular }}
          >{`(${numOfRating} Ratings)`}</Typography>
        </Stack>
        <Stack>
          <Button onClick={handleShareCourse}>
            <Stack
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Icon name="share" size="small" color="navy" />
              <Typography
                sx={{
                  fontFamily: FontFamilies.regular,
                  fontSize: FontSize.small,
                  paddingX: MetricSize.small,
                }}
              >
                Chia sẻ
              </Typography>
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: MetricSize.medium,
        }}
      >
        <Typography
          sx={{ fontSize: FontSize.small, fontFamily: FontFamilies.regular }}
        >
          Lĩnh vực:
        </Typography>
        <Chip
          sx={{
            marginLeft: MetricSize.medium,
            fontSize: FontSize.small,
            fontFamily: FontFamilies.regular,
            color: Colors.grey,
          }}
          label={field}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: MetricSize.medium,
        }}
      >
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
            color: Colors.orange,
          }}
        >
          {`Số lượng học viên đăng ký : ${numOfRegisterStudent}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
            color: Colors.orange,
          }}
        >
          {`Số lượng lớp đang mở : ${numOfOpenClass}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
            color: Colors.orange,
          }}
        >
          {`Ngày khai giảng lớp học mới: ${formatDate(openDate)}`}
        </Typography>
      </Stack>
      <Divider sx={{ marginTop: MetricSize.large }} />
      <Stack>
        <Typography
          sx={{
            fontFamily: FontFamilies.bold,
            fontSize: FontSize.small,
            marginTop: MetricSize.medium,
          }}
        >
          Miêu tả khóa học
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
            marginTop: MetricSize.medium,
            color: Colors.grey,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}
