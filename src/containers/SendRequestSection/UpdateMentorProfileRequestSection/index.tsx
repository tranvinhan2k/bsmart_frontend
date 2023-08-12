import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { Fragment, useEffect } from 'react';
import { MentorProfileStatusType, ProfileImgType } from '~/constants/profile';
import { RequestSectionType } from '../requestSection';
import { useGetProfile } from '~/hooks/user/useGetProfile';
import UpdateMentorDegreeRequest from './UpdateMentorDegreeRequest';
import UpdateMentorProfileRequestSubmit from './UpdateMentorProfileRequestSubmit';
import UpdateMentorSkillRequest from './UpdateMentorSkillRequest';
import { genderData } from '~/constants';
import FormInput from '~/components/atoms/FormInput';
import { FormInputVariant } from '~/models/form';
import Icon from '~/components/atoms/Icon';
import { useDispatchGetAllSubjects, useYupValidationResolver } from '~/hooks';
import { validationSchemaUpdateMentorProfileRequest2 } from '~/form/validation';
import { defaultValueUpdateMentorProfileRequest2 } from '~/form/defaultValues';
import {
  SX_FORM,
  SX_FORM_LABEL,
  SX_FORM_TITLE,
  SX_FORM_ITEM_LABEL,
} from './style';

interface FormFieldsPersonalProps {
  name: string;
  variant: FormInputVariant;
  label: string;
  placeholder?: string;
  size: number;
}

