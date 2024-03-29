import { Divider, Stack, Typography } from '@mui/material';
import { ReactNode, createContext, useMemo } from 'react';
import CustomMenu from '~/components/atoms/CustomMenu';
import { useMenuItem, useReadNotifications } from '~/hooks';
import globalStyles from '~/styles';
import NotificationItem, { NotificationItemPayload } from './NotificationItem';
import LoadingWrapper from '../loading/LoadingWrapper';
import { useDispatchNotifications } from '~/hooks/notifications/useDispatchNotifications';
import CustomPagination from '~/components/atoms/CustomPagination';

interface Props {
  children: ReactNode;
}

interface NotificationContextProps {
  numberOfNotification: number;
  openNotification: boolean;
  onOpenNotification: () => void;
  ref: any;
  notifications: NotificationItemPayload[];
}

export const NotificationContext = createContext<NotificationContextProps>({
  numberOfNotification: 0,
  openNotification: false,
  onOpenNotification: () => {},
  ref: null,
  notifications: [],
});

export default function NotificationContextProvider({ children }: Props) {
  const { anchorRef, handleClose, handleToggle, open } = useMenuItem();

  const {
    data: notifications,
    error,
    isLoading,
    handleDispatch,
    currentPage,
    totalPage,
    handleChangePage,
  } = useDispatchNotifications();
  const { mutateAsync: handleReadNotifications } = useReadNotifications();
  const numberOfNotification =
    notifications?.filter((item) => !item.isRead)?.length || 0;

  const onOpenNotification = async () => {
    handleToggle();

    const notificationsIds = notifications.map((item) => item.id);

    await handleReadNotifications(notificationsIds);

    await handleDispatch();
  };

  const onCloseNotification = async (e: any) => {
    handleClose(e);
  };

  const value: NotificationContextProps = useMemo(
    () => ({
      numberOfNotification,
      openNotification: open,
      onOpenNotification,
      ref: anchorRef,
      notifications: notifications || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, notifications]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <CustomMenu
        open={open}
        anchorEl={anchorRef.current}
        onClose={onCloseNotification}
        onToggleOpen={handleToggle}
      >
        <Stack
          sx={{
            padding: 3,
          }}
        >
          <Typography sx={globalStyles.textSmallLabel}>Thông báo</Typography>
          <Divider />

          <Stack
            marginTop={1}
            sx={{
              width: { xs: '100%', md: '400px' },
              height: '500px',
            }}
          >
            <LoadingWrapper
              error={error}
              isLoading={isLoading}
              isEmptyCourse={notifications?.length === 0}
            >
              <Stack>
                {notifications?.map((item, index) => (
                  <NotificationItem
                    key={index}
                    entity={item.entity}
                    id={item.id}
                    title={item.title}
                    message={item.message}
                    time={item.time}
                    isRead={item.isRead}
                    entityId={item.entityId}
                  />
                ))}
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPage}
                  onChange={(e, v) => handleChangePage(v)}
                />
              </Stack>
            </LoadingWrapper>
          </Stack>
        </Stack>
      </CustomMenu>
    </NotificationContext.Provider>
  );
}
