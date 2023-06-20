import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { MetricSize, Color } from '~/assets/variables';
import Checkbox from '~/components/atoms/Checkbox';
import CustomModal from '~/components/atoms/CustomModal';
import Icon from '~/components/atoms/Icon';
import { image } from '~/constants/image';
import globalStyles from '~/styles';

export default function PublicCourseItem({
  item,
  isSelected,
  onSelectedItem,
}: {
  item: any;
  isSelected: boolean;
  onSelectedItem: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      <Stack
        sx={{
          maxWidth: { xs: 'none', md: '300px' },
          background: Color.white,
          boxShadow: 3,
          borderRadius: MetricSize.medium_15,
          padding: MetricSize.small_10,
          height: undefined,
          aspectRatio: 2 / 3,
          position: 'relative',
          transition: 'border 200ms',
          border: `5px solid ${isSelected ? Color.orange : Color.transparent}`,
        }}
      >
        <Checkbox isChecked={isSelected} onCheck={onSelectedItem} />
        <Stack>
          <Stack
            sx={{
              height: '80%',
            }}
          >
            <Box
              component="img"
              alt="public course"
              src={item.image || image.noCourse}
              sx={{
                width: '100%',

                objectFit: 'fill',
              }}
            />
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              whiteSpace: 'no-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            marginTop={2}
          >
            <Typography sx={globalStyles.textSubTitle}>{item.name}</Typography>
          </Stack>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              bottom: MetricSize.small_10,
              right: MetricSize.small_10,
            }}
          >
            <Icon name="search" color="black" size="small_20" />
          </IconButton>
        </Stack>
      </Stack>
      <CustomModal open={open} onClose={handleClose}>
        {JSON.stringify(item)}
      </CustomModal>
    </Stack>
  );
}
