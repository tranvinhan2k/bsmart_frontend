import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGoogleLogin } from '@react-oauth/google';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { validationSchemaRegisterMentor } from '~/form/validation';
import { defaultValueMentorRegister } from '~/form/defaultValues';
import { REGISTER_MENTOR_FIELDS } from '~/form/schema';
import { RegisterMentorDataPayload } from '~/models/form';
import { PASSWORD_MATCHED } from '~/form/message';
import accountApi, { RequestRegisterPayload } from '~/api/users';
import toast from '~/utils/toast';

export default function MentorRegisterForm() {
  const resolverSignUp = useYupValidationResolver(
    validationSchemaRegisterMentor
  );
  const mentorSignUpForm = useForm({
    defaultValues: defaultValueMentorRegister,
    resolver: resolverSignUp,
  });

  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation({
    mutationFn: accountApi.signUp,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (error) => console.log(error),
  });

  const handleRegisterSubmit = async (data: RegisterMentorDataPayload) => {
    const params: RequestRegisterPayload = {
      email: data.email,
      fullName: data.name,
      password: data.password,
      phone: data.phone,
      role: 'TEACHER',
    };
    const id = toast.loadToast('Đang đăng kí...');
    try {
      await mutation.mutateAsync(params);
      toast.updateSuccessToast(id, 'Đăng kí thành công!');
    } catch (error: any) {
      toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    }
  };
  return (
    <Stack>
      <FormInput
        label="Họ và tên"
        placeholder="Nguyen Van A"
        control={mentorSignUpForm.control}
        name={REGISTER_MENTOR_FIELDS.name}
      />
      <Stack marginTop={2}>
        <FormInput
          label="E-Mail"
          placeholder="example@gmail.com"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.email}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          label="Số điện thoại"
          placeholder="+843456789"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.phone}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          variant="password"
          label="Mật Khẩu"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.password}
          helperText={PASSWORD_MATCHED}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          variant="password"
          label="Xác Nhận Mật Khẩu"
          control={mentorSignUpForm.control}
          name={REGISTER_MENTOR_FIELDS.confirm}
        />
      </Stack>
      <Stack marginTop={2}>
        <Button
          onClick={mentorSignUpForm.handleSubmit(handleRegisterSubmit)}
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
