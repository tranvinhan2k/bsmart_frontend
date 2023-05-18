import { Box, Divider, Typography, Grid } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { defaultValueEditMentorProfile } from '~/form/defaultValues';
import { RootState } from '~/redux/store';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import accountApi, { EditMentorProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { useQueryGetAllSubjects, useYupValidationResolver } from '~/hooks';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditMentorProfileForm() {
  const toastMsgLoading = 'Đang cập nhật ...';
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
  const { mutateAsync: mutateEditMentorProfile } = useMutation({
    mutationFn: accountApi.editMentorProfile,
  });

  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditMentorProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditMentorProfile,
    resolver: resolverEditPersonalProfile,
  });

  useEffect(() => {
    if (dataGetProfile) {
      const defaults = defaultValueEditMentorProfile;
      if (dataGetProfile.mentorProfile.workingExperience)
        defaults.workingExperience =
          dataGetProfile.mentorProfile.workingExperience;
      if (dataGetProfile.mentorProfile.mentorSkills) {
        defaults.mentorSkills = dataGetProfile.mentorProfile.mentorSkills.map(
          (item: any) => ({
            skillId: item.skillId,
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
      toast.updateFailedToast(id, toastMsgError(error.message));
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
      append({
        id: subjects[0].id,
        label: subjects[0].label,
        value: subjects[0].value,
      });
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
          <Grid container columnSpacing={3}>
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
              <Typography sx={SX_FORM_LABEL}>Giới thiệu</Typography>
              <FormInput
                control={control}
                name="introduce"
                variant="multiline"
                placeholder="Nhập giới thiệu"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Kĩ năng</Typography>
              <Grid container columnSpacing={2} mb={2}>
                {fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <Grid item xs={7}>
                      <FormInput
                        control={control}
                        data={subjects}
                        name={`mentorSkills.${index}.skillId`}
                        variant="dropdown"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormInput
                        control={control}
                        name={`mentorSkills.${index}.yearOfExperiences`}
                        variant="number"
                        placeholder="Nhập số năm kinh nghiệm"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        customVariant="normal"
                        size="small"
                        onClick={() => removeSkill(index)}
                      >
                        Xóa
                      </Button>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
              <Grid item xs={6} lg={3}>
                <Button
                  customVariant="normal"
                  size="small"
                  onClick={() => appendSkill()}
                >
                  Thêm kĩ năng
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Button customVariant="normal" type="submit">
              {EDIT_MENTOR_PROFILE_FORM_TEXT.BUTTON_TEXT}
            </Button>
          </Box>
        </form>
      )}
      {(!dataGetProfile || !subjects) && (
        <Typography component="h3" sx={SX_FORM_TITLE}>
          Đang tải
        </Typography>
      )}
    </Box>
  );
}
