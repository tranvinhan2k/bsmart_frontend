import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import { image } from '~/constants/image';
import { formatMoney } from '~/utils/money';

interface Props {
  value: number;
}

export default function CoinLabel({ value }: Props) {
  return (
    <Tooltip title="1 BS = 1,000 vnđ" arrow>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }} mt={1}>
        <Box
          component="img"
          src={image.coin}
          sx={{
            width: '20px',
            height: '20px',
          }}
        />
        <Typography
          sx={{
            marginLeft: 1,
            fontFamily: FontFamily.bold,
            fontSize: FontSize.small_16,
            color: Color.gold,
          }}
        >{`${formatMoney(value, true)} BS`}</Typography>
      </Stack>
    </Tooltip>
  );
}
