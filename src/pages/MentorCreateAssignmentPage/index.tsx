import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button as MuiButton,
  Typography,
  Stack,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '~/components/atoms/Button';
import { CreateAssignmentFormDataPayload } from '~/models/form';
import { CreateAssignmentPayload } from '~/api/assignments';
import { defaultValueEditCreateAssignment } from '~/form/defaultValues';
import { MentorNavigationActionData } from '~/routes/navigators';
import { useMutationCreateAssignment } from '~/hooks/useManageAssignment';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaCreateAssignment } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import toast from '~/utils/toast';
import { SX_ACCORDION_TITTLE, SX_FORM_LABEL } from './style';
import { toastMsgError } from '~/utils/common';

export default function MentorCreateAssignmentPage() {
  const { classSectionId } = useParams();

  const resolverCreateAssignment = useYupValidationResolver(
    validationSchemaCreateAssignment
  );
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValueEditCreateAssignment,
    resolver: resolverCreateAssignment,
  });

  const { mutateAsync: mutateCreateAssignment } = useMutationCreateAssignment();

  const toastMsgLoading = 'Đang tạo...';
  const toastMsgSuccess = 'Tạo thành công';
  const handleSubmitSuccess = async (data: CreateAssignmentFormDataPayload) => {
    const params: CreateAssignmentPayload = {
      name: data.name,
      activityTypeId: 2 /* hard code */,
      isVisible: true /* hard code */,
      classSectionId: classSectionId ? +classSectionId : 0,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      editBeForSubmitMin: 1 /* hard code */,
      maxFileSubmit: data.maxFileSubmit,
      maxFileSize: data.maxFileSize,
      attachFiles: data.attachFiles,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateCreateAssignment(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  const gradingMethods = [
    { id: 0, value: 'Điểm cao nhất', label: 'Điểm cao nhất' },
    { id: 1, value: 'Điểm thấp nhất', label: 'Điểm thấp nhất' },
    { id: 2, value: 'Điểm trung bình', label: 'Điểm trung bình' },
    { id: 3, value: 'Lần làm đầu', label: 'Lần làm đầu' },
    { id: 4, value: 'Lần làm cuối', label: 'Lần làm cuối' },
  ];

  const maxNoOfFile = [
    { id: 1, value: '1', label: '1' },
    { id: 2, value: '2', label: '2' },
    { id: 3, value: '3', label: '3' },
    { id: 4, value: '4', label: '4' },
    { id: 5, value: '5', label: '5' },
  ];

  const maxFileSize = [
    { id: 1, value: '10', label: '10 MB' },
    { id: 2, value: '100', label: '100 MB' },
  ];

  const navigate = useNavigate();
  const handleReturnResourceManagePage = () =>
    navigate(
      `/mentor-profile/${MentorNavigationActionData[1].items?.[2].link}`
    );

  const {
    fields: attachFileFields,
    append,
    remove,
  } = useFieldArray({
    name: 'attachFiles',
    control,
  });

  const appendAttachFile = () => append('');
  const removeAttachFile = (index: number) => remove(index);

  return (
    <form onSubmit={handleSubmit(handleSubmitSuccess)}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography sx={SX_ACCORDION_TITTLE}>Cài đặt chung</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Tên</Typography>
              <FormInput
                control={control}
                name="name"
                variant="text"
                placeholder="Nhập tên"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Mô tả</Typography>
              <FormInput
                control={control}
                name="description"
                variant="multiline"
                placeholder="Nhập mô tả"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography sx={SX_ACCORDION_TITTLE}>Thời gian</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Ngày mở</Typography>
              <FormInput
                control={control}
                name="startDate"
                variant="datetime"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Ngày đóng</Typography>
              <FormInput control={control} name="endDate" variant="datetime" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography sx={SX_ACCORDION_TITTLE}>Tính điểm</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Điểm đậu</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Số lần được làm</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Cách thức chấm điểm</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography sx={SX_ACCORDION_TITTLE}>Phương thức nộp</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Số file tối đa nộp</Typography>
              <FormInput
                control={control}
                name="maxFileSubmit"
                variant="number"
                placeholder="Chọn số file tối đa nộp"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>
                Dung lượng tối đa mỗi file (MB)
              </Typography>
              <FormInput
                control={control}
                name="maxFileSize"
                variant="number"
                placeholder="Chọn dung lượng tối đa mỗi file"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Tài liệu đi kèm</Typography>
            </Grid>
            {attachFileFields.map((field, index) => (
              <Grid item xs={12} key={field.id}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  mb={2}
                >
                  <FormInput
                    control={control}
                    // name="attachFiles"
                    name={`attachFiles.${index}`}
                    variant="file"
                  />
                  <MuiButton
                    color="error"
                    size="small"
                    variant="outlined"
                    onClick={() => removeAttachFile(index)}
                  >
                    <Icon name="delete" size="medium" />
                  </MuiButton>
                </Stack>
              </Grid>
            ))}
            <Grid item xs={6} lg={3}>
              <Box mt={2}>
                <MuiButton
                  color="success"
                  size="large"
                  variant="outlined"
                  onClick={() => appendAttachFile()}
                >
                  <Icon name="add" size="medium" />
                </MuiButton>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box my={4}>
        <Grid container columnSpacing={3}>
          <Grid item xs={6}>
            <Button
              customVariant="normal"
              size="small"
              onClick={handleReturnResourceManagePage}
            >
              Hủy
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button customVariant="normal" type="submit" size="small">
              Lưu
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
