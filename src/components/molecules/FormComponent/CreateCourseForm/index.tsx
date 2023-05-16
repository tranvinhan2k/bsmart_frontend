import { useState } from 'react';
import {
  Box,
  Modal,
  Stack,
  Typography,
  Grid,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import CollapseStack from '~/components/atoms/CollapseStack';
import FormInput from '~/components/atoms/FormInput';
import { OptionPayload } from '~/models';
import { CREATE_COURSE_FIELDS, CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
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
  useQueryGetAllCategories,
  useQueryGetAllSubjects,
  useMutationUploadImage,
  useYupValidationResolver,
} from '~/hooks';
import { RequestCreateCoursePayload } from '~/api/courses';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import SubCourseItem from './SubCourseItem';
import { SubCoursePayload } from '~/models/subCourse';
import { LEVEL_LABELS } from '~/constants/level';
import CreateSubCourseModal from './CreateSubCourseModal';
import UpdateSubCourseModal from './UpdateSubCourseModal';
import SubCourseList from './SubCourseList';

// TODO : Not implement useHookForm yet !! waiting for API to start
const mockLevelData: OptionPayload[] = [
  {
    id: 0,
    label: LEVEL_LABELS.BEGINNER,
    value: 'BEGINNER',
  },
  {
    id: 1,
    label: LEVEL_LABELS.INTERMEDIATE,
    value: 'INTERMEDIATE',
  },
  {
    id: 2,
    label: LEVEL_LABELS.ADVANCED,
    value: 'ADVANCED',
  },
  {
    id: 3,
    label: LEVEL_LABELS.EXPERT,
    value: 'EXPERT',
  },
];

const typeData: OptionPayload[] = [
  {
    id: 0,
    label: 'Online',
    value: 'ONLINE',
  },
  {
    id: 1,
    label: 'Offline',
    value: 'OFFLINE',
  },
];

export default function CreateCourseForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [subCourses, setSubCourses] = useState<SubCoursePayload[]>([]);
  const { subjects } = useQueryGetAllSubjects();
  const { categories } = useQueryGetAllCategories();
  const [editIndex, setEditIndex] = useState(-1);

  const createCourseMutation = useMutationCreateCourse();
  const uploadImageMutation = useMutationUploadImage();

  const resolverCreateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const createCourseHookForm = useForm({
    defaultValues: defaultValueCreateCourse,
    resolver: resolverCreateCourse,
  });

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
  const handleDelete = () => {
    createSubCourseHookForm.reset();

    setSubCourses(subCourses.filter((_, index) => index !== editIndex));
    toast.notifySuccessToast('Xóa khóa học thành công');
    setEditIndex(-1);
    // setSubCourses(subCourses.filter((_, index) => index !== id));
  };

  async function handleCreateCourse(data: any) {
    const id = toast.loadToast('Đang tạo khóa học...');

    try {
      const params: any = {
        code: data?.code,
        name: data?.name,
        categoryId: data.categoryId?.id,
        subjectId: data.subjectId.id,
        description: data?.description,
        subCourseRequests: subCourses.map((item) => ({
          ...item,
          imageId: item.imageIndex,
          subjectId: (item.subjectId as OptionPayload).id as number,
          type: (item.type as OptionPayload).id as number,
          timeInWeekRequests: item.timeInWeekRequests.map((time) => ({
            slotId: time.slot.id,
            dayOfWeekId: time.dayInWeek.id,
          })),
        })),
      };
      createSubCourseHookForm.reset();

      await createCourseMutation.mutateAsync(params);
      toast.updateSuccessToast(id, 'Tạo khóa học thành công !');
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

  if (!categories && !subjects) return null;

  return (
    <Stack>
      <form
        onSubmit={createCourseHookForm.handleSubmit(
          handleCreateCourse,
          (error) => {
            console.log(error);
          }
        )}
      >
        <CollapseStack label="Thông tin khóa học">
          <Stack padding={1}>
            <FormInput
              name={CREATE_COURSE_FIELDS.code}
              control={createCourseHookForm.control}
              label="Mã khóa học"
            />
            <FormInput
              name={CREATE_COURSE_FIELDS.name}
              control={createCourseHookForm.control}
              label="Tên Khóa Học"
            />
            <FormInput
              data={categories}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.categoryId}
              control={createCourseHookForm.control}
              label="Lĩnh Vực"
            />
            <FormInput
              data={subjects}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.subjectId}
              control={createCourseHookForm.control}
              label="Ngôn ngữ"
            />
            <FormInput
              name={CREATE_COURSE_FIELDS.description}
              variant="multiline"
              control={createCourseHookForm.control}
              label="Mô tả khóa học"
            />
          </Stack>
        </CollapseStack>
        <Box marginTop={2}>
          <CollapseStack label="Thông tin khóa học phụ">
            <Stack padding={1}>
              <SubCourseList
                subCourses={subCourses}
                onOpenAddModal={handleTriggerModal}
                onOpenUpdateModal={handleOpenUpdateModal}
              />
              <CreateSubCourseModal
                isOpen={open}
                hookForm={createSubCourseHookForm}
                levels={mockLevelData}
                subjects={subjects}
                types={typeData}
                onClose={handleTriggerModal}
                onSubmit={handleCreateSubCourse}
              />
              <UpdateSubCourseModal
                index={editIndex}
                hookForm={createSubCourseHookForm}
                levels={mockLevelData}
                subjects={subjects}
                types={typeData}
                onClose={handleCLoseUpdateModal}
                onDelete={handleDelete}
                onUpdate={handleUpdateSubCourse}
              />
            </Stack>
          </CollapseStack>
        </Box>
        <Stack marginTop={2}>
          <Button type="submit" customVariant="form">
            TẠO KHÓA HỌC
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
