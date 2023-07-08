import {
  Divider,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { defaultValueBuyCourse } from '~/form/defaultValues';
import { BUY_COURSE_FIELDS } from '~/form/schema';
import { validationSchemaBuyCourse } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';

export default function BuyCourseForm() {
  const resolverBuyCourse = useYupValidationResolver(validationSchemaBuyCourse);
  const buyCourseHookForm = useForm({
    defaultValues: defaultValueBuyCourse,
    resolver: resolverBuyCourse,
  });
  return (
    <Stack
      sx={{
        paddingY: MetricSize.large_20,
        width: { xs: '100%', md: MetricSize.halfWidth },
        alignSelf: 'center',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          color: Color.tertiary,
          fontFamily: FontFamily.medium,
          fontSize: FontSize.medium_24,
        }}
      >
        Mua khóa học
      </Typography>
      <Divider sx={{ marginY: MetricSize.medium_15 }} />
      <Typography
        sx={{
          color: Color.tertiary,
          fontFamily: FontFamily.regular,
          fontSize: FontSize.small_18,
        }}
      >
        Thông tin người mua
      </Typography>
      <FormInput
        control={buyCourseHookForm.control}
        name={BUY_COURSE_FIELDS.name}
        label="Họ và tên"
      />
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <FormInput
          control={buyCourseHookForm.control}
          name={BUY_COURSE_FIELDS.name}
          label="Số điện thoại"
        />
      </Stack>
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <FormInput
          control={buyCourseHookForm.control}
          name={BUY_COURSE_FIELDS.name}
          label="Email"
        />
      </Stack>
      <Typography
        sx={{
          color: Color.tertiary,
          fontFamily: FontFamily.regular,
          fontSize: FontSize.small_18,
          marginTop: MetricSize.medium_15,
        }}
      >
        Thông tin khóa học
      </Typography>
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <FormInput
          control={buyCourseHookForm.control}
          name={BUY_COURSE_FIELDS.name}
          label="Tên Khóa Học"
        />
      </Stack>
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <FormInput
          control={buyCourseHookForm.control}
          name={BUY_COURSE_FIELDS.name}
          label="Tên Giảng Viên"
        />
      </Stack>
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <FormInput
          control={buyCourseHookForm.control}
          name={BUY_COURSE_FIELDS.name}
          label="Học Phí"
        />
      </Stack>
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <FormInput
          control={buyCourseHookForm.control}
          name={BUY_COURSE_FIELDS.name}
          label="Mã giới thiệu môn học"
        />
      </Stack>
      <Typography
        sx={{
          color: Color.tertiary,
          fontFamily: FontFamily.regular,
          fontSize: FontSize.small_18,
          marginTop: MetricSize.medium_15,
        }}
      >
        Hình thức mua
      </Typography>
      <Stack flexDirection="row">
        <FormControlLabel value="end" control={<Radio />} label="VnPay" />
        <FormControlLabel value="end" control={<Radio />} label="MoMo" />
      </Stack>
      <Button marginTop="medium_15" customVariant="normal">
        Mua Khóa Học
      </Button>
    </Stack>
  );
}
