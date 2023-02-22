import React from 'react';
import { Stack, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { formatMoney } from '~/utils/money';
import Button from '~/components/atoms/Button';

interface CourseDetailSidebarSectionProps {
  unitPrice: number;
  image: string;
}

export default function CourseDetailSidebarSection({
  image,
  unitPrice,
}: CourseDetailSidebarSectionProps) {
  const navigate = useNavigate();

  const handleNavigateBuyCousePage = () => {
    navigate('/buy-course');
  };

  return (
    <Stack>
      <Stack sx={{ borderRadius: '5px', boxShadow: 5 }}>
        <Box
          sx={{ borderRadius: '5px' }}
          component="img"
          src={image}
          alt="course image"
        />
        <Stack
          sx={{
            marginTop: MetricSize.large_20,
            paddingX: MetricSize.medium_15,
            paddingBottom: MetricSize.medium_15,
          }}
        >
          <Typography
            sx={{ fontFamily: FontFamily.bold, fontSize: FontSize.large_45 }}
          >
            {formatMoney(unitPrice)}
          </Typography>
          <Button
            onClick={handleNavigateBuyCousePage}
            marginTop="medium_15"
            customVariant="normal"
          >
            Đăng kí khóa học
          </Button>
          <Button marginTop="medium_15" customVariant="outlined">
            Link Giới Thiệu
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
