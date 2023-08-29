import classApi from '~/api/class';
import coursesApi from '~/api/courses';
import { useCustomMutation } from './custom/useCustomMutation';

export const useUpdateLink = () => {
  return useCustomMutation(['change_url'], classApi.changeUrl);
};
