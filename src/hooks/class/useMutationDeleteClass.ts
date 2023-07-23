import classApi from '~/api/class';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationDeleteClass = () => {
  return useCustomMutation(['delete_class'], classApi.deleteCourseClass);
};
