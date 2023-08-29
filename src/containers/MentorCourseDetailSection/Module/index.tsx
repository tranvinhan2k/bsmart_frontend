import { Stack, Typography, Tooltip, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MetricSize, Color, FontSize, FontFamily } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { ActivityPayload } from '~/models/type';
import ModuleHeader from './ModuleHeader';
import { CourseContext } from '~/HOCs/context/CourseContext';

interface Props {
  index: number;
  sectionId: number;
  module: ActivityPayload;
}

export default function Module({ index, sectionId, module }: Props) {
  const navigate = useNavigate();

  const { onChangeSection } = useContext(CourseContext);

  const handleViewOpen = () => {
    onChangeSection(sectionId);
    navigate(`${sectionId}/${module.id}`);
  };

  return (
    <Stack
      sx={{
        padding: 1,
        marginBottom: 1,
        borderRadius: MetricSize.small_5,
        background: module.isFixed ? `${Color.tertiary}11` : Color.white,
      }}
      key={module.id}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Box>
              <ModuleHeader type={module.type} index={index} />
            </Box>

            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.medium,
                marginLeft: 1,
              }}
            >
              {module.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
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
