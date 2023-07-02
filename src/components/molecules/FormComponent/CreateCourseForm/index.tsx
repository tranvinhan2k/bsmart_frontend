import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';
import CollapseStack from '~/components/atoms/CollapseStack';
import FormInput from '~/components/atoms/FormInput';
import { OptionPayload } from '~/models';
import { CREATE_COURSE_FIELDS } from '~/form/schema';
import {
  validationSchemaCreateCourse,
  validationSchemaCreateSubCourse,
} from '~/form/validation';
import {
  defaultValueCreateCourse,
  defaultValueCreateSubCourse,
} from '~/form/defaultValues';

import toast from '~/utils/toast';
import {
  useMutationCreateCourse,
  useMutationUploadImage,
  useYupValidationResolver,
  useQueryGetAllPublicCourses,
  useDispatchGetAllSubjects,
  useDispatchGetAllCategories,
} from '~/hooks';
import { SubCoursePayload } from '~/models/subCourse';
import CreateSubCourseModal from './CreateSubCourseModal';
import UpdateSubCourseModal from './UpdateSubCourseModal';
import SubCourseList from './SubCourseList';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import { mockLevelData, typeData } from '~/constants';
import CustomCarousel from '../../CustomCarousel';
import PublicCourseItem from './PublicCourseItem';
import CustomTab from '~/components/atoms/CustomTab';
import { Color } from '~/assets/variables';
import globalStyles from '~/styles';

// TODO : Not implement useHookForm yet !! waiting for API to start

