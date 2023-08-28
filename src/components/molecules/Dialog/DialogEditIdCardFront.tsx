import {
  Button as MuiButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { defaultValueEditIdentityFront } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditIdentityFrontFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import { ProfileImgType } from '~/constants/profile';
import { selectProfile } from '~/redux/user/selector';
import { toastMsgError } from '~/utils/common';
import {
  useDispatchProfile,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { useMutationEditIdentityFront } from '~/hooks/useMutationEditIdentityFront';
import { validationSchemaEditIdentityFront } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import UpdateProfileButton from '~/components/atoms/Button/UpdateProfileButton';
import toast from '~/utils/toast';
import { useAIConvert } from '~/hooks/useAIConvert';
import { compareDate, formatDate, isValidDate } from '~/utils/date';

interface DialogEditIdCardFrontProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogEditIdCardFront({
  open,
  handleOnClose,
}: DialogEditIdCardFrontProps) {
  const profile = useSelector(selectProfile);
  const resolverEditIdentityFront = useYupValidationResolver(
    validationSchemaEditIdentityFront
  );

  const {
    control: controlEditIdentityFront,
    handleSubmit: handleSubmitEditIdentityFront,
    reset: resetEditIdentityFront,
    formState,
  } = useForm({
    defaultValues: defaultValueEditIdentityFront,
    resolver: resolverEditIdentityFront,
  });

  const { mutateAsync } = useAIConvert();

  const { handleTryCatch } = useTryCatch('xác thực căn cước công dân');

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditIdentityFront } =
    useMutationEditIdentityFront();

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công...';

  const handleVerifyIdentity = async (image: any) => {
    const value = await handleTryCatch(async () => {
      const response = await mutateAsync(image);

      console.log('response', response);

      const isValidName =
        response?.name?.toLowerCase() === profile.fullName.toLowerCase();
      const isValidGender =
        (response?.sex === 'NAM' && profile.gender === 'MALE') ||
        (response?.sex === 'NỮ' && profile.gender === 'FEMALE');
      const isValidDOB =
        formatDate(new Date(profile.birthday).toISOString()) === response?.dob;

      switch (true) {
        case !isValidDOB:
          toast.notifyErrorToast(
            `Ngày sinh không trùng với dữ liệu nhập vào: ${formatDate(
              new Date(profile.birthday).toISOString()
            )} và ${response?.dob} }`
          );
          return false;
        case !isValidGender:
          toast.notifyErrorToast(
            `Giới tính không trùng với dữ liệu nhập vào: ${response?.sex} và ${profile.gender} }`
          );
          return false;
        case !isValidName:
          toast.notifyErrorToast(
            `Tên không trùng với dữ liệu nhập vào: ${response?.name} và ${profile.fullName} }`
          );
          return false;
        default:
          return true;
      }
    });
    return value;
  };

  const handleSubmitIdentityFront = async (
    data: EditIdentityFrontFormDataPayload
  ) => {
    const isValidIdentity = true;
    // const isValidIdentity = await handleVerifyIdentity(data.identityFront);

    if (isValidIdentity) {
      const params: EditImageProfilePayload = {
        imageType: ProfileImgType.FRONTCI,
        file: data.identityFront,
      };
      const id = toast.loadToast(toastMsgLoading);
      try {
        await mutateEditIdentityFront(params);
        handleOnClose();
        handleDispatchProfile();
        toast.updateSuccessToast(id, toastMsgSuccess);
        resetEditIdentityFront();
      } catch (error: unknown) {
        toast.updateFailedToast(
          id,
          'Cập nhật hình ảnh thất bại. Vui lòng xem lại hình ảnh và thử lại.'
        );
      }
    }
  };

  const handleOnCloseCustom = () => {
    resetEditIdentityFront();
    handleOnClose();
  };

  return (
    <Dialog open={open} onClose={handleOnCloseCustom} fullWidth>
      <DialogTitle>Cập nhật CMND/CCCD (Mặt trước)</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmitEditIdentityFront(handleSubmitIdentityFront)}
        >
          <FormInput
            control={controlEditIdentityFront}
            name={EDIT_IMAGE_PROFILE_FIELDS.identityFront}
            variant="image"
            previewImgHeight={539.8 / 2}
            previewImgWidth={856 / 2}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            mt={2}
          >
            <MuiButton
              color="error"
              fullWidth
              size="large"
              type="button"
              variant="contained"
              onClick={handleOnCloseCustom}
              sx={{ fontFamily: FontFamily.bold }}
            >
              Hủy
            </MuiButton>
            <UpdateProfileButton
              role={profile.roles?.[0]?.code}
              isFormDisabled={!formState.isDirty}
              mentorProfileStatus={profile?.mentorProfile?.status}
            />
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
