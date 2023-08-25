import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { defaultValueUpdateMentorProfileRequest } from '~/form/defaultValues';
import { genderData } from '~/constants';
import {
  IdentityImgHeight,
  IdentityImgWidth,
  ProfileImgType,
} from '~/constants/profile';
import { TRY_CATCH_AXIOS_DEFAULT_ERROR } from '~/form/message';
import { useDispatchGetAllSubjects, useYupValidationResolver } from '~/hooks';
import { useGetMentorEditProfile } from '~/hooks/user/useGetEditProfile';
import { validationSchemaUpdateMentorProfileRequest2 } from '~/form/validation';
import {
  FormInputVariant,
  UpdateMentorProfileRequestProfileFormDefault,
} from '~/models/form';
import {
  useMutationUpdateMentorProfileRequest,
  UseMutationUpdateMentorProfileRequestPayload,
} from '~/hooks/user/useMutationUpdateMentorProfileRequest';
import { useMutationSendUpdateMentorProfileRequest } from '~/hooks/user/useMutationSendUpdateMentorProfileRequest';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import toast from '~/utils/toast';
import {
  DropdownDynamicValueInputBooleanDataPayload,
  DropdownDynamicValueInputNumberDataPayload,
  DropdownDynamicValueInputStringDataPayload,
} from '~/models';
import sx from './style';

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

const enum IntroduceExperienceNoteText {
  label0 = 'Mục giới thiệu, kinh nghiệm, nhập tối đa 2000 từ.',
  label1 = 'Mục giới thiệu giáo viên hãy viết về bản thân mình.',
  label2 = 'Mục kinh nghiệm giáo viên hãy viết về quá trình tích lũy kinh nghiệm chuyên môn.',
}
const enum CertificateNoteText {
  label0 = 'Kích thước tệp tối đa là 10 MB.',
  label1 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
  label2 = 'Không đặt mật khẩu bảo vệ file của bạn.',
  label3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
}

