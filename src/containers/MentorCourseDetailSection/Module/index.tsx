import { Stack, Typography, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MetricSize, Color } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { ActivityPayload } from '~/models/type';
import ModuleHeader from './ModuleHeader';

interface Props {
  index: number;
  sectionId: number;
  module: ActivityPayload;
}

export default function Module({ index, sectionId, module }: Props) {
  const navigate = useNavigate();

  const handleViewOpen = () => {
    navigate(`${sectionId}/${module.id}`);
  };

  return (
    <Stack
      sx={{
        marginBottom: 1,
        borderRadius: MetricSize.small_5,
        paddingY: 1,
        paddingX: 2,
        background: Color.white,
      }}
      key={module.id}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Typography>
            <ModuleHeader type={module.type} index={index} />
            {module.name}
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="Xem chi tiết">
            <IconButton onClick={handleViewOpen}>
              <Icon name="search" color="black" size="small_20" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
}
