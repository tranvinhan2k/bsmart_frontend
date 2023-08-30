import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import DialogEditAvatarEditProfile from '~/components/molecules/Dialog/DialogEditAvatarEditProfile';
import DialogEditIdCardBackEditProfile from '~/components/molecules/Dialog/DialogEditIdCardBackEditProfile';
import DialogEditIdCardFrontEditProfile from '~/components/molecules/Dialog/DialogEditIdCardFrontEditProfile';
import { genderData } from '~/constants';
import { image } from '~/constants/image';
import { ProfileImgType } from '~/constants/profile';
import { defaultValueUpdateMentorProfileRequest } from '~/form/defaultValues';
import { TRY_CATCH_AXIOS_DEFAULT_ERROR } from '~/form/message';
import { validationSchemaUpdateMentorProfileRequest2 } from '~/form/validation';
import { useDispatchGetAllSubjects, useYupValidationResolver } from '~/hooks';
import { useGetMentorEditProfile } from '~/hooks/user/useGetEditProfile';
import { useMutationSendUpdateMentorProfileRequest } from '~/hooks/user/useMutationSendUpdateMentorProfileRequest';
import {
  useMutationUpdateMentorProfileRequest,
  UseMutationUpdateMentorProfileRequestPayload,
} from '~/hooks/user/useMutationUpdateMentorProfileRequest';
import {
  DropdownDynamicValueInputBooleanDataPayload,
  DropdownDynamicValueInputNumberDataPayload,
  DropdownDynamicValueInputStringDataPayload,
} from '~/models';
import {
  FormInputVariant,
  UpdateMentorProfileRequestProfileFormDefault,
} from '~/models/form';
import toast from '~/utils/toast';
import DialogDegreeEditProfile from './DialogDegreeEditProfile';
import sx from './style';
import UpdateMentorProfileDegree from './UpdateMentorProfileDegree';
import UpdateMentorProfileRequestSkill from './UpdateMentorProfileRequestSkill';

interface FormFieldsPersonalProps {
  name: string;
  variant: FormInputVariant;
  label: string;
  placeholder?: string;
  dataDropdownDynamicValue?: (
    | DropdownDynamicValueInputBooleanDataPayload
    | DropdownDynamicValueInputNumberDataPayload
    | DropdownDynamicValueInputStringDataPayload
  )[];
  size: number;
}

interface CIItemType {
  id: number;
  img: string;
  onClickAction: () => void;
  text: string;
  toolTipArrowPlacement: TooltipProps['placement'];
}

const enum IntroduceExperienceNoteText {
  label0 = 'Mục giới thiệu giáo viên hãy viết về chính bản thân mình.',
  label1 = 'Mục kinh nghiệm giáo viên hãy viết về quá trình tích lũy kiến thức chuyên môn.',
  label2 = 'Mục giới thiệu được ưu tiên đưa lên trang tìm kiếm giáo viên.',
  label3 = 'Cả 2 mục đều được hiển thị đầu đủ trong trang chi tiết giáo viên.',
}
const introduceExperienceNoteList = [
  { id: 0, label: IntroduceExperienceNoteText.label0 },
  { id: 1, label: IntroduceExperienceNoteText.label1 },
  { id: 2, label: IntroduceExperienceNoteText.label2 },
  { id: 3, label: IntroduceExperienceNoteText.label3 },
];

const enum CertificateNoteText {
  label0 = 'Kích thước tệp tối đa là 10 MB.',
  label1 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
  label2 = 'Không đặt mật khẩu bảo vệ file của bạn.',
  label3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
  label41 = 'Định dạng hỗ trợ',
  label42 = '.pdf, .doc, .docx',
}
const certificateNoteList = [
  { id: 0, label: CertificateNoteText.label0 },
  { id: 1, label: CertificateNoteText.label1 },
  { id: 2, label: CertificateNoteText.label2 },
  { id: 3, label: CertificateNoteText.label3 },
];
const imgSizeReduction = 0.49;

