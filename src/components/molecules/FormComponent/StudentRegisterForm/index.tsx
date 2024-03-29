import { Stack, Grid, Typography, Box } from '@mui/material';
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
import { genderData } from '~/constants';
import { image } from '~/constants/image';

import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

export default function StudentRegisterForm({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const resolverSignUp = useYupValidationResolver(
    validationSchemaRegisterStudent
  );
  const studentSignUpForm = useForm({
    defaultValues: defaultValueStudentRegister,
    resolver: resolverSignUp,
  });
  const mutation = useMutationSignUp();

  const handleGoogle = () => {
    window.location.href = 'https://mismart.tech/oauth2/authorization/google';
  };

  const handleRegisterSubmitData = async (data: RegisterStudentDataPayload) => {
    const params: RequestRegisterPayload = {
      email: data.email.toLowerCase(),
      fullName: data.name,
      password: data.password,
      phone: data.phone,
      role: 'STUDENT',
      birthDay: data.birthDay,
      gender: (data.gender as any).value,
    };
    const id = toast.loadToast('Đang đăng kí tài khoản ...');
    try {
      await mutation.mutateAsync(params);
      onOpen();
      toast.updateSuccessToast(id, `Đăng kí thành công!`);
    } catch (error: any) {
      toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    }
  };
  return (
    <Grid container>
      <Grid padding={2} item xs={12} lg={6}>
        <Stack
          sx={{ justifyContent: 'center', alignItems: 'center', padding: 2 }}
        >
          <Typography sx={globalStyles.textTitle}>Đăng kí học sinh</Typography>
        </Stack>
        <Stack>
          <FormInput
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            control={studentSignUpForm.control}
            name={REGISTER_STUDENT_FIELDS.name}
          />
          <Stack marginTop={1}>
            <FormInput
              label="E-Mail"
              placeholder="example@gmail.com"
              control={studentSignUpForm.control}
              name={REGISTER_STUDENT_FIELDS.email}
            />
          </Stack>
          <Stack marginTop={1}>
            <FormInput
              label="Số điện thoại"
              placeholder="0362456xxx"
              control={studentSignUpForm.control}
              name={REGISTER_STUDENT_FIELDS.phone}
            />
          </Stack>
          <Stack marginTop={1}>
            <FormInput
              data={genderData}
              variant="dropdown"
              label="Giới tính"
              placeholder="Chọn giới tính của bạn"
              control={studentSignUpForm.control}
              name={REGISTER_STUDENT_FIELDS.gender}
            />
          </Stack>
          <Stack marginTop={1}>
            <FormInput
              variant="date"
              label="Ngày Sinh"
              placeholder="01/01/2000"
              control={studentSignUpForm.control}
              name={REGISTER_STUDENT_FIELDS.birthDay}
            />
          </Stack>
          <Stack marginTop={1}>
            <FormInput
              variant="password"
              label="Mật Khẩu"
              control={studentSignUpForm.control}
              name={REGISTER_STUDENT_FIELDS.password}
              helperText={PASSWORD_MATCHED}
            />
          </Stack>
          <Stack marginTop={1}>
            <FormInput
              variant="password"
              label="Xác Nhận Mật Khẩu"
              control={studentSignUpForm.control}
              name={REGISTER_STUDENT_FIELDS.confirm}
            />
          </Stack>
          <Stack marginTop={1}>
            <FormInput
              variant="boolean"
              placeholder="Tôi đồng ý với <a href=/policy target=_blank><strong>Điều khoản dịch vụ của hệ thống</strong></a>"
              control={studentSignUpForm.control}
              name={REGISTER_STUDENT_FIELDS.isPolicy}
            />
          </Stack>
          <Stack marginTop={2}>
            <Button
              onClick={studentSignUpForm.handleSubmit(
                handleRegisterSubmitData,
                handleConsoleError
              )}
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
      <Grid padding={3} item xs={12} lg={6}>
        <Stack
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={image.student}
            alt="React Logo"
            sx={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
