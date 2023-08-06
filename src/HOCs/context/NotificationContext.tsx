import { Avatar, Divider, Stack, Typography } from '@mui/material';
import { ReactNode, createContext, useMemo, useState } from 'react';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
import CustomMenu from '~/components/atoms/CustomMenu';
import { image } from '~/constants/image';
import { useGetNotifications, useMenuItem } from '~/hooks';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import NotificationItem, { NotificationItemPayload } from './NotificationItem';
import LoadingWrapper from '../loading/LoadingWrapper';
import { useReadNotifications } from '~/hooks/useReadNotifications';

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

  const { mutateAsync: handleReadNotification } = useReadNotifications();
  const { data: notifications, error, isLoading } = useGetNotifications();
  const numberOfNotification = notifications?.length || 0;

  const onOpenNotification = () => {
    handleToggle();
  };

  const onCloseNotification = async (e: any) => {
    handleClose(e);
    await handleReadNotification(notifications.map((item) => item.id));
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
          <LoadingWrapper
            error={error}
            isLoading={isLoading}
            isEmptyCourse={notifications?.length === 0}
          >
            <Stack
              marginTop={1}
              sx={{
                width: { xs: '100%', md: '400px' },
              }}
            >
              {notifications?.map((item, index) => (
                <NotificationItem
                  key={index}
                  entity={item.entity}
                  id={item.id}
                  title={item.title}
                  message={item.message}
                  time={item.time}
                  isRead={item.isRead}
                />
              ))}
            </Stack>
          </LoadingWrapper>
        </Stack>
      </CustomMenu>
    </NotificationContext.Provider>
  );
}
