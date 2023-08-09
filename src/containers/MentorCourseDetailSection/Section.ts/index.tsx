import { Stack, Typography, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CourseContext } from '~/HOCs/context/CourseContext';
import { FontFamily, FontSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { ActivityPayload } from '~/models/type';

interface Props {
  open: boolean;
  index: number;
  section: ActivityPayload;
  onOpenContentSection: () => void;
}

export default function Section({
  open,
  index,
  section,
  onOpenContentSection,
}: Props) {
  const navigate = useNavigate();

  const { onChangeSection } = useContext(CourseContext);

  const handleViewOpen = () => {
    onChangeSection(section.id);
    navigate(`${section.id}`);
  };

  return (
    <Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Tooltip title="Xem nội dung học phần">
          <IconButton
            sx={{
              transition: 'all 500ms ease',
              transform: open ? 'rotate(90deg)' : 'none',
            }}
            onClick={onOpenContentSection}
          >
            <Icon name="right" color="black" size="small_20" />
          </IconButton>
        </Tooltip>
        <Typography>
          <span
            style={{
              fontFamily: FontFamily.bold,
              fontSize: FontSize.small_16,
            }}
          >{`Học phần ${index + 1}: `}</span>
          {section.name}
        </Typography>

        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Tooltip title="Xem chi tiết">
            <IconButton
              sx={{
                boxShadow: 1,
                background: '#fff',
              }}
              onClick={handleViewOpen}
            >
              <Icon name="search" color="black" size="small_20" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
}
