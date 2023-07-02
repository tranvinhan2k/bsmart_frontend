import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button as MuiButton,
  Typography,
  Stack,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormInput from '~/components/atoms/FormInput';
import { validationSchemaCreateAnnouncement } from '~/form/validation';
import { defaultValueCreateAnnouncement } from '~/form/defaultValues';
import { useYupValidationResolver } from '~/hooks';
import { MentorNavigationActionData } from '~/constants';
import { SX_ACCORDION_TITTLE, SX_FORM_LABEL } from './style';
import { CreateAnnouncementFormDataPayload } from '~/models/form';
import { useCreateAnnouncement } from '~/hooks/useManageAnnouncement/create';
import toast from '~/utils/toast';
import { scrollToTop } from '~/utils/common';
import { UseCreateAnnouncementPayload } from '~/models/announcement';

export default function MentorCreateAnnouncementPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  // const { classSectionId } = useParams();
  const idClassSection = 4;
  const { createAnnouncement } = useCreateAnnouncement();

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
  const navigate = useNavigate();
  const handleSubmitSuccess = async (
    data: CreateAnnouncementFormDataPayload
  ) => {
    const params: UseCreateAnnouncementPayload = {
      idClassSection: Number(idClassSection),
      data: {
        content: data.content,
        title: data.title,
        visible: true,
        // visible: typeof data.visible === 'boolean' ? data.visible : data.visible.value,
      },
    };
    const idToast = toast.loadToast(toastMsgLoading);
    try {
      await createAnnouncement.mutateAsync(params);
      toast.updateSuccessToast(idToast, toastMsgSuccess);
      navigate(
        `/mentor-profile/${MentorNavigationActionData[2].items?.[0].link}`
      );
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgError(error));
    }
  };

  // const handleAbortCreateAnnouncement = () =>

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
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={2}
        mt={2}
      >
        <MuiButton variant="contained" color="success">
          Tạo mới
        </MuiButton>
      </Stack>
    </form>
  );
}
