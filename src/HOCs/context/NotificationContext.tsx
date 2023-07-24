import { Avatar, Divider, Stack, Typography } from '@mui/material';
import { ReactNode, createContext, useMemo, useState } from 'react';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
import CustomMenu from '~/components/atoms/CustomMenu';
import CustomModal from '~/components/atoms/CustomModal';
import { image } from '~/constants/image';
import { useMenuItem } from '~/hooks';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';

interface Props {
  children: ReactNode;
}

interface NotificationContextProps {
  numberOfNotification: number;
  openNotification: boolean;
  onOpenNotification: () => void;
  ref: any;
}

export const NotificationContext = createContext<NotificationContextProps>({
  numberOfNotification: 0,
  openNotification: false,
  onOpenNotification: () => {},
  ref: null,
});

export default function NotificationContextProvider({ children }: Props) {
  const numberOfNotification = 10;

  const { anchorRef, handleClose, handleToggle, open } = useMenuItem();

  const value: NotificationContextProps = useMemo(
    () => ({
      numberOfNotification,
      openNotification: open,
      onOpenNotification: handleToggle,
      ref: anchorRef,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <CustomMenu
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        onToggleOpen={handleToggle}
      >
        <Stack
          sx={{
            padding: 3,
          }}
        >
          <Typography sx={globalStyles.textSmallLabel}>Thông báo</Typography>
          <Divider />
          <Stack marginTop={1}>
            <Stack
              sx={{
                maxWidth: { xs: '100%', md: '400px' },
                overflow: 'hidden',
                border: '1px solid #ddd',
                borderRadius: MetricSize.small_5,
                padding: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar alt="avatar" src={image.student} />
              <Stack
                sx={{
                  marginLeft: 2,
                }}
              >
                <Typography
                  sx={{
                    height: '46px',
                    overflow: 'hidden',
                    ...globalStyles.textTwoLineEllipsis,
                    fontFamily: FontFamily.regular,
                    fontSize: FontSize.small_16,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  perspiciatis deserunt laudantium a perferendis enim officiis
                  aliquam repellendus cum blanditiis. Eum quasi, iure sed quis
                  provident autem? Quos, consequuntur praesentium.
                </Typography>
                <Typography noWrap sx={globalStyles.textLowSmallLight}>
                  {formatISODateDateToDisplayDateTime(new Date().toISOString())}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CustomMenu>
    </NotificationContext.Provider>
  );
}
