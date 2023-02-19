import React from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { validationSchemaRegisterMentor } from '~/form/validation';
import { defaultValueMentorRegister } from '~/form/defaultValues';
import { REGISTER_MENTOR_FIELDS } from '~/form/schema';

export default function MentorRegisterForm() {
  const resolverSinIn = useYupValidationResolver(
    validationSchemaRegisterMentor
  );
  const mentorSignUpForm = useForm({
    defaultValues: defaultValueMentorRegister,
    resolver: resolverSinIn,
  });
  return (
    <Stack>
      <FormInput
        label="Họ và tên"
        control={mentorSignUpForm.control}
        name={REGISTER_MENTOR_FIELDS.name}
      />
      <Stack marginTop={2}>
        <FormInput
          label="Số điện thoại"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.phone}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="E-Mail"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.email}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Mật Khẩu"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.password}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Xác Nhận Mật Khẩu"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.confirm}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Giới thiệu bản thân"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.introduction}
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
