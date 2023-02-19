import React from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { defaultValueStudentRegister } from '~/form/defaultValues';
import { validationSchemaRegisterStudent } from '~/form/validation';
import { REGISTER_STUDENT_FIELDS } from '~/form/schema';

export default function StudentRegisterForm() {
  const resolverSinIn = useYupValidationResolver(
    validationSchemaRegisterStudent
  );
  const studentSignUpForm = useForm({
    defaultValues: defaultValueStudentRegister,
    resolver: resolverSinIn,
  });
  return (
    <Stack>
      <FormInput
        label="Họ và tên"
        control={studentSignUpForm.control}
        name={REGISTER_STUDENT_FIELDS.name}
      />
      <Stack marginTop={2}>
        <FormInput
          label="E-Mail"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.email}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Mật Khẩu"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.password}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Xác Nhận Mật Khẩu"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.confirm}
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
