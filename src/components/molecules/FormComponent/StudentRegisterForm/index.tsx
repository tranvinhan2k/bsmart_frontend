import React from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import { defaultValueStudentRegister } from '~/form/defaultValues';
import { validationSchemaRegisterStudent } from '~/form/validation';
import { REGISTER_STUDENT_FIELDS } from '~/form/schema';
import { RegisterStudentDataPayload } from '~/models/form';
import { PASSWORD_MATCHED } from '~/form/message';
import { RequestRegisterPayload } from '~/api/users';
import toast from '~/utils/toast';
import { useMutationSignUp, useYupValidationResolver } from '~/hooks';

export default function StudentRegisterForm() {
  const navigate = useNavigate();
  const resolverSignUp = useYupValidationResolver(
    validationSchemaRegisterStudent
  );
  const studentSignUpForm = useForm({
    defaultValues: defaultValueStudentRegister,
    resolver: resolverSignUp,
  });
  const mutation = useMutationSignUp();

  const handleGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (error) => console.log(error),
  });

  const handleRegisterSubmitData = async (data: RegisterStudentDataPayload) => {
    console.log(data.birthDay, typeof data.birthDay);

    const params: RequestRegisterPayload = {
      email: data.email.toLowerCase(),
      fullName: data.name,
      password: data.password,
      phone: data.phone,
      role: 'STUDENT',
      birthDay: data.birthDay,
      introduce: data.introduce,
    };
    const id = toast.loadToast('Đang đăng kí tài khoản ...');
    try {
      await mutation.mutateAsync(params);
      navigate('/login');
      toast.updateSuccessToast(id, `Đăng kí thành công!`);
    } catch (error: any) {
      toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    }
  };
  return (
    <Stack>
      <FormInput
        label="Họ và tên"
        placeholder="Nguyễn Văn A"
        control={studentSignUpForm.control}
        name={REGISTER_STUDENT_FIELDS.name}
      />
      <Stack marginTop={2}>
        <FormInput
          label="E-Mail"
          placeholder="example@gmail.com"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.email}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Số điện thoại"
          placeholder="0362456xxx"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.phone}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          variant="date"
          label="Ngày Sinh"
          placeholder="01/01/2000"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.birthDay}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          variant="multiline"
          label="Giới thiệu bản thân"
          placeholder="Tôi là giáo viên/ học sinh ..."
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.introduce}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          variant="password"
          label="Mật Khẩu"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.password}
          helperText={PASSWORD_MATCHED}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          variant="password"
          label="Xác Nhận Mật Khẩu"
          control={studentSignUpForm.control}
          name={REGISTER_STUDENT_FIELDS.confirm}
        />
      </Stack>
      <Stack marginTop={2}>
        <Button
          onClick={studentSignUpForm.handleSubmit(handleRegisterSubmitData)}
          customVariant="form"
        >
          Đăng kí
        </Button>
      </Stack>
      <Stack marginTop={2}>
        <Button onClick={() => handleGoogle()} customVariant="google">
          Đăng nhập với Google
        </Button>
      </Stack>
    </Stack>
  );
}
