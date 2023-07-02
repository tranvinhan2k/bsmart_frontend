import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

import { validationSchemaEditMentorProfile } from '~/form/validation';
import { defaultValueEditMentorProfile } from '~/form/defaultValues';

import accountApi, { EditMentorProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import { useMutationEditMentorProfile } from '~/hooks/useMutationEditMentorProfile';
import Icon from '~/components/atoms/Icon';
import FormInput from '~/components/atoms/FormInput';

import toast from '~/utils/toast';

import { useDispatchGetAllSubjects, useYupValidationResolver } from '~/hooks';

import {
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_TITLE,
  SX_FORM,
} from './style';
import { selectProfile } from '~/redux/user/selector';

export default function EditMentorProfileForm() {
  const profile = useSelector(selectProfile);
  const toastMsgLoading = 'Đang cập nhật ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${error.message}`;
  };

  const { optionSubjects: subjects } = useDispatchGetAllSubjects();
  const { mutateAsync: mutateEditMentorProfile } =
    useMutationEditMentorProfile();

  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditMentorProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditMentorProfile,
    resolver: resolverEditPersonalProfile,
  });

  useEffect(() => {
    if (profile && subjects) {
      const defaults = defaultValueEditMentorProfile;
      if (profile.mentorProfile?.workingExperience)
        defaults.workingExperience = profile.mentorProfile.workingExperience;
      // if (profile.mentorProfile?.mentorSkills) {
      //   defaults.mentorSkills = profile.mentorProfile.mentorSkills.map(
      //     (item) => ({
      //       skillId: subjects.find((subject) => subject.id === item.skillId),
      //       yearOfExperiences: item.yearOfExperiences,
      //     })
      //   );
      // }
      if (profile.mentorProfile?.introduce)
        defaults.introduce = profile.mentorProfile.introduce;
      reset(defaults);
    }
  }, [profile, reset, subjects]);

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
    BUTTON_TEXT: 'Cập nhật',
  };

  const { fields, append, remove } = useFieldArray({
    name: 'mentorSkills',
    control,
    rules: {
      required: 'Please append at least 1 item',
    },
  });

  const appendSkill = () => {
    if (subjects) {
      append({});
    }
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
      {profile && subjects && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Giới thiệu</Typography>
              <FormInput
                control={control}
                name="introduce"
                variant="multiline"
                multilineRows={6}
                placeholder="Nhập giới thiệu"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Kinh nghiệm</Typography>
              <FormInput
                control={control}
                name="workingExperience"
                variant="multiline"
                multilineRows={6}
                placeholder="Nhập kinh nghiệm"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Chuyên môn</Typography>
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
                        data={subjects}
                        name={`mentorSkills.${index}.skillId`}
                        variant="dropdown"
                        placeholder="Nhập kĩ năng"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <FormInput
                          control={control}
                          name={`mentorSkills.${index}.yearOfExperiences`}
                          variant="number"
                          placeholder="Nhập số năm kinh nghiệm"
                        />
                        <MuiButton
                          color="error"
                          size="small"
                          variant="outlined"
                          onClick={() => removeSkill(index)}
                        >
                          <Icon name="delete" size="medium" />
                        </MuiButton>
                      </Stack>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={6} lg={3}>
              <MuiButton
                color="success"
                size="large"
                variant="outlined"
                onClick={() => appendSkill()}
              >
                <Icon name="add" size="medium" />
              </MuiButton>
            </Grid>
          </Grid>
          <Box mt={4}>
            <MuiButton
              color="miSmartOrange"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ fontFamily: FontFamily.bold }}
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