const introduceExperienceNoteList = [
  { id: 0, label: IntroduceExperienceNoteText.label0 },
  { id: 1, label: IntroduceExperienceNoteText.label1 },
  { id: 2, label: IntroduceExperienceNoteText.label2 },
];
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

  // console.log('profile', profile);
  // console.log(
  //   'defaultValueUpdateMentorProfileRequest',
  //   defaultValueUpdateMentorProfileRequest
  // );

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
        mentorProfile: {
          id: profile.userDto.mentorProfile.id,
          introduce: data.introduce,
          workingExperience: data.workingExperience,
          status: profile.userDto.mentorProfile.status,
          mentorSkills: [],
        },
        email: profile.userDto.email,
        status: profile.userDto.status,
        linkedinLink: profile.userDto.linkedinLink,
        facebookLink: profile.userDto.facebookLink,
        website: profile.userDto.website,
        verified: profile.userDto.verified,
      };
      data?.mentorSkills.forEach((item: any) => {
        params.mentorProfile.mentorSkills.push({
          skillId: item.skillId.id,
          yearOfExperiences: item.yearOfExperiences,
          name:
            subjects.find((subject) => subject.id === item.skillId.id)?.label ??
            '',
        });
      });
      const id = toast.loadToast(toastMsgLoading);
      try {
        await mutateUpdate(params);
        refetch();
        toast.updateSuccessToast(id, toastMsgSuccess);
      } catch (error: any) {
        toast.updateFailedToast(id, toastMsgError(error));
      }
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
          <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              mt={2}
            >
              <Typography sx={sx.formLabel} textAlign="center">
                Ảnh đại diện
              </Typography>
              <FormInput
                control={control}
                name="avatar"
                variant="image"
                previewImgHeight={250}
                previewImgWidth={250}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              mt={2}
              sx={{ width: '100%' }}
            >
              <Typography sx={sx.formLabel} textAlign="center">
                CMND/CCCD (Mặt trước)
              </Typography>
              <FormInput
                control={control}
                name="identityFront"
                variant="image"
                previewImgHeight={IdentityImgHeight * imgSizeReduction}
                previewImgWidth={IdentityImgWidth * imgSizeReduction}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              mt={2}
              sx={{ width: '100%' }}
            >
              <Typography sx={sx.formLabel} textAlign="center">
                CMND/CCCD (Mặt sau)
              </Typography>
              <FormInput
                control={control}
                name="identityBack"
                variant="image"
                previewImgHeight={IdentityImgHeight * imgSizeReduction}
                previewImgWidth={IdentityImgWidth * imgSizeReduction}
              />
            </Stack>
          </Grid>
        </Grid>

        {/* MENTOR-PROFILE */}
        <Box mt={8}>
          <Box mb={2}>
            <Typography component="h3" sx={sx.formTitle}>
              Thông tin giảng dạy
            </Typography>
            <Divider sx={{ marginY: 1 }} />
          </Box>
          {introduceExperienceNoteList.map((item) => (
            <Typography component="h3" key={item.id}>
              - {item.label}
            </Typography>
          ))}
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={sx.formLabel}>Giới thiệu</Typography>
              <Box mt={2} />
              <FormInput
                control={control}
                name="introduce"
                variant="editor"
                placeholder="Nhập giới thiệu"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={sx.formLabel}>Kinh nghiệm</Typography>
              <Box mt={2} />
              <FormInput
                control={control}
                name="workingExperience"
                variant="editor"
                placeholder="Nhập giới thiệu"
              />
            </Grid>

            {/* SKILL */}
            <Grid item xs={12}>
              <Typography sx={sx.formLabel}>Chuyên môn</Typography>
              <Grid container spacing={2} mt={2} mb={2}>
                <Grid item xs={6}>
                  <Typography sx={sx.formItemLabel}>Kĩ năng</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={sx.formItemLabel}>
                    Số năm kinh nghiệm
                  </Typography>
                </Grid>
                {mentorSkillsFields.map((field, index) => (
                  <Fragment key={field.id}>
                    <Grid item xs={6}>
                      <FormInput
                        control={control}
                        dataDropdownDynamicValue={subjects}
                        name={`mentorSkills[${index}].skillId`}
                        variant="dropdownDynamicValue"
                        placeholder="Nhập kĩ năng"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                      >
                        <FormInput
                          control={control}
                          name={`mentorSkills[${index}].yearOfExperiences`}
                          variant="number"
                          placeholder="Nhập số năm kinh nghiệm"
                        />
                        <Button
                          color="error"
                          size="small"
                          variant="outlined"
                          onClick={() => removeSkill(index)}
                        >
                          <Icon name="delete" size="medium" />
                        </Button>
                      </Stack>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
              <Button
                color="success"
                size="large"
                variant="outlined"
                onClick={() => appendSkill()}
              >
                <Icon name="add" size="medium" />
              </Button>
            </Grid>

            {/* DEGREE */}
            <Grid item xs={12}>
              <Typography sx={sx.formLabel}>Bằng cấp</Typography>
              {certificateNoteList.map((item) => (
                <Typography component="h3" key={item.id}>
                  - {item.label}
                </Typography>
              ))}
              <Grid container spacing={2} mb={1}>
                {degreeFields.map((field, index) => {
                  return (
                    <Fragment key={field.id}>
                      <Grid item xs={12}>
                        <Typography sx={sx.formLabel}>
                          {`Bằng cấp ${1 + index}`}
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
                              removeDegree(
                                index,
                                getValues(`degreeList[${index}]`)
                              )
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
            </Grid>
          </Grid>
        </Box>
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
            disabled={!formState.isDirty || Boolean(profile?.id)}
          >
            Lưu lại
          </Button>
          <Button
            variant="contained"
            color="miSmartOrange"
            fullWidth
            onClick={handleSubmitRequestToManager}
            disabled={Boolean(profile?.id)}
          >
            {profile?.id ? 'Dã gửi yêu cẩu' : 'Gửi yêu cầu'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
