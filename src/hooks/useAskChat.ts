import { callChat } from '~/api/chat';
import { useCustomMutation } from './custom/useCustomMutation';

export const useAskChat = () => {
  return useCustomMutation(['ask_chat'], callChat);
};
