import { AIconvert } from '~/api/ai';
import { useCustomMutation } from './custom/useCustomMutation';

export const useAIConvert = () => {
  return useCustomMutation(['ai_convert'], AIconvert);
};
