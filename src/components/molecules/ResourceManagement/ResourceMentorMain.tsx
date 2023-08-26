import { Box, Button as MuiButton, Stack } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useManageClass } from '~/hooks/useManageClass';
import Button from '~/components/atoms/Button';
import CustomSwitch from '~/components/atoms/Switch';
import { ClassCreateClassSectionPayload } from '~/models/class';
import { CreateClassSectionsFormDefault } from '~/models/form';
import { defaultValueCreateClassSections } from '~/form/defaultValues';
import { FontFamily } from '~/assets/variables';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaCreateClassSections } from '~/form/validation';
import ClassSection from '~/components/molecules/ResourceMentor/ClassSection';
import CustomDialog from '~/components/atoms/CustomDialog';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { toastMsgError } from '~/utils/common';

interface ResourceMentorMainProps {
  editMode: boolean;
}

export default function ResourceMentorMain({
  editMode,
}: ResourceMentorMainProps) {
  const id = 4;
  const { classDetails, createClassSections } = useManageClass({ id });

  const [expandAll, setExpandAll] = useState(false);
  const handleSetExpandAll = (event: ChangeEvent<HTMLInputElement>) => {
    setExpandAll(event.target.checked);
  };

  const resolverCreateClassSections = useYupValidationResolver(
    validationSchemaCreateClassSections
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueCreateClassSections,
    resolver: resolverCreateClassSections,
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleCloseDialog = () => {
    reset(defaultValueCreateClassSections);
    setOpenDialog(!openDialog);
  };

  const toastMsgLoading = 'Đang tạo...';
  const toastMsgSuccess = 'Tạo thành công';
  const handleSubmitSuccess = async (data: CreateClassSectionsFormDefault) => {
    const params: ClassCreateClassSectionPayload = {
      id,
      data: {
        name: data.name,
      },
    };
    const idToast = toast.loadToast(toastMsgLoading);
    try {
      await createClassSections.mutateAsync(params);
      toast.updateSuccessToast(idToast, toastMsgSuccess);
      handleCloseDialog();
    } catch (error: unknown) {
      toast.updateFailedToast(idToast, toastMsgError(error));
    }
  };

  return (
    <>
      <Stack
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={1}
        mb={2}
      >
        <CustomSwitch
          text="Mở rộng tất cả"
          editMode={expandAll}
          handleSetEditMode={handleSetExpandAll}
        />
      </Stack>
      {classDetails && classDetails.classSectionList && (
        <ClassSection editMode={editMode} />
      )}
      {editMode && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="miSmartWhite"
            onClick={handleCloseDialog}
          >
            Thêm tài nguyên
          </Button>
        </Box>
      )}
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="Nhập tên tài nguyên mới"
      >
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <FormInput
            control={control}
            name="name"
            variant="text"
            placeholder="Nhập tên"
          />
          <Box mt={2}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={2}
            >
              <MuiButton
                color="error"
                size="small"
                variant="contained"
                sx={{ fontFamily: FontFamily.regular }}
                onClick={handleCloseDialog}
              >
                Hủy bỏ
              </MuiButton>
              <MuiButton
                color="success"
                size="small"
                type="submit"
                variant="contained"
                sx={{ fontFamily: FontFamily.regular }}
              >
                Tạo mới
              </MuiButton>
            </Stack>
          </Box>
        </form>
      </CustomDialog>
    </>
  );
}
