import classApi from '~/api/class';
import { useCustomMutation } from './custom/useCustomMutation';

export const useGetDuplicateTimeSlot = () => {
  return useCustomMutation(
    ['get_duplicate_classes'],
    classApi.getDuplicateClasses
  );
};
