import categoriesApi from '~/api/categories';
import { useCustomQuery } from '../useCustomQuery';

export const useGetMentorCategories = () => {
  return useCustomQuery(
    ['get_mentor_category'],
    categoriesApi.getMentorCategories
  );
};