export default function CreateCourseForm() {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
  const [subCourses, setSubCourses] = useState<SubCoursePayload[]>([]);
  const [categoryId, setCategoriesId] = useState<number>();
  const [isUseCustomCourse, setUseCustomCourse] = useState<boolean>(false);
  const [selectedPublicCourse, setSelectedPublicCourse] = useState<any>();

  const { optionSubjects: subjects } = useDispatchGetAllSubjects();

  const [editIndex, setEditIndex] = useState(-1);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const { mutationPublicResult, mutationResult } = useMutationCreateCourse();
  const uploadImageMutation = useMutationUploadImage();
  const { publicCourses, isLoading } = useQueryGetAllPublicCourses();

  const resolverCreateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const createCourseHookForm = useForm({
    defaultValues: defaultValueCreateCourse,
    resolver: selectedPublicCourse ? undefined : resolverCreateCourse,
  });
  const categoryWatch = createCourseHookForm.watch(
    CREATE_COURSE_FIELDS.categoryId
  );
  const startDateWatch = createCourseHookForm.watch(
    CREATE_COURSE_FIELDS.categoryId
  );
  const endDateWatch = createCourseHookForm.watch(
    CREATE_COURSE_FIELDS.categoryId
  );
  const slotsWatch = createCourseHookForm.watch(
    CREATE_COURSE_FIELDS.categoryId
  );
  const timetableWatch = createCourseHookForm.watch(
    CREATE_COURSE_FIELDS.categoryId
  );

  const resolverCreateSubCourse = useYupValidationResolver(
    validationSchemaCreateSubCourse
  );
  const createSubCourseHookForm = useForm({
    defaultValues: defaultValueCreateSubCourse,
    resolver: resolverCreateSubCourse,
  });

  const handleTriggerModal = () => {
    createSubCourseHookForm.reset(defaultValueCreateSubCourse);
    setOpen(!open);
  };

  const handleCLoseUpdateModal = () => {
    setEditIndex(-1);
  };

  const handleOpenUpdateModal = (id: number) => {
    createSubCourseHookForm.reset(subCourses.find((_, index) => index === id));
    setEditIndex(id);
  };

  const handleCheckCustomUse = (isCheck: boolean) => {
    if (!isCheck) {
      createCourseHookForm.reset();
    }
    setUseCustomCourse(isCheck);
    setSelectedPublicCourse(undefined);
  };

  const handleOpenDialog = () => {
    setOpenDialog(() => !isOpenDialog);
  };
  const handleDelete = (index: number) => {
    handleOpenDialog();
    setDeleteIndex(index);
  };
  const handleAcceptDelete = () => {
    createSubCourseHookForm.reset();
    const value = subCourses.find((_, index) => index === deleteIndex);

    if (value) {
      setSubCourses(subCourses.filter((_, index) => index !== deleteIndex));

      toast.notifySuccessToast('Xóa khóa học thành công');
      setDeleteIndex(-1);
    } else {
      toast.notifyErrorToast(
        'Lỗi không xóa được khóa học. Vui lòng thử lại sau.'
      );
    }
    handleOpenDialog();
  };

  async function handleCreateCourse(data: any) {
    const id = toast.loadToast('Đang tạo khóa học...');
    console.log('create course ', data);

    try {
      const params: any = {
        id: selectedPublicCourse?.id,
        name: data?.name,
        categoryId: data.categoryId?.id,
        subjectId: data.subjectId?.id,
        description: data?.description,
        subCourseRequests: subCourses.map((item) => ({
          level: item.level,
          imageId: item.imageIndex,
          type: (item.type as OptionPayload).id as number,
          price: item.price,
          minStudent: item.minStudent,
          maxStudent: item.maxStudent,
          startDateExpected: item.startDateExpected,
          endDateExpected: item.endDateExpected,
          subCourseTile: item.subCourseTile,
          numberOfSlot: item.numberOfSlot,
          timeInWeekRequests: item.timeInWeekRequests.map((time) => ({
            slotId: time.slot.id,
            dayOfWeekId: time.dayInWeek.id,
          })),
        })),
      };
      createSubCourseHookForm.reset();

      if (selectedPublicCourse) {
        delete params.code;
        await mutationPublicResult.mutateAsync(params);
      } else {
        await mutationResult.mutateAsync(params);
      }
      toast.updateSuccessToast(id, 'Tạo khóa học thành công !');
      navigate('/mentor-profile/mentor-course-list');
    } catch (error: any) {
      toast.updateFailedToast(id, `Tạo khóa học thất bại: ${error.message}`);
    }
  }

  const handleCreateSubCourse = async (data: any) => {
    const id = toast.loadToast('Đang tạo khóa học ...');

    try {
      const formData = new FormData();
      formData.append('type', 'COURSE');
      formData.append('file', data.imageId);
      const imageResponse = await uploadImageMutation.mutateAsync(formData);
      if (editIndex === -1) {
        setSubCourses([
          ...subCourses,
          { ...data, imageIndex: imageResponse.id },
        ]);
        createSubCourseHookForm.reset();
        setOpen(!open);
      } else {
        const tmpSubCourses = subCourses.map((item, index) => {
          if (index === editIndex) {
            return { ...data, imageIndex: imageResponse.id };
          }
          return item;
        });
        createSubCourseHookForm.reset();
        setSubCourses(tmpSubCourses);
        setEditIndex(-1);
      }
      toast.updateSuccessToast(id, 'Tạo giờ học thành công');
    } catch (error) {
      toast.updateFailedToast(id, 'Tạo giờ học không thành công');
    }
  };

  const handleUpdateSubCourse = async (data: any) => {
    const id = toast.loadToast('Đang cập nhật khóa học ...');

    try {
      const formData = new FormData();
      formData.append('type', 'COURSE');
      formData.append('file', data.imageId);
      const imageResponse = await uploadImageMutation.mutateAsync(formData);
      if (editIndex === -1) {
        setSubCourses([
          ...subCourses,
          { ...data, imageIndex: imageResponse.id },
        ]);
        createSubCourseHookForm.reset();
        setOpen(!open);
      } else {
        const tmpSubCourses = subCourses.map((item, index) => {
          if (index === editIndex) {
            return { ...data, imageIndex: imageResponse.id };
          }
          return item;
        });
        createSubCourseHookForm.reset();
        setSubCourses(tmpSubCourses);
        setEditIndex(-1);
      }
      toast.updateSuccessToast(id, 'Cập nhật giờ học thành công');
    } catch (error) {
      toast.updateFailedToast(id, 'Cập nhật giờ học không thành công');
    }
  };

  const renderItem = (item: any) => {
    const isSelected = selectedPublicCourse?.id === item?.id;

    return (
      <PublicCourseItem
        item={item}
        isSelected={isSelected}
        onSelectedItem={() => {
          if (
            (selectedPublicCourse?.id !== item?.id ||
              selectedPublicCourse === undefined) &&
            isUseCustomCourse === false
          ) {
            setSelectedPublicCourse(item);
          } else {
            setSelectedPublicCourse(undefined);
          }
        }}
      />
    );
  };

  useEffect(() => {
    setCategoriesId(categoryWatch?.id);
  }, [categoryWatch]);

  const filterSubjects = subjects?.filter((item) => {
    return item.categoryIds?.includes(categoryId || 0);
  });

  if (!categories && !subjects) return null;

  return (
    <Stack>
      <Box marginTop={2}>
        <CustomTab
          tabContentList={[
            {
              label: 'Khóa học có sẵn',
              data: (
                <Stack>
                  {publicCourses ? (
                    <CustomCarousel
                      isLoading={isLoading}
                      label="Chọn khóa học có sẵn"
                      items={publicCourses || []}
                      renderItem={renderItem}
                    />
                  ) : (
                    <Typography>Không có khóa học cộng đồng nào.</Typography>
                  )}
                </Stack>
              ),
              onClick: () => handleCheckCustomUse(false),
            },
            {
              label: 'Tự tạo khóa học',
              data: (
                <Stack
                  sx={{
                    background: Color.white,
                  }}
                >
                  <Typography sx={globalStyles.textSubTitle}>
                    Tạo khóa học
                  </Typography>
                  <Stack marginTop={1}>
                    <FormInput
                      name={CREATE_COURSE_FIELDS.name}
                      control={createCourseHookForm.control}
                      label="Tên Khóa Học"
                      placeholder="Nhập tên khóa học"
                    />
                  </Stack>
                  <Stack marginTop={1}>
                    <FormInput
                      data={categories}
                      variant="dropdown"
                      name={CREATE_COURSE_FIELDS.categoryId}
                      control={createCourseHookForm.control}
                      label="Lĩnh Vực"
                      placeholder="Nhập lĩnh vực"
                    />
                  </Stack>
                  <Stack marginTop={1}>
                    <FormInput
                      data={filterSubjects}
                      variant="dropdown"
                      name={CREATE_COURSE_FIELDS.subjectId}
                      control={createCourseHookForm.control}
                      label="Ngôn ngữ"
                      placeholder="Nhập ngôn ngữ lập trình"
                    />
                  </Stack>
                  <Stack marginTop={1}>
                    <FormInput
                      name={CREATE_COURSE_FIELDS.description}
                      variant="multiline"
                      control={createCourseHookForm.control}
                      label="Mô tả khóa học"
                      placeholder="Nhập mô tả khóa học"
                    />
                  </Stack>
                </Stack>
              ),
              onClick: () => handleCheckCustomUse(true),
            },
          ]}
        />
      </Box>
      <Box marginTop={2}>
        <CollapseStack label="Thông tin khóa học phụ">
          <Stack padding={1}>
            <SubCourseList
              subCourses={subCourses}
              onOpenAddModal={handleTriggerModal}
              onOpenUpdateModal={handleOpenUpdateModal}
              onDeleteModal={handleDelete}
            />
            <CreateSubCourseModal
              isOpen={open}
              hookForm={createSubCourseHookForm}
              levels={mockLevelData}
              types={typeData}
              onClose={handleTriggerModal}
              onSubmit={handleCreateSubCourse}
            />
            <UpdateSubCourseModal
              index={editIndex}
              hookForm={createSubCourseHookForm}
              levels={mockLevelData}
              types={typeData}
              onClose={handleCLoseUpdateModal}
              onUpdate={handleUpdateSubCourse}
            />
          </Stack>
        </CollapseStack>
      </Box>
      <Stack marginTop={2}>
        <Button
          onClick={createCourseHookForm.handleSubmit(
            handleCreateCourse,
            (error) => {
              console.log(error);
            }
          )}
          customVariant="form"
        >
          TẠO KHÓA HỌC
        </Button>
      </Stack>
      <ConfirmDialog
        content="Bạn có chắc chắn muốn xóa giờ học này ?"
        title="Xác nhận xóa giờ học"
        open={isOpenDialog}
        handleAccept={handleAcceptDelete}
        handleClose={handleOpenDialog}
      />
    </Stack>
  );
}
