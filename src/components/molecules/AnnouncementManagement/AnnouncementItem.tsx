import {
  Box,
  Button as MuiButton,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValueUpdateAnnouncement } from '~/form/defaultValues';
import { FontFamily } from '~/assets/variables';
import { UpdateAnnouncementFormDataPayload } from '~/models/form';
import { useDeleteAnnouncement } from '~/hooks/useManageAnnouncement/delete';
import { useGetDetailsAnnouncement } from '~/hooks/useManageAnnouncement/getDetails';
import { useUpdateAnnouncement } from '~/hooks/useManageAnnouncement/update';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaUpdateAnnouncement } from '~/form/validation';
import CustomDialog from '~/components/atoms/CustomDialog';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import toast from '~/utils/toast';
import { SX_FORM_LABEL } from './style';
import { UseUpdateAnnouncementPayload } from '~/models/announcement';

interface AnnouncementItemProps {
  editMode: boolean;
  id: number;
  title: string;
  visible: boolean;
}

export default function AnnouncementItem({
  editMode,
  id,
  title,
  visible,
}: AnnouncementItemProps) {
  // const { classSectionId } = useParams();
  const idClassSection = 4;

  const { announcementDetails, isLoading, refetch } = useGetDetailsAnnouncement(
    {
      idClassSection,
      idAnnouncement: id,
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

  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false);
  const [openDialogDeleteConfirm, setOpenDialogDeleteConfirm] =
    useState<boolean>(false);

  const handleOpenDialogUpdate = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    refetch();
    setOpenDialogUpdate(true);
  };
  const handleCloseDialogUpdate = () => setOpenDialogUpdate(false);

  const handleOpenDialogDeleteConfirm = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpenDialogDeleteConfirm(true);
  };
  const handleCloseDialogDeleteConfirm = () =>
    setOpenDialogDeleteConfirm(false);

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
      idAnnouncement: id,
      data: {
        title: data.title,
        content: data.content,
        visible: data.visible,
      },
    };
    const idToast = toast.loadToast(toastMsgLoadingUpdate);
    try {
      await updateAnnouncement.mutateAsync(params);
      toast.updateSuccessToast(idToast, toastMsgSuccessUpdate);
      handleCloseDialogUpdate();
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgErrorUpdate(error));
    }
  };
  const handleSubmitSuccessDelete = async () => {
    const idToast = toast.loadToast(toastMsgLoadingDelete);
    try {
      await deleteAnnouncement.mutateAsync({
        idClassSection: Number(idClassSection),
        idAnnouncement: id,
      });
      toast.updateSuccessToast(idToast, toastMsgSuccessDelete);
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgErrorDelete(error));
    }
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        key={id}
        sx={{
          border: '1px solid #dee2e6',
          padding: 2,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: 'white',
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Icon name="chat" size="medium" />
          <Link
            href="/abc"
            underline="none"
            // onClick={handleViewDetailsResource}
            sx={{ fontFamily: FontFamily.regular }}
          >
            {title}
          </Link>
          {editMode && (
            <Box ml={1}>
              <IconButton onClick={handleOpenDialogDeleteConfirm}>
                <Icon name="delete" size="small" />
              </IconButton>
              <IconButton onClick={handleOpenDialogUpdate}>
                <Icon name="modeEdit" size="small" />
              </IconButton>
            </Box>
          )}
        </Stack>
      </Stack>

      {/* UPDATE */}
      <CustomDialog
        open={openDialogUpdate}
        onClose={handleCloseDialogUpdate}
        title={isLoading ? '' : 'Cập nhật thông báo'}
      >
        {isLoading ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <CircularProgress />
            <Typography sx={SX_FORM_LABEL}>Đang tải</Typography>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit(handleSubmitSuccessUpdate)}>
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
                <Typography sx={SX_FORM_LABEL}>Nội dung</Typography>
                <FormInput
                  control={control}
                  name="content"
                  variant="multiline"
                  placeholder="Nhập nội dung"
                />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={2}
              mt={2}
            >
              <MuiButton
                color="primary"
                fullWidth
                size="small"
                type="button"
                variant="outlined"
                onClick={handleCloseDialogUpdate}
              >
                Hủy bỏ
              </MuiButton>
              <MuiButton
                color="success"
                disabled={!formState.isDirty}
                fullWidth
                size="small"
                type="submit"
                variant="contained"
              >
                Cập nhật
              </MuiButton>
            </Stack>
          </form>
        )}
      </CustomDialog>

      {/* CONFIRM DELETE */}
      <CustomDialog
        open={openDialogDeleteConfirm}
        onClose={handleCloseDialogDeleteConfirm}
        title={`Xác nhận xóa thông báo - ${title}`}
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
  );
}
