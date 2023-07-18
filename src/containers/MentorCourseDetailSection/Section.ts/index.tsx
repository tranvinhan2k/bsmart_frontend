import { Stack, Typography, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FontFamily, FontSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { ActivityPayload } from '~/models/type';

interface Props {
  index: number;
  section: ActivityPayload;
}

export default function Section({ index, section }: Props) {
  const navigate = useNavigate();

  const handleViewOpen = () => {
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
          <Tooltip title="Xem thông tin học phần">
            <IconButton onClick={handleViewOpen}>
              <Icon name="right" color="black" size="small_20" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
}
