import {
  Box,
  Button as MuiButton,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateAnnouncementFormDataPayload } from '~/models/form';
import { defaultValueCreateAnnouncement } from '~/form/defaultValues';
import { useCreateAnnouncement } from '~/hooks/useManageAnnouncement/create';
import { UseCreateAnnouncementPayload } from '~/models/announcement';
import { useSearchAnnouncements } from '~/hooks/useManageAnnouncement/search';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaCreateAnnouncement } from '~/form/validation';
import AnnouncementItem from './AnnouncementItem';
import AnnouncementListFetchStatus from './AnnouncementListFetchStatus';
import CustomDialog from '~/components/atoms/CustomDialog';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM_LABEL } from './style';

interface AnnouncementManagementProps {
  editMode: boolean;
}

export default function AnnouncementManagement({
  editMode,
}: AnnouncementManagementProps) {
  const idClassSection = 4;
  const page = 0;
  const size = 5;
  const sort = [''];

  const { announcements, isLoading, isError } = useSearchAnnouncements({
    idClassSection,
    page,
    size,
    sort,
  });
  const { createAnnouncement } = useCreateAnnouncement();

  const resolverCreateAnnouncement = useYupValidationResolver(
    validationSchemaCreateAnnouncement
  );
  const { control, handleSubmit, reset } = useForm({
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
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgError(error));
    }
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleCloseDialog = () => {
    reset(defaultValueCreateAnnouncement);
    setOpenDialog(!openDialog);
  };

  const handleCreateAnnouncement = () => setOpenDialog(true);
  const handleReturnResourceManagePage = () => setOpenDialog(false);

  return (
    <>
      <AnnouncementListFetchStatus isLoading={isLoading} isError={isError} />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        mt={2}
      >
        {announcements &&
          announcements.items.map((item) => (
            <AnnouncementItem
              editMode={editMode}
              key={item.id}
              id={item.id}
              title={item.title}
              visible={item.visible}
            />
          ))}
        {editMode && (
          <>
            <Box mt={2}>
              <MuiButton
                variant="contained"
                color="miSmartWhite"
                onClick={handleCreateAnnouncement}
              >
                Thêm thông báo
              </MuiButton>
            </Box>
            <CustomDialog
              open={openDialog}
              onClose={handleCloseDialog}
              title="Tạo thông báo mới"
            >
              <form onSubmit={handleSubmit(handleSubmitSuccess)}>
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
                    onClick={handleReturnResourceManagePage}
                  >
                    Hủy
                  </MuiButton>
                  <MuiButton
                    color="success"
                    fullWidth
                    size="small"
                    type="submit"
                    variant="contained"
                  >
                    Tạo
                  </MuiButton>
                </Stack>
              </form>
            </CustomDialog>
          </>
        )}
      </Stack>
    </>
  );
}
