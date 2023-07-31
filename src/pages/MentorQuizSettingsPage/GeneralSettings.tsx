import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Stack,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';
import { SX_ACCORDION_TITTLE, SX_FORM_LABEL } from './style';
import { defaultValuesEditMentorProfile } from '~/form/defaultValues';

export default function GeneralSettings() {
  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditMentorProfile
  );
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValuesEditMentorProfile,
    resolver: resolverEditPersonalProfile,
  });

  const handleSubmitSuccess = async (data: any) => {
    console.log('handleSubmitSuccess');
  };

  const gradingMethods = [
    { id: 0, value: 'Điểm cao nhất', label: 'Điểm cao nhất' },
    { id: 1, value: 'Điểm thấp nhất', label: 'Điểm thấp nhất' },
    { id: 2, value: 'Điểm trung bình', label: 'Điểm trung bình' },
    { id: 3, value: 'Lần làm đầu', label: 'Lần làm đầu' },
    { id: 4, value: 'Lần làm cuối', label: 'Lần làm cuối' },
  ];

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
                name="name"
                variant="multiline"
                placeholder="Nhập mô tả"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
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
              <FormInput control={control} name="dateStart" variant="date" />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Giờ mở</Typography>
              <FormInput control={control} name="timeStart" variant="time" />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Ngày đóng</Typography>
              <FormInput control={control} name="dateEnd" variant="date" />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Giờ đóng</Typography>
              <FormInput control={control} name="timeEnd" variant="time" />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>
                Giới hạn thời gian (giây)
              </Typography>
              <FormInput
                control={control}
                name="timeLimit"
                variant="number"
                placeholder="Nhập giới hạn thời gian"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
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
              <FormInput
                control={control}
                name="gradeToPass"
                variant="number"
                placeholder="Nhập điểm đậu"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Số lần được làm</Typography>
              <FormInput
                control={control}
                name="attemptAllowed"
                variant="number"
                placeholder="Nhập số lần được làm quiz"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Cách thức chấm điểm</Typography>
              <FormInput
                control={control}
                data={gradingMethods}
                name="gradingMethod"
                variant="dropdown"
                placeholder="Chọn cách thức chấm điểm"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box my={4}>
        <Grid container columnSpacing={3}>
          <Grid item xs={6}>
            <Button customVariant="normal" type="submit" size="small">
              Lưu
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button customVariant="normal" size="small">
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
