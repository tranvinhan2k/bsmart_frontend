import { useForm } from 'react-hook-form';
import { DetailCoursePayload } from '~/pages/MentorCourseDetailPage';
import { validationSchemaCreateCourse } from '~/form/validation';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { OptionPayload, PutCoursePayload } from '~/models';
import { useGetFilteredSubjectAndCategory } from '../course/useGetFilteredSubjectAndCategory';
import { mockLevelData } from '~/constants';

export const useUpdateCourseForm = (
  course: DetailCoursePayload,
  onChangeCourse: (data: PutCoursePayload) => void
) => {
  const resolverUpdateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const hookForm = useForm({
    defaultValues: course,
    resolver: resolverUpdateCourse,
  });
  const { categories, filterSubjects } = useGetFilteredSubjectAndCategory(
    hookForm,
    'categoryId'
  );

  async function handleSubmit(data: {
    name: string;
    subjectId: OptionPayload;
    categoryId: OptionPayload;
    description: string;
    level: OptionPayload;
  }) {
    const params: PutCoursePayload = {
      name: data?.name || '',
      subjectId: data?.subjectId.id,
      categoryId: data?.categoryId.id,
      description: data?.description || '',
      level: data?.level.value,
    };
    await onChangeCourse(params);
  }

  return {
    hookForm,
    categories,
    filterSubjects,
    handleSubmit,
    levels: mockLevelData,
  };
};
