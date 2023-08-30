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
import { EditMentorProfilePayload } from '~/api/users';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { defaultValuesEditMentorProfile } from '~/form/defaultValues';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import {
  useDispatchGetAllSubjects,
  useDispatchProfile,
  useYupValidationResolver,
} from '~/hooks';
import { useMutationEditMentorProfile } from '~/hooks/useMutationEditMentorProfile';
import { useGetMentorEditProfile } from '~/hooks/user/useGetEditProfile';
import { toastMsgError } from '~/utils/common';
import toast from '~/utils/toast';
import {
  SX_FORM,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_TITLE,
} from './style';

export default function UpdateMentorProfileRequestSkill() {
  const enum CertificateNoteText {
    label0 = 'Kích thước tệp tối đa là 10 MB.',
    label1 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    label2 = 'Không đặt mật khẩu bảo vệ file của bạn.',
    label3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    label41 = 'Định dạng hỗ trợ',
    label42 = '.pdf, .doc, .docx',
  }

  const { profile, refetch } = useGetMentorEditProfile();
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
      required: 'Hãy nhập ít nhất 1 kĩ năng',
    },
  });

  useEffect(() => {
    if (profile && subjects) {
      if (profile.userDto.mentorProfile.introduce)
        defaultValuesEditMentorProfile.introduce =
          profile.userDto.mentorProfile.introduce;
      if (profile.userDto.mentorProfile.workingExperience)
        defaultValuesEditMentorProfile.workingExperience =
          profile.userDto.mentorProfile.workingExperience;
      if (profile.userDto.mentorProfile.mentorSkills) {
        defaultValuesEditMentorProfile.mentorSkills =
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
      reset(defaultValuesEditMentorProfile);
    }
  }, [profile, reset, subjects]);

  // console.log('subjects', subjects);
  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công...';
  const handleSubmitSuccess = async (data: any) => {
    if (profile) {
      const s1 = data.mentorSkills.map((item: any) => ({
        skillId: item.skillId?.id,
        yearOfExperiences: Number(item.yearOfExperiences),
      }));
      const s2 = profile.userDto.mentorProfile.mentorSkills.map((item) => ({
        skillId: item.skillId,
        yearOfExperiences: Number(item.yearOfExperiences),
      }));

      const submitSkills = s1.map((item: any, index: number) => {
        let tmp: any;
        if (s2[index]) {
          if (s2[index].yearOfExperiences === item.yearOfExperiences) {
            tmp = {
              skillId: item.skillId,
              yearOfExperiences: item.yearOfExperiences,
              status: true,
            };
          } else {
            tmp = {
              skillId: item.skillId,
              yearOfExperiences: s2[index].yearOfExperiences,
              status: false,
            };
          }
        } else {
          tmp = {
            skillId: item.skillId,
            yearOfExperiences: item.yearOfExperiences,
            status: false,
          };
        }
        return tmp;
      });

      // const submitSkills = s2.map((item, index) => {
      //   let tmp: any;
      //   if (s1[index].yearOfExperiences === item.yearOfExperiences) {
      //     tmp = {
      //       skillId: item.skillId,
      //       yearOfExperiences: item.yearOfExperiences,
      //       status: true,
      //     };
      //   } else {
      //     tmp = {
      //       skillId: item.skillId,
      //       yearOfExperiences: s1[index].yearOfExperiences,
      //       status: false,
      //     };
      //   }
      //   return tmp;
      // });
      console.log('submitSkills', submitSkills);
      const params: EditMentorProfilePayload = {
        introduce: data.introduce,
        mentorSkills: submitSkills,
        workingExperience: data.workingExperience,
      };
      console.log('params', params);
      const id = toast.loadToast(toastMsgLoading);
      try {
        await mutateEditMentorProfile(params);
        handleDispatchProfile();
        refetch();
        toast.updateSuccessToast(id, toastMsgSuccess);
      } catch (error: unknown) {
        toast.updateFailedToast(id, toastMsgError(error));
      }
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
    BUTTON_TEXT: 'Cập nhật',
  };

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
      <Box my={2}>
        {introduceExperienceNoteList.map((item) => (
          <Typography component="h3" key={item.id}>
            <b>{item.id + 1}.</b> {item.label}
          </Typography>
        ))}
      </Box>
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
                              // disabled={
                              //   !(
                              //     profile.mentorProfile.status ===
                              //       MentorProfileStatusType.REQUESTING ||
                              //     profile.mentorProfile.status ===
                              //       MentorProfileStatusType.EDITREQUEST
                              //   )
                              // }
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
                // disabled={
                //   !(
                //     profile.mentorProfile.status ===
                //       MentorProfileStatusType.REQUESTING ||
                //     profile.mentorProfile.status ===
                //       MentorProfileStatusType.EDITREQUEST
                //   )
                // }
                onClick={() => appendSkill()}
              >
                <Icon name="add" size="medium" />
              </MuiButton>
            </Grid>
          </Grid>
          <Box mt={4}>
            <MuiButton
              variant="contained"
              color="miSmartOrange"
              type="submit"
              fullWidth
              // disabled={!formState.isDirty || Boolean(profile?.id)}
            >
              Cập nhật
            </MuiButton>
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
