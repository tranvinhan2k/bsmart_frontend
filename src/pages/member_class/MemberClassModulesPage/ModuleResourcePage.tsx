import { Box, Stack, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { image } from '~/constants/image';
import { ActivityResourcePayload } from '~/models/type';
import globalStyles from '~/styles';
import { convertToHigherByteUnit } from '~/utils/common';
import ModuleActivity from './ModuleActivity';

interface Props {
  name: string;
  item: ActivityResourcePayload;
}

export default function ModuleResourcePage({ name, item }: Props) {
  const handleOpenUrl = () => {
    window.open(item.file.url);
  };

  return (
    <Stack marginTop={1}>
      <ModuleActivity name={name} />
      <Stack marginTop={1} />
      <Typography textAlign="center" sx={globalStyles.textSmallLabel}>
        Tệp đính kèm
      </Typography>
      <Stack
        sx={{
          border: '1px solid #ddd',
          borderRadius: MetricSize.small_5,
          paddingY: 1,
        }}
      >
        <Stack
          sx={{
            paddingRight: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              component="img"
              src={image.file}
              sx={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
              }}
            />
            <Stack>
              <Typography sx={globalStyles.textLowSmallLight}>
                {item.file.name}
              </Typography>
              <Typography sx={globalStyles.textLowSmallLight}>
                {`${convertToHigherByteUnit(item.file.size)}`}
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={handleOpenUrl}
            startIcon={<Icon name="down" color="white" size="small_20" />}
            variant="contained"
            color="secondary"
            sx={{ color: Color.white, justifySelf: 'flex-end' }}
          >
            tải về
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
