import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { UpdateMentorProfileRequestPayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { defaultValuesUpdateMentorProfileRequest } from '~/form/defaultValues';
import { validationSchemaUpdateMentorProfileRequest } from '~/form/validation';
import {
  useDispatchGetAllSubjects,
  useDispatchProfile,
  useYupValidationResolver,
} from '~/hooks';
import { useGetUpdateMentorProfileRequestInfo } from '~/hooks/user/useGetUpdateMentorProfileRequestInfo';
import { useMutationUpdateMentorProfileRequest } from '~/hooks/user/useMutationUpdateMentorProfileRequest';
import toast from '~/utils/toast';
import {
  SX_FORM,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_TITLE,
} from './style';

export default function UpdateMentorSkill() {
  const enum Text {
    title = '1. Bổ sung thông tin sư phạm',
    submitButton = 'Cập nhật',
    addSkillTooltip = 'Thêm chuyên môn',
  }

  const { refetch: refetchRequestInfo } =
    useGetUpdateMentorProfileRequestInfo();

  const { optionSubjects: subjects } = useDispatchGetAllSubjects();
  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();

  const { mutateAsync: mutateUpdateMentorProfileRequest } =
    useMutationUpdateMentorProfileRequest();
  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaUpdateMentorProfileRequest
  );
  const {
    control,
    formState,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: defaultValuesUpdateMentorProfileRequest,
    resolver: resolverEditPersonalProfile,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'mentorSkills',
    control,
    rules: {
      required: 'Hãy nhập ít nhất 1 chuyên môn',
    },
  });

  const appendSkill = () => {
    // append({ skillId: null, yearOfExperiences: 0 });
    append({});
  };
  const removeSkill = (order: number) => {
    remove(order);
  };

  const toastMsgLoading = 'Đang cập nhật ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
  const toastMsgError = (error: any): string =>
    `Cập nhật không thành công: ${error.message}`;
  const handleSubmitSuccess = async (data: any) => {
    const params: UpdateMentorProfileRequestPayload = {
      mentorSkills: [],
    };
    data.mentorSkills.forEach((item: any) => {
      params.mentorSkills.push({
        skillId: item.skillId.id,
        yearOfExperiences: item.yearOfExperiences,
      });
    });
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateUpdateMentorProfileRequest(params);
      resetForm();
      refetchRequestInfo();
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {Text.title}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      {subjects && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container>
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
              <Tooltip title={Text.addSkillTooltip} arrow>
                <MuiButton
                  color="success"
                  size="large"
                  variant="outlined"
                  onClick={() => appendSkill()}
                >
                  <Icon name="add" size="medium" />
                </MuiButton>
              </Tooltip>
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
              disabled={!formState.isDirty}
            >
              Cập nhật
            </MuiButton>
          </Box>
        </form>
      )}
      {!!subjects && (
        <Typography component="h3" sx={SX_FORM_LABEL}>
          Đang tải
        </Typography>
      )}
    </Box>
  );
}
