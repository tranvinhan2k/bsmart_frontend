import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { defaultValuesEditMentorProfile } from '~/form/defaultValues';
import { EditMentorProfilePayload } from '~/api/users';
import { MentorProfileStatusType } from '~/constants/profile';
import { selectProfile } from '~/redux/user/selector';
import { TRY_CATCH_AXIOS_DEFAULT_ERROR } from '~/form/message';
import {
  useDispatchGetAllSubjects,
  useDispatchProfile,
  useYupValidationResolver,
} from '~/hooks';
import { useMutationEditMentorProfile } from '~/hooks/useMutationEditMentorProfile';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import toast from '~/utils/toast';
import UpdateProfileButton from '~/components/atoms/Button/UpdateProfileButton';
import {
  SX_FORM,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_TITLE,
} from './style';

export default function EditMentorProfileForm() {
  const profile = useSelector(selectProfile);

  const { optionSubjects: subjects } = useDispatchGetAllSubjects();
  const { mutateAsync: mutateEditMentorProfile } =
    useMutationEditMentorProfile();
  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();

  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditMentorProfile
  );
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: defaultValuesEditMentorProfile,
    resolver: resolverEditPersonalProfile,
    // mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'mentorSkills',
    control,
    rules: {
      required: 'Please append at least 1 item',
    },
  });

  useEffect(() => {
    if (profile && subjects) {
      if (profile.mentorProfile?.workingExperience)
        defaultValuesEditMentorProfile.workingExperience =
          profile.mentorProfile.workingExperience;
      if (profile.mentorProfile.mentorSkills) {
        defaultValuesEditMentorProfile.mentorSkills =
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
      if (profile.mentorProfile?.introduce)
        defaultValuesEditMentorProfile.introduce =
          profile.mentorProfile.introduce;
      reset(defaultValuesEditMentorProfile);
    }
  }, [profile, reset, subjects]);

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công...';
  const toastMsgError = (error: any): string =>
    `Cập nhật không thành công: ${
      error.message ?? TRY_CATCH_AXIOS_DEFAULT_ERROR
    }`;
  const handleSubmitSuccess = async (data: any) => {
    const params: EditMentorProfilePayload = {
      introduce: data.introduce,
      mentorSkills: [],
      workingExperience: data.workingExperience,
    };
    data.mentorSkills.forEach((item: any) => {
      params.mentorSkills.push({
        skillId: item.skillId.id,
        yearOfExperiences: item.yearOfExperiences,
      });
    });
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditMentorProfile(params);
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  const EDIT_MENTOR_PROFILE_FORM_TEXT = {
    TITLE: 'Thông tin sư phạm',
    INTRODUCE: {
      LABEL: 'Giới thiệu bản thân',
      PLACEHOLDER: 'Nhập giới thiệu bản thân',
    },
    SKILLS: {
      LABEL: 'Skill',
      PLACEHOLDER: 'Nhập skill',
    },
    EXPERIENCE: {
      LABEL: 'Kinh nghiệm bản thân',
      PLACEHOLDER: 'Nhập kinh nghiệm bản thân',
    },
    DESC1: 'Mục giới thiệu, kinh nghiệm, nhập tối đa 2000 từ.',
    DESC2: 'Mục giới thiệu giáo viên hãy viết về bản thân mình',
    DESC3:
      'Mục kinh nghiệm giáo viên hãy viết về quá trình tích lũy kinh nghiệm chuyên môn',
    BUTTON_TEXT: 'Cập nhật',
  };

  const appendSkill = () => {
    // append({ skillId: null, yearOfExperiences: 1 });
    append({});
  };
  const removeSkill = (order: number) => {
    remove(order);
  };

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_MENTOR_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography component="h3">
        - {EDIT_MENTOR_PROFILE_FORM_TEXT.DESC1}
      </Typography>
      <Typography component="h3">
        - {EDIT_MENTOR_PROFILE_FORM_TEXT.DESC2}
      </Typography>
      <Typography component="h3">
        - {EDIT_MENTOR_PROFILE_FORM_TEXT.DESC3}
      </Typography>
      {profile && subjects && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Giới thiệu</Typography>
              <FormInput
                control={control}
                name="introduce"
                variant="editor"
                placeholder="Nhập giới thiệu"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Kinh nghiệm</Typography>
              <FormInput
                control={control}
                name="workingExperience"
                variant="editor"
                placeholder="Nhập kinh nghiệm"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Chuyên môn</Typography>
              {fields.length > 0 && (
                <>
                  <Grid container spacing={2} mt={2} mb={1}>
                    <Grid item xs={6}>
                      <Typography sx={SX_FORM_ITEM_LABEL}>Kĩ năng</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={SX_FORM_ITEM_LABEL}>
                        Số năm kinh nghiệm
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container spacing={2} mb={2}>
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
                            <MuiButton
                              color="error"
                              size="small"
                              variant="outlined"
                              disabled={
                                !(
                                  profile.mentorProfile.status ===
                                    MentorProfileStatusType.REQUESTING ||
                                  profile.mentorProfile.status ===
                                    MentorProfileStatusType.EDITREQUEST
                                )
                              }
                              onClick={() => removeSkill(index)}
                            >
                              <Icon name="delete" size="medium" />
                            </MuiButton>
                          </Stack>
                        </Grid>
                      </Fragment>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
            {Boolean(Object.keys(formState.errors).length === 1) && (
              <Grid item xs={12}>
                <FormInput
                  control={control}
                  name="mentorSkills"
                  variant="arrayHelperText"
                  placeholder="a"
                />
              </Grid>
            )}
            <Grid item xs={6} lg={3} mt={2}>
              <MuiButton
                color="success"
                size="large"
                variant="outlined"
                disabled={
                  !(
                    profile.mentorProfile.status ===
                      MentorProfileStatusType.REQUESTING ||
                    profile.mentorProfile.status ===
                      MentorProfileStatusType.EDITREQUEST
                  )
                }
                onClick={() => appendSkill()}
              >
                <Icon name="add" size="medium" />
              </MuiButton>
            </Grid>
          </Grid>
          <Box mt={4}>
            <UpdateProfileButton
              role={profile.roles?.[0]?.code}
              isFormDisabled={!formState.isDirty}
              mentorProfileStatus={profile?.mentorProfile?.status}
            />
          </Box>
        </form>
      )}
      {(!profile || !subjects) && (
        <Typography component="h3" sx={SX_FORM_LABEL}>
          Đang tải
        </Typography>
      )}
    </Box>
  );
}
