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
import { defaultValueEditMentorProfile } from '~/form/defaultValues';
import { RootState } from '~/redux/store';

import { validationSchemaEditMentorProfile } from '~/form/validation';
import { defaultValueEditMentorProfile } from '~/form/defaultValues';

import accountApi, { EditMentorProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import { useMutationEditMentorProfile } from '~/hooks/useMutationEditMentorProfile';
import Icon from '~/components/atoms/Icon';
import FormInput from '~/components/atoms/FormInput';

import toast from '~/utils/toast';

import { useQueryGetAllSubjects, useYupValidationResolver } from '~/hooks';

import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditMentorProfileForm() {
  const toastMsgLoading = 'Đang hồ sơ giảng dạy ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${error.message}`;
  };

  const token =
    useSelector((state: RootState) => state.user.token) ||
    localStorage.getItem('token');
  const queryKey = ['/loginUser'];
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data: dataGetProfile } = useQuery(
    queryKey,
    () => accountApi.getProfile(config),
    {
      enabled: Boolean(token),
    }
  );
  const { subjects } = useQueryGetAllSubjects();
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
    if (dataGetProfile && subjects) {
      const defaults = defaultValueEditMentorProfile;
      if (dataGetProfile.mentorProfile.workingExperience)
        defaults.workingExperience =
          dataGetProfile.mentorProfile.workingExperience;
      if (dataGetProfile.mentorProfile.mentorSkills) {
        defaults.mentorSkills = dataGetProfile.mentorProfile.mentorSkills.map(
          (item: any) => ({
            skillId: subjects.find((subject) => subject.id === item.skillId),
            yearOfExperiences: item.yearOfExperiences,
          })
        );
      }
      if (dataGetProfile.mentorProfile.introduce)
        defaults.introduce = dataGetProfile.mentorProfile.introduce;
      reset(defaults);
    }
  }, [dataGetProfile, reset, subjects]);

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
      {dataGetProfile && subjects && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Giới thiệu</Typography>
              <FormInput
                control={control}
                name="introduce"
                variant="multiline"
                placeholder="Nhập giới thiệu"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Kinh nghiệm</Typography>
              <FormInput
                control={control}
                name="workingExperience"
                variant="multiline"
                placeholder="Nhập kinh nghiệm"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Chuyên môn</Typography>
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
                        alignItems="flex-start"
                        spacing={2}
                      >
                        <FormInput
                          control={control}
                          name={`mentorSkills.${index}.yearOfExperiences`}
                          variant="number"
                          placeholder="Nhập số năm kinh nghiệm"
                        />
                        <Box mb={1}>
                          <MuiButton
                            color="error"
                            size="small"
                            variant="outlined"
                            onClick={() => removeSkill(index)}
                          >
                            <Icon name="delete" size="medium" />
                          </MuiButton>
                        </Box>
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
      {(!dataGetProfile || !subjects) && (
        <Typography component="h3" sx={SX_FORM_LABEL}>
          Đang tải
        </Typography>
      )}
    </Box>
  );
}
