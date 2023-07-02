import { Box, IconButton, Link, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { MentorNavigationActionData } from '~/constants';

interface AnnouncementItemProps {
  editMode: boolean;
  id: number;
  title: string;
  visible: boolean;
}

export default function AnnouncementItem({
  editMode,
  id,
  title,
  visible,
}: AnnouncementItemProps) {
  const navigate = useNavigate();
  const handleNavigateToUpdatePage = () => {
    navigate(
      `/mentor-profile/${
        MentorNavigationActionData[5].items?.[2].link.split('/')[0]
      }/${id}`
    );
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      key={id}
      sx={{
        border: '1px solid #dee2e6',
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: Color.white,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Icon name="chat" size="medium" />
        <Link
          href="/abc"
          underline="none"
          sx={{ fontFamily: FontFamily.regular }}
        >
          {title}
        </Link>
        {editMode && (
          <Box ml={1}>
            <IconButton onClick={handleNavigateToUpdatePage}>
              <Icon name="modeEdit" size="small" />
            </IconButton>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
