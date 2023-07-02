import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button as MuiButton,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultValueUpdateAnnouncement } from '~/form/defaultValues';
import { MentorNavigationActionData } from '~/constants';
import { scrollToTop } from '~/utils/common';
import { UpdateAnnouncementFormDataPayload } from '~/models/form';
import { useDeleteAnnouncement } from '~/hooks/useManageAnnouncement/delete';
import { useGetDetailsAnnouncement } from '~/hooks/useManageAnnouncement/getDetails';
import { useUpdateAnnouncement } from '~/hooks/useManageAnnouncement/update';
import { UseUpdateAnnouncementPayload } from '~/models/announcement';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaUpdateAnnouncement } from '~/form/validation';
import AnnouncementListFetchStatus from '~/components/molecules/AnnouncementManagement/AnnouncementListFetchStatus';
import CustomDialog from '~/components/atoms/CustomDialog';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_ACCORDION_TITTLE, SX_FORM_LABEL } from './style';

export default function MentorCreateAnnouncementPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  // const { classSectionId } = useParams();
  const idClassSection = 4;
  const { idAnnouncement } = useParams();
  const { announcementDetails, isError, isLoading } = useGetDetailsAnnouncement(
    {
      idClassSection,
      idAnnouncement: Number(idAnnouncement),
    }
  );
  const updateAnnouncement = useUpdateAnnouncement();
  const deleteAnnouncement = useDeleteAnnouncement();

  const resolverUpdateAnnouncement = useYupValidationResolver(
    validationSchemaUpdateAnnouncement
  );
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: defaultValueUpdateAnnouncement,
    resolver: resolverUpdateAnnouncement,
  });

  useEffect(() => {
    if (announcementDetails) {
      defaultValueUpdateAnnouncement.title = announcementDetails.title;
      defaultValueUpdateAnnouncement.content = announcementDetails.content;
      defaultValueUpdateAnnouncement.visible = announcementDetails.visible;
      reset(defaultValueUpdateAnnouncement);
    }
  }, [announcementDetails, reset]);

  const navigate = useNavigate();
  const handleNavigateClassDetailsPage = () =>
    navigate(
      `/mentor-profile/${
        MentorNavigationActionData[2].items?.[0].link.split('/')[0]
      }`
    );

  const toastMsgLoadingUpdate = 'Đang cập nhật...';
  const toastMsgSuccessUpdate = 'Cập nhật thành công';
  const toastMsgErrorUpdate = (error: any): string =>
    `Cập nhật không thành công: ${error.message}`;
  const toastMsgLoadingDelete = 'Đang xóa...';
  const toastMsgSuccessDelete = 'Xóa thành công';
  const toastMsgErrorDelete = (error: any): string =>
    `Xóa không thành công: ${error.message}`;

  const handleSubmitSuccessUpdate = async (
    data: UpdateAnnouncementFormDataPayload
  ) => {
    const params: UseUpdateAnnouncementPayload = {
      idClassSection: Number(idClassSection),
      idAnnouncement: Number(idAnnouncement),
      data: {
        title: data.title,
        content: data.content,
        visible: data.visible,
      },
    };
    const idToast = toast.loadToast(toastMsgLoadingUpdate);
    handleNavigateClassDetailsPage();
    try {
      await updateAnnouncement.mutateAsync(params);
      toast.updateSuccessToast(idToast, toastMsgSuccessUpdate);
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgErrorUpdate(error));
    }
  };
  const handleSubmitSuccessDelete = async () => {
    const idToast = toast.loadToast(toastMsgLoadingDelete);
    try {
      await deleteAnnouncement.mutateAsync({
        idClassSection: Number(idClassSection),
        idAnnouncement: Number(idAnnouncement),
      });
      toast.updateSuccessToast(idToast, toastMsgSuccessDelete);
      handleNavigateClassDetailsPage();
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgErrorDelete(error));
    }
  };

  const [openDialogDeleteConfirm, setOpenDialogDeleteConfirm] =
    useState<boolean>(false);

  const handleOpenDialogDeleteConfirm = () => setOpenDialogDeleteConfirm(true);
  const handleCloseDialogDeleteConfirm = () =>
    setOpenDialogDeleteConfirm(false);

  return (
    <>
      <AnnouncementListFetchStatus isLoading={isLoading} isError={isError} />
      {announcementDetails && (
        <>
          <form onSubmit={handleSubmit(handleSubmitSuccessUpdate)}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography sx={SX_ACCORDION_TITTLE}>
                    Cài đặt chung
                  </Typography>
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
              <MuiButton
                color="error"
                fullWidth
                size="small"
                type="button"
                variant="contained"
                onClick={handleOpenDialogDeleteConfirm}
              >
                Xóa
              </MuiButton>
              <MuiButton
                color="success"
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                disabled={!formState.isDirty}
              >
                Cập nhật
              </MuiButton>
            </Stack>
          </form>

          {/* CONFIRM DELETE */}
          <CustomDialog
            open={openDialogDeleteConfirm}
            onClose={handleCloseDialogDeleteConfirm}
            title={`Xác nhận xóa thông báo - ${announcementDetails.title}`}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              mt={2}
            >
              <MuiButton
                color="primary"
                fullWidth
                size="small"
                type="button"
                variant="outlined"
                onClick={handleCloseDialogDeleteConfirm}
              >
                Hủy bỏ
              </MuiButton>
              <MuiButton
                color="error"
                fullWidth
                size="small"
                type="button"
                variant="contained"
                onClick={handleSubmitSuccessDelete}
              >
                Xóa
              </MuiButton>
            </Stack>
          </CustomDialog>
        </>
      )}
    </>
  );
}
