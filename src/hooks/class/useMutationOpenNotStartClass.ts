import classApi from '~/api/class';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationOpenNotStartClass = () => {
  return useCustomMutation(['open_not_start_class'], classApi.openClass);
};
