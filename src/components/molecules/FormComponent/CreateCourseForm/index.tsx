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
import { Color, FontFamily, FontSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import SubCourseItem from './SubCourseItem';
import { SubCoursePayload } from '~/models/subCourse';
import { LEVEL_LABELS } from '~/constants/level';
// TODO : Not implement useHookForm yet !! waiting for API to start
const mockLevelData: OptionPayload[] = [
  {
    id: 0,
    label: LEVEL_LABELS.BEGINNER,
    value: 'BEGINNER',
  },
  {
    id: 1,
    label: LEVEL_LABELS.Intermediate,
    value: 'Intermediate',
  },
  {
    id: 2,
    label: LEVEL_LABELS.Advanced,
    value: 'Advanced',
  },
  {
    id: 3,
    label: LEVEL_LABELS.Expert,
    value: 'Expert',
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
    setOpen(!open);
  };

  const handleDelete = (id: number) => {
    setSubCourses(subCourses.filter((_, index) => index !== id));
  };

  async function onSubmitSuccess(data: any) {
    const id = toast.loadToast('Đang tạo khóa học...');

    try {
      const params: RequestCreateCoursePayload = {
        code: data?.code,
        name: data?.name,
        categoryId: data.categoryId?.id,
        subjectId: data.subjectId?.id,
        description: data?.description,
        subCourseRequests: subCourses,
      };
      await createCourseMutation.mutateAsync(params);
      toast.updateSuccessToast(id, 'Tạo khóa học thành công !');
    } catch (error: any) {
      toast.updateFailedToast(id, `Tạo khóa học thất bại: ${error.message}`);
    }
  }

  const onSubmitSubCourse = async (data: any) => {
    setOpen(!open);
    const formData = new FormData();
    formData.append('type', 'COURSE');
    formData.append('file', data.imageId);
    const imageResponse = await uploadImageMutation.mutateAsync(formData);
    setSubCourses([
      ...subCourses,
      {
        ...data,
        subjectId: data.subjectId?.id,
        imageId: imageResponse.id,
        type: data.type?.id,
      },
    ]);
  };
  if (!categories && !subjects) return null;
  return (
    <Stack>
      <form
        onSubmit={createCourseHookForm.handleSubmit(
          onSubmitSuccess,
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
              label="Ngôn ngữ lập trình"
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
              <Grid container spacing={2}>
                {subCourses.map((item, index) => (
                  <SubCourseItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    id={index}
                    onDelete={handleDelete}
                    subCourse={item}
                  />
                ))}
                <Grid item xs={12}>
                  <Stack
                    sx={{
                      height: '100px',
                      border:
                        subCourses.length !== 0
                          ? '1px dotted grey'
                          : '1px solid #ff0000',
                      borderRadius: '10px',
                      '&>hover': {
                        background: 'grey',
                      },
                    }}
                  >
                    <Button
                      onClick={handleTriggerModal}
                      sx={{ flex: 1, flexGrow: 1 }}
                    >
                      <Icon name="add" size="medium" color="black" />
                    </Button>
                  </Stack>
                  <Stack>
                    {subCourses.length === 0 && (
                      <FormHelperText sx={{ color: Color.red }}>
                        Phải có ít nhất một khóa học phụ{' '}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Modal
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  borderRadius: '10px',
                  boxShadow: 3,
                }}
                open={open}
                onClose={handleTriggerModal}
              >
                <Stack
                  sx={{
                    background: 'white',
                    width: { sx: '100%', md: '50vw' },
                    padding: '20px',
                    height: '90vh',
                    alignSelf: 'center',
                    overflowY: 'scroll',
                  }}
                >
                  <Stack>
                    <IconButton
                      sx={{ alignSelf: 'flex-end' }}
                      onClick={handleTriggerModal}
                    >
                      <Icon name="close" color="black" size="medium" />
                    </IconButton>
                  </Stack>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontFamily: FontFamily.bold,
                      fontSize: FontSize.large_45,
                    }}
                  >
                    Tạo khóa học phụ mới
                  </Typography>
                  <FormInput
                    variant="text"
                    name={CREATE_SUB_COURSE_FIELDS.subCourseTile}
                    control={createSubCourseHookForm.control}
                    label="Tên khóa học phụ"
                  />
                  <FormInput
                    variant="date"
                    name={CREATE_SUB_COURSE_FIELDS.startDateExpected}
                    control={createSubCourseHookForm.control}
                    label="Ngày mở lớp dự kiến"
                  />
                  <FormInput
                    variant="date"
                    name={CREATE_SUB_COURSE_FIELDS.endDateExpected}
                    control={createSubCourseHookForm.control}
                    label="Ngày kết thúc dự kiến"
                  />
                  <FormInput
                    variant="number"
                    name={CREATE_SUB_COURSE_FIELDS.price}
                    control={createSubCourseHookForm.control}
                    label="Giá khóa học"
                  />
                  <FormInput
                    variant="number"
                    name={CREATE_SUB_COURSE_FIELDS.minStudent}
                    control={createSubCourseHookForm.control}
                    label="Số học sinh tối thiểu"
                  />
                  <FormInput
                    variant="number"
                    name={CREATE_SUB_COURSE_FIELDS.maxStudent}
                    control={createSubCourseHookForm.control}
                    label="Số học sinh tối đa"
                  />
                  <FormInput
                    data={mockLevelData}
                    variant="radioGroup"
                    name={CREATE_SUB_COURSE_FIELDS.level}
                    control={createSubCourseHookForm.control}
                    label="Trình độ"
                  />
                  <FormInput
                    variant="image"
                    name={CREATE_SUB_COURSE_FIELDS.imageId}
                    control={createSubCourseHookForm.control}
                    label="Hình ảnh"
                  />
                  <FormInput
                    data={subjects}
                    variant="dropdown"
                    name={CREATE_SUB_COURSE_FIELDS.subjectId}
                    control={createSubCourseHookForm.control}
                    label="Ngôn ngữ lập trình"
                  />
                  <FormInput
                    data={typeData}
                    variant="dropdown"
                    name={CREATE_SUB_COURSE_FIELDS.type}
                    control={createSubCourseHookForm.control}
                    label="Hình thức khóa học"
                  />
                  <FormInput
                    name={CREATE_SUB_COURSE_FIELDS.numberOfSlot}
                    variant="number"
                    control={createSubCourseHookForm.control}
                    label="Số buổi học"
                  />
                  <FormInput
                    name={CREATE_SUB_COURSE_FIELDS.timeInWeekRequests}
                    variant="timetable"
                    control={createSubCourseHookForm.control}
                    label="Thời khóa biểu"
                  />
                  <Button
                    onClick={createSubCourseHookForm.handleSubmit(
                      onSubmitSubCourse
                    )}
                    customVariant="normal"
                  >
                    Tạo khóa học phụ
                  </Button>
                </Stack>
              </Modal>
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
