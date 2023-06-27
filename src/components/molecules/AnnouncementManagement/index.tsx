import { Box, Button as MuiButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily } from '~/assets/variables';
import { MentorNavigationActionData } from '~/constants';
import { useSearchAnnouncements } from '~/hooks/useManageAnnouncement/search';
import AnnouncementItem from './AnnouncementItem';
import AnnouncementListFetchStatus from './AnnouncementListFetchStatus';
import { SX_FORM_LABEL_EMPTY_LIST } from './style';

interface AnnouncementManagementProps {
  editMode: boolean;
}

export default function AnnouncementManagement({
  editMode,
}: AnnouncementManagementProps) {
  const idClassSection = 4;
  const page = 0;
  const size = 5;
  const sort = [''];

  const { announcements, isLoading, isError } = useSearchAnnouncements({
    idClassSection,
    page,
    size,
    sort,
  });

  const navigate = useNavigate();
  const handleCreateAnnouncement = () =>
    navigate(
      `/mentor-profile/${
        MentorNavigationActionData[5].items?.[1].link.split('/')[0]
      }/${idClassSection}`
    );

  return announcements ? (
    <>
      <AnnouncementListFetchStatus isLoading={isLoading} isError={isError} />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        mt={2}
      >
        {announcements.items.map((item) => (
          <AnnouncementItem
            editMode={editMode}
            key={item.id}
            id={item.id}
            title={item.title}
            visible={item.visible}
          />
        ))}
        {Boolean(!announcements.items.length) && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            my={5}
            py={5}
            sx={{
              border: '1px solid #dee2e6',
              borderRadius: 1,
              boxShadow: 1,
              backgroundColor: Color.white,
            }}
          >
            <Typography sx={SX_FORM_LABEL_EMPTY_LIST}>
              Chưa có dữ liệu
            </Typography>
            <MuiButton
              variant="contained"
              color="miSmartOrange"
              sx={{
                textTransform: 'none',
                fontFamily: FontFamily.medium,
              }}
              onClick={handleCreateAnnouncement}
            >
              Tạo thông báo mới
            </MuiButton>
          </Stack>
        )}
        {Boolean(announcements.items.length) && editMode && (
          <Box mt={2}>
            <MuiButton
              variant="contained"
              color="success"
              onClick={handleCreateAnnouncement}
            >
              Tạo mới
            </MuiButton>
          </Box>
        )}
      </Stack>
    </>
  ) : null;
}
