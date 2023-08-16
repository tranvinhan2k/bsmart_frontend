import questionApi from '~/api/question';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useReadFile = () => {
  return useCustomMutation(['read_file'], questionApi.readExcelFile);
};
