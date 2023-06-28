import { Stack, Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import { validationSchemaRegisterMentor } from '~/form/validation';
import { defaultValueMentorRegister } from '~/form/defaultValues';
import { REGISTER_MENTOR_FIELDS } from '~/form/schema';
import { RegisterMentorDataPayload } from '~/models/form';
import { PASSWORD_MATCHED } from '~/form/message';
import { RequestRegisterPayload } from '~/api/users';
import toast from '~/utils/toast';
import { useMutationSignUp, useYupValidationResolver } from '~/hooks';
import RegisterTeacher from '~/assets/images/register_teacher.svg';
import { genderData } from '~/constants';

export default function MentorRegisterForm({ onOpen }: { onOpen: () => void }) {
  const resolverSignUp = useYupValidationResolver(
    validationSchemaRegisterMentor
  );
  const mentorSignUpForm = useForm({
    defaultValues: defaultValueMentorRegister,
    resolver: resolverSignUp,
  });

  // Mutations
  const mutation = useMutationSignUp();
  const navigate = useNavigate();

  const handleGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (error) => console.log(error),
  });

  const handleRegisterSubmit = async (data: RegisterMentorDataPayload) => {
    const params: RequestRegisterPayload = {
      email: data.email.toLowerCase(),
      fullName: data.name,
      password: data.password,
      phone: data.phone,
      role: 'TEACHER',
      birthDay: data.birthDay,
      gender: (data.gender as any).value,
    };
    const id = toast.loadToast('Đang đăng kí...');
    try {
      await mutation.mutateAsync(params);
      onOpen();
      console.log('dang ki thanh cong ');

      toast.updateSuccessToast(id, `Đăng kí thành công!`);
    } catch (error: any) {
      toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    }
  };
  return (
    <Grid container>
      <Grid padding={3} item xs={12} lg={6}>
        <Stack
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={RegisterTeacher} alt="logo teacher" />
        </Stack>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Stack>
          <FormInput
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
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
              placeholder="0362456xxx"
              control={mentorSignUpForm.control}
              name={REGISTER_MENTOR_FIELDS.phone}
            />
          </Stack>
          <Stack marginTop={2}>
            <FormInput
              variant="date"
              label="Ngày Sinh"
              placeholder="01/01/2000"
              control={mentorSignUpForm.control}
              name={REGISTER_MENTOR_FIELDS.birthDay}
            />
          </Stack>
          <Stack marginTop={2}>
            <FormInput
              data={genderData}
              variant="dropdown"
              label="Giới tính"
              placeholder="Chọn giới tính của bạn"
              control={mentorSignUpForm.control}
              name={REGISTER_MENTOR_FIELDS.gender}
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
          <Stack marginTop={4}>
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
      </Grid>
    </Grid>
  );
}
