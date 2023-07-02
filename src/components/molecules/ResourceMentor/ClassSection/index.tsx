import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button as MuiButton,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily } from '~/assets/variables';
import {
  ClassDeleteClassSectionPayload,
  ClassUpdateClassSectionPayload,
} from '~/models/class';
import { defaultValueUpdateClassSections } from '~/form/defaultValues';
import { MentorNavigationActionData } from '~/constants';
import { UpdateClassSectionsFormDefault } from '~/models/form';
import { useManageClass } from '~/hooks/useManageClass';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaUpdateClassSections } from '~/form/validation';
import Button from '~/components/atoms/Button';
import CustomDialog from '~/components/atoms/CustomDialog';
import FormInput from '~/components/atoms/FormInput';
import Icon, { IconName } from '~/components/atoms/Icon';
import Resource from '~/components/molecules/ResourceMentor/Resource';
import toast from '~/utils/toast';
import { SX_RESOURCE_TITTLE } from './style';

interface ClassSectionProps {
  editMode: boolean;
}

export default function ClassSection({ editMode }: ClassSectionProps) {
  const id = 4;
  const { classDetails, updateClassSections, deleteClassSections } =
    useManageClass({ id });

  const resolverUpdateClassSections = useYupValidationResolver(
    validationSchemaUpdateClassSections
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueUpdateClassSections,
    resolver: resolverUpdateClassSections,
  });

  const [selectedClassSectionsId, setSelectedClassSectionsId] =
    useState<number>(0);

  const [openDialogAddActivity, setOpenDialogAddActivity] =
    useState<boolean>(false);
  const handleOpenDialogAddActivity = (classSectionId: number) => {
    setSelectedClassSectionsId(classSectionId);
    setOpenDialogAddActivity(true);
  };
  const handleCloseDialogAddActivity = () => setOpenDialogAddActivity(false);

  const [openDialogUpdateActivity, setOpenDialogUpdateActivity] =
    useState<boolean>(false);
  const handleOpenDialogUpdateActivity = (
    e: MouseEvent<HTMLElement>,
    classSectionId: number,
    classSectionName: string
  ) => {
    e.stopPropagation();
    setSelectedClassSectionsId(classSectionId);
    defaultValueUpdateClassSections.name = classSectionName;
    reset(defaultValueUpdateClassSections);
    //
    setOpenDialogUpdateActivity(true);
  };
  const handleCloseDialogUpdateActivity = () =>
    setOpenDialogUpdateActivity(false);

  const [openDialogDeleteConfirmActivity, setOpenDialogDeleteConfirmActivity] =
    useState<boolean>(false);
  const handleOpenDialogDeleteConfirmActivity = (
    e: MouseEvent<HTMLElement>,
    classSectionId: number,
    classSectionName: string
  ) => {
    e.stopPropagation();
    setSelectedClassSectionsId(classSectionId);
    defaultValueUpdateClassSections.name = classSectionName;
    reset(defaultValueUpdateClassSections);
    //
    setOpenDialogDeleteConfirmActivity(true);
  };
  const handleCloseDialogDeleteConfirmActivity = () =>
    setOpenDialogDeleteConfirmActivity(false);

  const toastMsgUpdateLoading = 'Đang cập nhật...';
  const toastMsgUpdateSuccess = 'Cập nhật thành công';
  const toastMsgUpdateError = (error: any): string =>
    `Cập nhật không thành công: ${error.message}`;
  const handleSubmitUpdate = async (data: UpdateClassSectionsFormDefault) => {
    const params: ClassUpdateClassSectionPayload = {
      id,
      classSectionId: selectedClassSectionsId,
      data: {
        name: data.name,
      },
    };
    const idToast = toast.loadToast(toastMsgUpdateLoading);
    try {
      await updateClassSections.mutateAsync(params);
      toast.updateSuccessToast(idToast, toastMsgUpdateSuccess);
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgUpdateError(error));
    }
  };

  const toastMsgDeleteLoading = 'Đang xóa...';
  const toastMsgDeleteSuccess = 'Xóa thành công';
  const toastMsgDeleteError = (error: any): string =>
    `Xóa không thành công: ${error.message}`;
  const handleSubmitDelete = async () => {
    const params: ClassDeleteClassSectionPayload = {
      id,
      classSectionId: selectedClassSectionsId,
    };
    const idToast = toast.loadToast(toastMsgDeleteLoading);
    try {
      await deleteClassSections.mutateAsync(params);
      toast.updateSuccessToast(idToast, toastMsgDeleteSuccess);
      handleCloseDialogDeleteConfirmActivity();
    } catch (error: any) {
      toast.updateFailedToast(idToast, toastMsgDeleteError(error));
    }
  };

  const navigate = useNavigate();
  const handleCreateQuiz = () =>
    navigate(
      `/mentor-profile/${
        MentorNavigationActionData[4].items?.[1].link.split('/')[0]
      }/${selectedClassSectionsId}`
    );

  const handleCreateAssignment = () =>
    navigate(
      `/mentor-profile/${
        MentorNavigationActionData[4].items?.[3].link.split('/')[0]
      }/${selectedClassSectionsId}`
    );

  interface ClassSectionCreatorProps {
    id: number;
    name: string;
    iconName: IconName;
    onClickAction: () => void;
  }
  const topicCreatorList: ClassSectionCreatorProps[] = [
    {
      id: 1,
      name: 'Quiz',
      iconName: 'quiz',
      onClickAction: handleCreateQuiz,
    },
    {
      id: 2,
      name: 'Assignment',
      iconName: 'assignment',
      onClickAction: handleCreateAssignment,
    },
  ];

  const noOfActivitiesOfClassSections =
    (classDetails &&
      classDetails.classSectionList.find(
        (classSection) => classSection.id === selectedClassSectionsId
      )?.activities.length) ||
    0;

  return (
    <Box>
      {classDetails &&
        classDetails.classSectionList.map((classSection) => (
          <Box mb={2} key={classSection.id}>
            <Accordion
              sx={{
                backgroundColor: Color.white,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  // spacing={2}
                >
                  <Typography sx={SX_RESOURCE_TITTLE}>
                    {classSection.name}
                  </Typography>
                  {editMode && (
                    <Box ml={1}>
                      <IconButton
                        onClick={(e: MouseEvent<HTMLElement>) =>
                          handleOpenDialogDeleteConfirmActivity(
                            e,
                            classSection.id,
                            classSection.name
                          )
                        }
                      >
                        <Icon name="delete" size="small" />
                      </IconButton>
                      <IconButton
                        onClick={(e: MouseEvent<HTMLElement>) =>
                          handleOpenDialogUpdateActivity(
                            e,
                            classSection.id,
                            classSection.name
                          )
                        }
                      >
                        <Icon name="modeEdit" size="small" />
                      </IconButton>
                    </Box>
                  )}
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {classSection.activities.map((activity) => (
                    <Resource
                      key={activity.id}
                      editMode={editMode}
                      resourceName={activity.name}
                      activityId={activity.id}
                      activityTypeCode={activity.type.code}
                    />
                  ))}
                </Stack>
                {editMode && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleOpenDialogAddActivity(classSection.id)
                      }
                    >
                      Thêm hoạt động
                    </Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      {/* ADD */}
      <CustomDialog
        open={openDialogAddActivity}
        onClose={handleCloseDialogAddActivity}
        title="Chọn loại hoạt động mới"
      >
        <>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            {topicCreatorList.map((topicCreator) => (
              <Grid item xs={6} sm={4} key={topicCreator.id}>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={topicCreator.onClickAction}
                  startIcon={
                    <Icon name={topicCreator.iconName} size="medium" />
                  }
                >
                  {topicCreator.name}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Box mt={4}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={2}
            >
              <MuiButton
                color="error"
                // fullWidth
                size="small"
                type="submit"
                variant="contained"
                sx={{ fontFamily: FontFamily.regular }}
                onClick={handleCloseDialogAddActivity}
              >
                Hủy bỏ
              </MuiButton>
            </Stack>
          </Box>
        </>
      </CustomDialog>
      {/* UPDATE */}
      <CustomDialog
        open={openDialogUpdateActivity}
        onClose={handleCloseDialogUpdateActivity}
        title="Cập nhật tài nguyên"
      >
        <form onSubmit={handleSubmit(handleSubmitUpdate)}>
          <FormInput
            control={control}
            name="name"
            variant="text"
            placeholder="Nhập tên mới"
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
                onClick={handleCloseDialogUpdateActivity}
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
                Cập nhật
              </MuiButton>
            </Stack>
          </Box>
        </form>
      </CustomDialog>
      {/* CONFIRM DELETE */}
      <CustomDialog
        open={openDialogDeleteConfirmActivity}
        onClose={handleCloseDialogDeleteConfirmActivity}
        title={`Xác nhận xóa - ${defaultValueUpdateClassSections.name}`}
      >
        <Box>
          {classDetails && (
            <Typography>
              Lớp đang có{' '}
              <span style={{ color: Color.red }}>
                {noOfActivitiesOfClassSections}
              </span>{' '}
              hoạt động
            </Typography>
          )}
          <form onSubmit={handleSubmit(handleSubmitDelete)}>
            <Box mt={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <MuiButton
                  color="error"
                  fullWidth
                  size="small"
                  variant="contained"
                  sx={{ fontFamily: FontFamily.regular }}
                  onClick={handleCloseDialogDeleteConfirmActivity}
                >
                  Hủy bỏ
                </MuiButton>
                <MuiButton
                  color="success"
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={{ fontFamily: FontFamily.regular }}
                >
                  Xóa
                </MuiButton>
              </Stack>
            </Box>
          </form>
        </Box>
      </CustomDialog>
    </Box>
  );
}
