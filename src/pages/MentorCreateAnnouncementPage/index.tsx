import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { validationSchemaCreateAnnouncement } from '~/form/validation';
import { defaultValueCreateAnnouncement } from '~/form/defaultValues';
import { useYupValidationResolver } from '~/hooks';
import { MentorNavigationActionData } from '~/constants';
import { SX_ACCORDION_TITTLE, SX_FORM_LABEL } from './style';
import { useManageAnnouncement } from '~/hooks/useManageAnnouncement';
import { CreateAnnouncementFormDataPayload } from '~/models/form';
import { ClassCreateAnnouncementPayload } from '~/models/class';
import toast from '~/utils/toast';

export default function MentorCreateAnnouncementPage() {
  const id = 4; /* Hard code */
  const { createAnnouncement } = useManageAnnouncement({ id });

  const resolverCreateAnnouncement = useYupValidationResolver(
    validationSchemaCreateAnnouncement
  );
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValueCreateAnnouncement,
    resolver: resolverCreateAnnouncement,
  });

  const toastMsgLoading = 'Đang tạo...';
  const toastMsgSuccess = 'Tạo thành công';
  const toastMsgError = (error: any): string =>
    `Tạo không thành công: ${error.message}`;

  const handleSubmitSuccess = async (
    data: CreateAnnouncementFormDataPayload
  ) => {
    const params: ClassCreateAnnouncementPayload = {
      id,
      data: {
        content: data.content,
        title: data.title,
        visible: data.visible,
      },
    };
    const idToast = toast.loadToast(toastMsgLoading);
    try {
      await createAnnouncement.mutateAsync(params);
      toast.updateSuccessToast(idToast, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgError(error));
    }
  };

  const navigate = useNavigate();
  const handleReturnResourceManagePage = () =>
    navigate(`/mentor-profile/${MentorNavigationActionData[6].link}`);

  const types = [
    {
      id: 0,
      label: 'Hiển thị',
      value: true,
    },
    {
      id: 1,
      label: 'Ẩn',
      value: false,
    },
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
                name="title"
                variant="text"
                placeholder="Nhập tên"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Mô tả</Typography>
              <FormInput
                control={control}
                name="content"
                variant="multiline"
                placeholder="Nhập mô tả"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Hiển thị</Typography>
              <FormInput
                dataDropdownDynamicValue={types}
                variant="dropdownDynamicValue"
                name="visible"
                control={control}
              />
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
