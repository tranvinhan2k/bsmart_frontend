import React from 'react';
import { Stack, Box, Typography, Rating, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { MentorPayload } from '~/models/mentor';
import {
  Color,
  Common,
  FontFamily,
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
          flexWrap: 'wrap',
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
              paddingLeft: MetricSize.medium_15,
              fontSize: FontSize.small_16,
              fontFamily: FontFamily.regular,
              color: Color.grey,
            }}
          >
            <Typography>by</Typography>
            <Typography
              sx={{
                fontSize: FontSize.small_16,
                fontFamily: FontFamily.bold,
                color: Color.black,
                paddingLeft: MetricSize.small_5,
              }}
            >
              {mentorData.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ flexDirection: 'row' }}>
          <Rating color={Color.orange} readOnly value={percentOfFeedback} />
          <Typography
            sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.regular }}
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
                  fontFamily: FontFamily.regular,
                  fontSize: FontSize.small_16,
                  paddingX: MetricSize.small_5,
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
          marginTop: MetricSize.medium_15,
        }}
      >
        <Typography
          sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.regular }}
        >
          Lĩnh vực:
        </Typography>
        <Chip
          sx={{
            marginLeft: MetricSize.medium_15,
            fontSize: FontSize.small_16,
            fontFamily: FontFamily.regular,
            color: Color.grey,
          }}
          label={field}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: MetricSize.medium_15,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Color.orange,
          }}
        >
          {`Số lượng học viên đăng ký : ${numOfRegisterStudent}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Color.orange,
          }}
        >
          {`Số lượng lớp đang mở : ${numOfOpenClass}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Color.orange,
          }}
        >
          {`Ngày khai giảng lớp học mới: ${formatDate(openDate)}`}
        </Typography>
      </Stack>
      <Divider sx={{ marginTop: MetricSize.large_20 }} />
      <Stack>
        <Typography
          sx={{
            fontFamily: FontFamily.bold,
            fontSize: FontSize.small_16,
            marginTop: MetricSize.medium_15,
          }}
        >
          Miêu tả khóa học
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            marginTop: MetricSize.medium_15,
            color: Color.grey,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}
