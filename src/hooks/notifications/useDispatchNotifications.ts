import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import notificationApi from '~/api/notification';
import { updateNotification } from '~/redux/globalData/slice';
import { globalNotifications } from '~/redux/globalData/selector';
import { useTryCatch } from '../useTryCatch';
// eslint-disable-next-line import/no-cycle
import { WebSocketMessagePayload } from '../useSocket';
import { updateWebsocketMessage } from '~/redux/user/slice';

export const useDispatchNotifications = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const data = useSelector(globalNotifications);

  const handleAddMessage = (messageObject: WebSocketMessagePayload) => {
    dispatch(updateWebsocketMessage(messageObject));
  };

  const handleDispatch = useCallback(async () => {
    const response = await handleTryCatch(async () =>
      notificationApi.getNotifications({
        params: {
          page: 0,
        },
      })
    );
    dispatch(updateNotification(response?.items));
  }, [dispatch, handleTryCatch]);

  return {
    data,
    isLoading,
    handleDispatch,
    handleAddMessage,
    error,
  };
};
