import React from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';

export default function MentorRegisterForm() {
  const form = useForm();
  return (
    <Stack>
      <FormInput label="Họ và tên" control={form.control} name="name" />
      <Stack marginTop={2}>
        <FormInput label="Số điện thoại" control={form.control} name="name" />
      </Stack>
      <Stack marginTop={2}>
        <FormInput label="E-Mail" control={form.control} name="name" />
      </Stack>
      <Stack marginTop={2}>
        <FormInput label="Mật Khẩu" control={form.control} name="name" />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Xác Nhận Mật Khẩu"
          control={form.control}
          name="name"
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Giới thiệu bản thân"
          control={form.control}
          name="name"
        />
      </Stack>
      <Stack marginTop={2}>
        <Button customVariant="form">Đăng kí</Button>
      </Stack>
      <Stack marginTop={2}>
        <Button customVariant="google">Đăng nhập với Google</Button>
      </Stack>
    </Stack>
  );
}