export default function UpdateMentorProfileRequestSection() {
  const { profile } = useGetProfile();
  const { optionSubjects: subjects } = useDispatchGetAllSubjects();

  const resolverUpdate = useYupValidationResolver(
    validationSchemaUpdateMentorProfileRequest2
  );
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: defaultValueUpdateMentorProfileRequest2,
    resolver: resolverUpdate,
  });

  useEffect(() => {
    if (profile) {
      if (profile.fullName)
        defaultValueUpdateMentorProfileRequest2.fullName = profile.fullName;
      if (profile.birthday)
        defaultValueUpdateMentorProfileRequest2.birthday = profile.birthday;
      if (profile.address)
        defaultValueUpdateMentorProfileRequest2.address = profile.address;
      if (profile.phone)
        defaultValueUpdateMentorProfileRequest2.phone = profile.phone;
      if (profile.gender) {
        defaultValueUpdateMentorProfileRequest2.gender =
          genderData.find((item) => item.value === profile.gender) ??
          genderData[0];
      }
      defaultValueUpdateMentorProfileRequest2.identityFront =
        profile?.userImages?.find(
          (img: any) => img?.type === ProfileImgType.FRONTCI
        )?.url || '';
      defaultValueUpdateMentorProfileRequest2.identityBack =
        profile?.userImages?.find(
          (img: any) => img?.type === ProfileImgType.BACKCI
        )?.url || '';
      defaultValueUpdateMentorProfileRequest2.avatar =
        profile?.userImages?.find(
          (img: any) => img?.type === ProfileImgType.AVATAR
        )?.url || '';
      if (profile.mentorProfile.introduce)
        defaultValueUpdateMentorProfileRequest2.introduce =
          profile.mentorProfile.introduce;
      if (profile.mentorProfile.workingExperience)
        defaultValueUpdateMentorProfileRequest2.workingExperience =
          profile.mentorProfile.workingExperience;
      if (profile.mentorProfile.mentorSkills) {
        defaultValueUpdateMentorProfileRequest2.mentorSkills =
          profile.mentorProfile.mentorSkills.map((item) => {
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
      reset(defaultValueUpdateMentorProfileRequest2);
    }
  }, [profile, subjects, reset]);

  const { fields, append, remove } = useFieldArray({
    name: 'mentorSkills',
    control,
    rules: {
      required: 'Hãy nhập kĩ năng',
    },
  });

  const appendSkill = () => {
    // append({ skillId: null, yearOfExperiences: 1 });
    append({});
  };
  const removeSkill = (order: number) => {
    remove(order);
  };

  const handleSubmitSuccess = () => {};

  const formFieldsPersonal0: FormFieldsPersonalProps[] = [
    {
      name: 'fullName',
      label: 'Họ tên',
      placeholder: 'Nhập họ tên',
      variant: 'text',
      size: 6,
    },
  ];

  const formFieldsPersonal1: FormFieldsPersonalProps[] = [
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

  const introduceExperienceNoteList = [
    { id: 0, label: 'Mục giới thiệu, kinh nghiệm, nhập tối đa 2000 từ.' },
    {
      id: 1,
      label: 'Mục giới thiệu giáo viên hãy viết về bản thân mình.',
    },
    {
      id: 2,
      label:
        'Mục kinh nghiệm giáo viên hãy viết về quá trình tích lũy kinh nghiệm chuyên môn.',
    },
  ];
  const certificateNoteList = [
    { id: 0, label: 'Kích thước tệp tối đa là 10 MB.' },
    {
      id: 1,
      label:
        'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    },
    { id: 2, label: 'Không đặt mật khẩu bảo vệ file của bạn.' },
    { id: 3, label: 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.' },
  ];

  console.log('fields', fields);
  console.log(
    'defaultValueUpdateMentorProfileRequest2',
    defaultValueUpdateMentorProfileRequest2
  );

  return (
    <Box sx={SX_FORM}>
      <Box>
        <Typography component="h3" sx={SX_FORM_TITLE}>
          Thay đổi hồ sơ giáo viên
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container columnSpacing={3}>
            {formFieldsPersonal0.map((field) => (
              <Grid item xs={field.size} key={field.name}>
                <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
                <FormInput
                  control={control}
                  name={field.name}
                  variant={field.variant}
                  placeholder={field.placeholder}
                />
              </Grid>
            ))}
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Giới tính</Typography>
              <FormInput
                dataDropdownDynamicValue={genderData}
                variant="dropdownDynamicValue"
                name="gender"
                control={control}
              />
            </Grid>
            {formFieldsPersonal1.map((field) => (
              <Grid item xs={field.size} key={field.name}>
                <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
                <FormInput
                  control={control}
                  name={field.name}
                  variant={field.variant}
                  placeholder={field.placeholder}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>CMND/CCCD</Typography>
              <Stack
                // direction={{ sm: 'column', md: 'row' }}
                // justifyContent={{ sm: 'flex-start', md: 'center' }}
                // alignItems={{ sm: 'center', md: 'flex-start' }}
                //
                // direction="row"
                // justifyContent="center"
                // alignItems="flex-start"
                //
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={4}
                mt={2}
              >
                <Button>
                  <Avatar
                    variant="rounded"
                    alt="Avatar"
                    src={defaultValueUpdateMentorProfileRequest2.identityFront}
                    sx={{
                      width: 300,
                      height: 150,
                      boxShadow: 3,
                    }}
                  />
                </Button>
                <Button>
                  <Avatar
                    alt="Avatar"
                    variant="rounded"
                    src={defaultValueUpdateMentorProfileRequest2.identityBack}
                    sx={{
                      width: 300,
                      height: 150,
                      boxShadow: 3,
                    }}
                  />
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box mt={4}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Giới thiệu</Typography>
              {introduceExperienceNoteList.map((item) => (
                <Typography component="h3" key={item.id}>
                  - {item.label}
                </Typography>
              ))}
              <Box mt={2} />
              <FormInput
                control={control}
                name="introduce"
                variant="editor"
                placeholder="Nhập giới thiệu"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Chuyên môn</Typography>
              <Grid container spacing={2} mt={2} mb={2}>
                <Grid item xs={6}>
                  <Typography sx={SX_FORM_ITEM_LABEL}>Kĩ năng</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={SX_FORM_ITEM_LABEL}>
                    Số năm kinh nghiệm
                  </Typography>
                </Grid>
                {fields.map((field, index) => (
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
              <Button color="success" size="large" variant="outlined">
                <Icon name="add" size="medium" />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Bằng cấp</Typography>
              {certificateNoteList.map((item) => (
                <Typography component="h3" key={item.id}>
                  - {item.label}
                </Typography>
              ))}
              <Box mt={2}>
                <Button color="success" size="large" variant="outlined">
                  <Icon name="add" size="medium" />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
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
          sx={{ width: '100%' }}
        >
          Lưu lại
        </Button>
        <Button
          variant="contained"
          color="miSmartOrange"
          sx={{ width: '100%' }}
        >
          Gửi yêu cầu cập nhật
        </Button>
      </Stack>
    </Box>
  );
}
