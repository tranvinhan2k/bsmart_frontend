import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import CollapseStack from '~/components/atoms/CollapseStack';
import FormInput from '~/components/atoms/FormInput';
import { OptionPayload } from '~/models';
import { CREATE_COURSE_FIELDS } from '~/form/schema';
import { validationSchemaCreateCourse } from '~/form/validation';
import { defaultValueCreateCourse } from '~/form/defaultValues';

import toast from '~/utils/toast';
import {
  useMutationCreateCourse,
  useQueryGetAllCategories,
  useQueryGetAllSubjects,
  useMutationUploadImage,
  useYupValidationResolver,
} from '~/hooks';
import { RequestCreateCoursePayload } from '~/api/courses';
// TODO : Not implement useHookForm yet !! waiting for API to start
const mockLevelData: OptionPayload[] = [
  {
    id: 0,
    label: 'Beginner',
    value: 'BEGINNER',
  },
  {
    id: 1,
    label: 'Intermediate',
    value: 'Intermediate',
  },
  {
    id: 2,
    label: 'Advanced',
    value: 'Advanced',
  },
  {
    id: 3,
    label: 'Expert',
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

  async function onSubmitSuccess(data: any) {
    const id = toast.loadToast('Đang tạo khóa học...');

    console.log('data', data);
    try {
      const formData = new FormData();
      formData.append('type', 'COURSE');
      formData.append('file', data.image);
      const imageResponse = await uploadImageMutation.mutateAsync(formData);
      const params: RequestCreateCoursePayload = {
        name: data?.name,
        level: data?.level,
        categoryId: data.category?.id,
        imageId: imageResponse.id,
        subjectId: data.subject?.id,
        type: data.type.id,
        price: Number(data.price),
        minStudent: data.minStudent,
        maxStudent: data.maxStudent,
        startDateExpected: data.startDateExpected?.toISOString(),
        endDateExpected: data.endDateExpected?.toISOString(),
        description: data.description,
      };

      await createCourseMutation.mutateAsync(params);
      toast.updateSuccessToast(id, 'Tạo khóa học thành công !');
    } catch (error: any) {
      toast.updateFailedToast(id, `Tạo khóa học thất bại: ${error.message}`);
    }
  }
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
              name={CREATE_COURSE_FIELDS.name}
              control={createCourseHookForm.control}
              label="Tên Khóa Học"
            />
            <FormInput
              variant="date"
              name={CREATE_COURSE_FIELDS.startDateExpected}
              control={createCourseHookForm.control}
              label="Ngày mở lớp dự kiến"
            />
            <FormInput
              variant="date"
              name={CREATE_COURSE_FIELDS.endDateExpected}
              control={createCourseHookForm.control}
              label="Ngày kết thúc dự kiến"
            />
            <FormInput
              variant="number"
              name={CREATE_COURSE_FIELDS.price}
              control={createCourseHookForm.control}
              label="Giá khóa học"
            />
            <FormInput
              variant="number"
              name={CREATE_COURSE_FIELDS.minStudent}
              control={createCourseHookForm.control}
              label="Số học sinh tối thiểu"
            />
            <FormInput
              variant="number"
              name={CREATE_COURSE_FIELDS.maxStudent}
              control={createCourseHookForm.control}
              label="Số học sinh tối đa"
            />
            <FormInput
              data={mockLevelData}
              variant="radioGroup"
              name={CREATE_COURSE_FIELDS.level}
              control={createCourseHookForm.control}
              label="Trình độ"
            />
            <FormInput
              variant="image"
              name={CREATE_COURSE_FIELDS.image}
              control={createCourseHookForm.control}
              label="Hình ảnh"
            />
            <FormInput
              data={categories}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.category}
              control={createCourseHookForm.control}
              label="Lĩnh Vực"
            />
            <FormInput
              data={subjects}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.subject}
              control={createCourseHookForm.control}
              label="Ngôn ngữ lập trình"
            />
            <FormInput
              data={typeData}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.type}
              control={createCourseHookForm.control}
              label="Hình thức khóa học"
            />
            <FormInput
              name={CREATE_COURSE_FIELDS.description}
              variant="multiline"
              control={createCourseHookForm.control}
              label="Mô tả khóa học"
            />
          </Stack>
        </CollapseStack>

        <Stack marginTop={2}>
          <Button type="submit" customVariant="form">
            TẠO KHÓA HỌC
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