export default function UpdateMentorProfileRequestSection() {
  const { profile, refetch } = useGetMentorEditProfile();
  const { optionSubjects: subjects } = useDispatchGetAllSubjects();
  const { mutateAsync: mutateUpdate } = useMutationUpdateMentorProfileRequest();
  const { mutateAsync: mutateSend } =
    useMutationSendUpdateMentorProfileRequest();

  const resolverUpdate = useYupValidationResolver(
    validationSchemaUpdateMentorProfileRequest2
  );
  const { control, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: defaultValueUpdateMentorProfileRequest,
    resolver: resolverUpdate,
  });

  const {
    fields: mentorSkillsFields,
    append: appendMentorSkillsField,
    remove: removeMentorSkillsField,
  } = useFieldArray({
    name: 'mentorSkills',
    control,
    rules: {
      required: 'Hãy nhập ít nhất 1 chuyên môn',
    },
  });
  const appendSkill = () => {
    appendMentorSkillsField({});
  };
  const removeSkill = (order: number) => {
    removeMentorSkillsField(order);
  };

  const {
    fields: degreeFields,
    append: appendDegreeField,
    remove: removeDegreeField,
  } = useFieldArray({
    name: 'degreeList',
    control,
    rules: {
      required: 'Hãy nhập ít nhất 1 bằng',
    },
  });

  const [degreeIdsToDelete, setDegreeIdsToDelete] = useState<number[]>([]);
  useEffect(() => {
    if (profile) {
      if (profile.userDto.fullName)
        defaultValueUpdateMentorProfileRequest.fullName =
          profile.userDto.fullName;
      if (profile.userDto.birthday)
        defaultValueUpdateMentorProfileRequest.birthday =
          profile.userDto.birthday;
      if (profile.userDto.address)
        defaultValueUpdateMentorProfileRequest.address =
          profile.userDto.address;
      if (profile.userDto.phone)
        defaultValueUpdateMentorProfileRequest.phone = profile.userDto.phone;
      if (profile.userDto.gender) {
        defaultValueUpdateMentorProfileRequest.gender =
          genderData.find((item) => item.value === profile.userDto.gender) ??
          genderData[0];
      }
      if (profile.userDto.userImages) {
        defaultValueUpdateMentorProfileRequest.identityFront =
          profile.userDto?.userImages?.find(
            (img: any) => img?.type === ProfileImgType.FRONTCI
          )?.url || '';
        defaultValueUpdateMentorProfileRequest.identityBack =
          profile.userDto?.userImages?.find(
            (img: any) => img?.type === ProfileImgType.BACKCI
          )?.url || '';
        defaultValueUpdateMentorProfileRequest.avatar =
          profile.userDto?.userImages?.find(
            (img: any) => img?.type === ProfileImgType.AVATAR
          )?.url || '';
        defaultValueUpdateMentorProfileRequest.degreeList =
          profile.userDto.userImages.filter(
            (item: any) => item.type === ProfileImgType.DEGREE
          );
      }

      if (profile.userDto.mentorProfile.introduce)
        defaultValueUpdateMentorProfileRequest.introduce =
          profile.userDto.mentorProfile.introduce;
      if (profile.userDto.mentorProfile.workingExperience)
        defaultValueUpdateMentorProfileRequest.workingExperience =
          profile.userDto.mentorProfile.workingExperience;
      if (profile.userDto.mentorProfile.mentorSkills) {
        defaultValueUpdateMentorProfileRequest.mentorSkills =
          profile.userDto.mentorProfile.mentorSkills.map((item) => {
            const subjectTmp = subjects.find(
              (subject) => subject.id === item.skillId
            );
            return {
              skillId: {
                id: Number(subjectTmp?.id) ?? 0,
                label: subjectTmp?.label ?? '',
                value: Number(subjectTmp?.value) ?? 0,
              },
              yearOfExperiences: item.yearOfExperiences,
            };
          });
      }
      reset(defaultValueUpdateMentorProfileRequest);
    }
  }, [profile, subjects, reset]);

  const appendDegree = () => {
    appendDegreeField(null);
  };
  const removeDegree = (index: number, certificate: any) => {
    removeDegreeField(index);
    if (certificate.type === ProfileImgType.DEGREE) {
      setDegreeIdsToDelete((prev) => {
        return [...prev, certificate.id];
      });
    }
  };

  const formFieldsPersonal0: FormFieldsPersonalProps[] = [
    {
      name: 'fullName',
      label: 'Họ tên',
      placeholder: 'Nhập họ tên',
      variant: 'text',
      size: 6,
    },
    {
      name: 'gender',
      label: 'Giới tính',
      placeholder: '',
      variant: 'dropdownDynamicValue',
      size: 6,
      dataDropdownDynamicValue: genderData,
    },
    {
      name: 'address',
      label: 'Địa chỉ',
      placeholder: 'Nhập địa chỉ',
      variant: 'text',
      size: 12,
    },
    {
      name: 'birthday',
      label: 'Ngày sinh',
      placeholder: 'Nhập ngày sinh',
      variant: 'date',
      size: 6,
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      placeholder: 'Nhập số điện thoại',
      variant: 'text',
      size: 6,
    },
  ];

  const toastMsgLoading = 'Đang lưu...';
  const toastMsgSuccess = 'Lưu thành công';
  const toastMsgError = (error: any): string => {
    return `Lưu không thành công: ${
      error.message || TRY_CATCH_AXIOS_DEFAULT_ERROR
    }`;
  };
  const handleSubmitSuccess = async (
    data: UpdateMentorProfileRequestProfileFormDefault
  ) => {
    if (profile) {
      const params: UseMutationUpdateMentorProfileRequestPayload = {
        // avatar: data.avatar,
        fullName: data.fullName,
        birthday: data.birthday,
        address: data.address,
        phone: data.phone,
        gender: data.gender ? data.gender.value : genderData[0].value,
        userImages: profile.userDto.userImages,
        mentorProfile: {
          id: profile.userDto.mentorProfile.id,
          introduce: data.introduce,
          workingExperience: data.workingExperience,
          mentorSkills: profile.userDto.mentorProfile.mentorSkills,
        },
        email: profile.userDto.email,
        status: profile.userDto.status,
        linkedinLink: profile.userDto.linkedinLink,
        facebookLink: profile.userDto.facebookLink,
        website: profile.userDto.website,
        verified: profile.userDto.verified,
      };
      console.log('params', params);
      // const id = toast.loadToast(toastMsgLoading);
      // try {
      //   await mutateUpdate(params);
      //   refetch();
      //   toast.updateSuccessToast(id, toastMsgSuccess);
      // } catch (error: any) {
      //   toast.updateFailedToast(id, toastMsgError(error));
      // }
    }
  };

  const toastMsgLoading1 = 'Đang Gửi...';
  const toastMsgSuccess1 = 'Gửi thành công';
  const toastMsgError1 = (error: any): string => {
    return `Gửi không thành công: ${
      error || error.message || TRY_CATCH_AXIOS_DEFAULT_ERROR
    }`;
  };
  const handleSubmitRequestToManager = async () => {
    const id = toast.loadToast(toastMsgLoading1);
    try {
      if (profile) {
        await mutateSend(Number(profile.id));
        refetch();
        toast.updateSuccessToast(id, toastMsgSuccess1);
      } else {
        toast.updateFailedToast(
          id,
          toastMsgError1(
            `Gửi không thành công: ${TRY_CATCH_AXIOS_DEFAULT_ERROR}`
          )
        );
      }
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError1(error));
    }
  };

  const [openAvatar, setOpenAvatar] = useState<boolean>(false);
  const [openIdentityFront, setOpenIdentityFront] = useState<boolean>(false);
  const [openIdentityBack, setOpenIdentityBack] = useState<boolean>(false);
  const [openDegree, setOpenDegree] = useState<boolean>(false);

  const handleToggleAvatar = () => setOpenAvatar(!openAvatar);
  const handleToggleIdentityFront = () =>
    setOpenIdentityFront(!openIdentityFront);
  const handleToggleIdentityBack = () => setOpenIdentityBack(!openIdentityBack);
  const handleToggleOpenDegree = () => setOpenDegree(!openDegree);

  // const avatarLink = handleGetImageLink(profile ? profile?.userDto.userImages, 'AVATAR' );
  const avatarLink =
    profile?.userDto.userImages.find(
      (img: any) => img?.type === ProfileImgType.AVATAR
    )?.url || image.noAvatar;

  const CI: CIItemType[] = [
    {
      id: 0,
      img:
        profile?.userDto.userImages.find(
          (img: any) => img?.type === ProfileImgType.FRONTCI
        )?.url || image.noAvatar,
      onClickAction: handleToggleIdentityFront,
      text: 'CMND/CCCD Mặt trước',
      toolTipArrowPlacement: 'bottom',
    },
    {
      id: 2,
      img:
        profile?.userDto.userImages.find(
          (img: any) => img?.type === ProfileImgType.BACKCI
        )?.url || image.noAvatar,
      onClickAction: handleToggleIdentityBack,
      text: 'CMND/CCCD Mặt sau',
      toolTipArrowPlacement: 'bottom',
    },
  ];

  return (
    <Box sx={sx.boxWrapper}>
      <Typography component="h3" sx={sx.formTitle}>
        Thông tin cá nhân
      </Typography>
      <Divider sx={{ marginTop: 1 }} />
      <form onSubmit={handleSubmit(handleSubmitSuccess)}>
        {/* PERSONAL */}
        <Grid container columnSpacing={3}>
          {formFieldsPersonal0.map((field) => (
            <Grid item xs={field.size} key={field.name}>
              <Typography sx={sx.formLabel}>{field.label}</Typography>
              <FormInput
                control={control}
                name={field.name}
                variant={field.variant}
                placeholder={field.placeholder}
                dataDropdownDynamicValue={field.dataDropdownDynamicValue}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Typography sx={sx.formLabel} textAlign="center">
                Ảnh đại diện
              </Typography>
              <Button sx={{ borderRadius: 5 }} onClick={handleToggleAvatar}>
                <Tooltip title="Cập nhật" arrow placement="bottom">
                  <Box
                    alt="mentor avatar"
                    component="img"
                    src={avatarLink}
                    sx={{
                      width: 300,
                      height: 300,
                      borderRadius: 5,
                    }}
                  />
                </Tooltip>
              </Button>
              {/* <Typography sx={SX_FORM_LABEL}>{item.text}</Typography> */}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ md: 'column', lg: 'row' }}
              justifyContent={{ md: 'flex-start', lg: 'center' }}
              alignItems={{ md: 'center', lg: 'flex-start' }}
              spacing={2}
            >
              {CI.map((item) => (
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  key={item.id}
                >
                  <Typography sx={sx.formLabel} textAlign="center">
                    {item.text}
                  </Typography>
                  <Button onClick={item.onClickAction} sx={{ borderRadius: 5 }}>
                    <Tooltip
                      title="Cập nhật"
                      arrow
                      placement={item.toolTipArrowPlacement}
                    >
                      <Box
                        alt="mentor avatar"
                        component="img"
                        src={item.img}
                        sx={{
                          width: '100%',
                          maxWidth: 370,
                          height: 200,
                          borderRadius: 5,
                        }}
                        onClick={item.onClickAction}
                      />
                    </Tooltip>
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* DEGREE */}
        {/* <Grid item xs={12}>
          <Typography sx={sx.formLabel}>
            Danh sách bằng cấp / CV thêm
          </Typography>
          <Button
            variant="contained"
            color="miSmartOrange"
            sx={{ width: '50%' }}
            fullWidth
            onClick={handleToggleOpenDegree}
          >
            Thêm bằng cấp
          </Button>
          <Grid container spacing={2} mb={1}>
            {degreeFields.map((field, index) => {
              return (
                <Fragment key={field.id}>
                  <Grid item xs={12}>
                    <Typography sx={sx.formLabel}>
                      {`Tài liệu bằng cấp / CV ${1 + index}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="stretch"
                      spacing={2}
                    >
                      <FormInput
                        control={control}
                        name={`degreeList[${index}]`}
                        variant="fileRequireYup"
                        placeholder=""
                      />
                      <Button
                        color="error"
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          removeDegree(index, getValues(`degreeList[${index}]`))
                        }
                      >
                        <Icon name="delete" size="medium" />
                      </Button>
                    </Stack>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>

          <Box mt={4}>
            <Button
              color="success"
              size="large"
              variant="outlined"
              onClick={() => appendDegree()}
            >
              <Icon name="add" size="medium" />
            </Button>
          </Box>
        </Grid> */}

        {/* BUTTON */}

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          mt={2}
        >
          <Button
            variant="contained"
            color="miSmartOrange"
            type="submit"
            fullWidth
            // disabled={!formState.isDirty || Boolean(profile?.id)}
          >
            Lưu lại
          </Button>
          <Button
            variant="contained"
            color="miSmartOrange"
            fullWidth
            onClick={handleSubmitRequestToManager}
            disabled={profile && profile.id === null}
          >
            {profile?.id ? 'Đã gửi yêu cẩu' : 'Gửi yêu cầu'}
          </Button>
        </Stack>
      </form>
      <UpdateMentorProfileRequestSkill />
      <UpdateMentorProfileDegree />

      <DialogEditAvatarEditProfile
        open={openAvatar}
        handleOnClose={handleToggleAvatar}
      />
      <DialogEditIdCardFrontEditProfile
        open={openIdentityFront}
        handleOnClose={handleToggleIdentityFront}
      />
      <DialogEditIdCardBackEditProfile
        open={openIdentityBack}
        handleOnClose={handleToggleIdentityBack}
      />
      <DialogDegreeEditProfile
        open={openDegree}
        handleOnClose={handleToggleOpenDegree}
      />
    </Box>
  );
}
