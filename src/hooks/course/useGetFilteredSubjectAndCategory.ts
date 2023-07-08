import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useQueryGetAllMentorSubjects } from '../useQueryGetAllMentorSubjects';
import { useDispatchGetAllCategories } from '../useDispatchGetAllCategories';

export const useGetFilteredSubjectAndCategory = (
  hookForm: UseFormReturn,
  name: string
) => {
  const [categoryId, setCategoriesId] = useState<number>();
  const categoryWatch = hookForm.watch(name);
  const { subjects } = useQueryGetAllMentorSubjects();
  const { optionCategories: categories } = useDispatchGetAllCategories();

  const filterSubjects = subjects?.filter((item) => {
    return item.categoryIds?.includes(categoryId || 0);
  });

  useEffect(() => {
    setCategoriesId(categoryWatch?.id);
  }, [categoryWatch]);

  return {
    filterSubjects,
    categories,
  };
};
