import { Box, Divider, Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { EDIT_MENTOR_PROFILE_FIELDS } from '~/form/schema';
import {
  EditMentorProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { defaultValueEditMentorProfile } from '~/form/defaultValues';
import { RootState } from '~/redux/store';
import { OptionPayload } from '~/models';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import accountApi, { EditMentorProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { useYupValidationResolver } from '~/hooks';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditMentorProfileForm() {
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
      if (dataGetProfile.experience)
        defaults.experience = dataGetProfile.experience;
      if (dataGetProfile.skills) defaults.skills = dataGetProfile.skill;
      if (dataGetProfile.introduce)
        defaults.introduce = dataGetProfile.introduce;
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

  const { mutateAsync: mutateEditMentorProfile } = useMutation({
    mutationFn: accountApi.editMentorProfile,
  });

  const handleSubmitSuccess = async (
    data: EditMentorProfileFormDataPayload
  ) => {
    console.log(data);
    const params: EditMentorProfilePayload = {
      introduce: data.introduce,
      skills: data.skills,
      experience: data.experience,
    };
    // const id = toast.loadToast('Đang cập nhật ...');
    // try {
    //   await mutateEditMentorProfile(params);
    //   toast.updateSuccessToast(id, 'Cập nhật thành công');
    // } catch (error: any) {
    //   toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    // }
  };

  interface FormFieldsMentorProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder?: string;
    size: number;
  }

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

  const formFieldsMentor: FormFieldsMentorProps[] = [
    {
      name: EDIT_MENTOR_PROFILE_FIELDS.introduce,
      label: EDIT_MENTOR_PROFILE_FORM_TEXT.INTRODUCE.LABEL,
      placeholder: EDIT_MENTOR_PROFILE_FORM_TEXT.INTRODUCE.PLACEHOLDER,
      variant: 'multiline',
      size: 12,
    },
    {
      name: EDIT_MENTOR_PROFILE_FIELDS.skills,
      label: EDIT_MENTOR_PROFILE_FORM_TEXT.SKILLS.LABEL,
      placeholder: EDIT_MENTOR_PROFILE_FORM_TEXT.SKILLS.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_MENTOR_PROFILE_FIELDS.experience,
      label: EDIT_MENTOR_PROFILE_FORM_TEXT.EXPERIENCE.LABEL,
      placeholder: EDIT_MENTOR_PROFILE_FORM_TEXT.EXPERIENCE.PLACEHOLDER,
      variant: 'multiline',
      size: 12,
    },
  ];

  const { fields, append, prepend, remove } = useFieldArray({
    name: 'skills',
    control,
    rules: {
      required: 'Please append at least 1 item',
    },
  });

  const appendSkill = () => {
    append({
      subjectId: 0,
      level: 0,
    });
  };
  const removeSkill = (order: number) => {
    remove(order);
  };

  const mockSubjectTypeData: OptionPayload[] = [
    {
      id: 0,
      label: 'Front End',
      value: 'Front End',
    },
    {
      id: 1,
      label: 'Back End',
      value: 'Back End',
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_MENTOR_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      {dataGetProfile && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Kinh nghiệm</Typography>
              <FormInput
                control={control}
                name="experience"
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
              {fields.map((field, index) => (
                <Grid container columnSpacing={2} mb={2} key={field.id}>
                  <Grid item xs={8}>
                    <FormInput
                      control={control}
                      name={`skills.${index}.subjectId`}
                      variant="text"
                      placeholder="Nhập kĩ năng"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormInput
                      control={control}
                      name={`skills.${index}.level`}
                      variant="text"
                      placeholder="Nhập số tháng thành thục kĩ năng"
                    />
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
                  <Grid item xs={6} lg={3}>
                    <Button
                      customVariant="normal"
                      size="small"
                      onClick={() => removeSkill(index)}
                    >
                      Xóa kĩ năng
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Box mt={4}>
            <Button customVariant="normal" type="submit">
              {EDIT_MENTOR_PROFILE_FORM_TEXT.BUTTON_TEXT}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}
