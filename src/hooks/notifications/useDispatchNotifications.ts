import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import notificationApi from '~/api/notification';
import { updateNotification } from '~/redux/globalData/slice';
import { globalNotifications } from '~/redux/globalData/selector';
import { useTryCatch } from '../useTryCatch';
// eslint-disable-next-line import/no-cycle
import { WebSocketMessagePayload } from '../useSocket';
import { updateWebsocketMessage } from '~/redux/user/slice';
import { PagingFilterRequest } from '~/models';

export const useDispatchNotifications = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const { data, currentPage, totalPage } = useSelector(globalNotifications);

  const handleAddMessage = (messageObject: WebSocketMessagePayload) => {
    dispatch(updateWebsocketMessage(messageObject));
  };

  const handleDispatch = useCallback(async () => {
    const response = await handleTryCatch(async () =>
      notificationApi.getNotifications({
        params: {
          page: 0,
          size: 4,
        },
      })
    );
    dispatch(
      updateNotification({
        data: response?.items,
        currentPage: response?.currentPage,
        totalPage: response?.totalPages,
      })
    );
  }, [dispatch, handleTryCatch]);

  const handleChangePage = async (paramPage: number) => {
    const response = await handleTryCatch(async () =>
      notificationApi.getNotifications({
        params: {
          page: paramPage - 1,
          size: 4,
        },
      })
    );
    dispatch(
      updateNotification({
        data: response?.items,
        currentPage: response?.currentPage,
        totalPage: response?.totalPages,
      })
    );
  };

  return {
    data,
    currentPage,
    totalPage,
    isLoading,
    handleDispatch,
    handleAddMessage,
    handleChangePage,
    error,
  };
};
