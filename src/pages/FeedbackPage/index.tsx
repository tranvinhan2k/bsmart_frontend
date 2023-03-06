import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import FeedbackSection from '~/containers/FeedbackSection';
import { scrollToTop } from '~/utils/common';

export default function FeedbackPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Stack
      sx={{
        width: { xs: '100%', md: MetricSize.halfWidth },
        marginY: MetricSize.large_30,
        alignSelf: 'center',
        boxShadow: 3,
        padding: MetricSize.medium_15,
      }}
    >
      <Typography
        sx={{
          fontSize: FontSize.medium_28,
          fontFamily: FontFamily.bold,
          textAlign: 'center',
          color: Color.orange,
          paddingY: MetricSize.small_5,
        }}
      >
        ĐÓNG GÓP Ý KIẾN CHO CHÚNG TÔI VỀ CHẤT LƯỢNG GIẢNG DẠY CỦA GIẢNG VIÊN
      </Typography>

      <Typography
        sx={{
          paddingY: MetricSize.small_5,
          fontSize: FontSize.small_18,
          fontFamily: FontFamily.regular,
          textAlign: 'center',
          color: Color.grey,
        }}
      >
        Hãy cho chúng tôi biết cách chúng tôi có thể cải thiện trải nghiệm học
        tập của bạn.
      </Typography>
      <Typography
        sx={{
          paddingY: MetricSize.small_5,
          fontSize: FontSize.small_18,
          fontFamily: FontFamily.regular,
          textAlign: 'center',
          color: Color.grey,
        }}
      >
        Hãy chọn giảng viên và môn học bên dưới và góp ý thật chi tiết nhé.
      </Typography>
      <FeedbackSection />
    </Stack>
  );
}
