import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { validationSchemaCreateCourse } from '~/form/validation';
import { defaultValueCreateCourse } from '~/form/defaultValues';
import { CREATE_COURSE_FIELDS } from '~/form/schema';
import { OptionPayload } from '~/models';
import { useDispatchGetAllCategories } from '../useDispatchGetAllCategories';
import { useQueryGetAllMentorSubjects } from '../useQueryGetAllMentorSubjects';
import { useQueryGetAllPublicCourses } from '../useQueryGetAllPublicCourses';
import { PostCoursePayload } from '~/models/request';

export const useCreateCourseForm = (
  onChangeCourse: (param: PostCoursePayload) => void
) => {
  const [categoryId, setCategoriesId] = useState<number>();

  const { publicCourses } = useQueryGetAllPublicCourses();

  const resolverCreateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const createCourseHookForm = useForm({
    defaultValues: defaultValueCreateCourse,
    resolver: resolverCreateCourse,
  });
  const categoryWatch = createCourseHookForm.watch(
    CREATE_COURSE_FIELDS.categoryId
  );

  const { subjects } = useQueryGetAllMentorSubjects();
  const { optionCategories: categories } = useDispatchGetAllCategories();

  useEffect(() => {
    setCategoriesId(categoryWatch?.id);
  }, [categoryWatch]);

  const filterSubjects = subjects?.filter((item) => {
    return item.categoryIds?.includes(categoryId || 0);
  });

  async function handleCreateCourse(data: {
    name: string;
    subjectId: OptionPayload;
    categoryId: OptionPayload;
    description: string;
  }) {
    const params: PostCoursePayload = {
      code: '0',
      name: data?.name || '',
      subjectId: data?.subjectId.id,
      categoryId: data?.categoryId.id,
      description: data?.description || '',
    };
    await onChangeCourse(params);
  }

  return {
    publicCourses,
    categories,
    filterSubjects,
    createCourseHookForm,
    handleCreateCourse,
  };
};
