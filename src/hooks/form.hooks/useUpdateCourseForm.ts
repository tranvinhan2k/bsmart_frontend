import { useForm } from 'react-hook-form';
import { MentorDetailCoursePayload } from '~/pages/MentorCourseDetailPage';
import { validationSchemaCreateCourse } from '~/form/validation';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { OptionPayload, PutCourseRequest } from '~/models';
import { useGetFilteredSubjectAndCategory } from '../course/useGetFilteredSubjectAndCategory';
import { mockLevelData } from '~/constants';

export const useUpdateCourseForm = (
  course: MentorDetailCoursePayload | undefined,
  onChangeCourse: (data: PutCourseRequest) => void
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
    level: string;
  }) {
    const params: PutCourseRequest = {
      name: data?.name || '',
      subjectId: data?.subjectId.id,
      categoryId: data?.categoryId.id,
      description: data?.description || '',
      level: data?.level,
    };

    console.log(params);

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
