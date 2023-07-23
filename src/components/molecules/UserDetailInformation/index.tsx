import { Stack, Typography, Box } from '@mui/material';
import { MetricSize, FontFamily, FontSize, Color } from '~/assets/variables';
import globalStyles from '~/styles';

interface Props {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  imageAlt: string;
}

export default function UserDetailInformation({
  email,
  imageAlt,
  imageUrl,
  name,
  phone,
}: Props) {
  return (
    <Stack marginTop={2}>
      <Typography sx={globalStyles.textSmallLabel}>
        Thông tin người dùng
      </Typography>

      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Stack>
          <Box
            component="img"
            sx={{
              width: '100px',
              aspectRatio: 3 / 4,
              borderRadius: MetricSize.small_5,
            }}
            src={imageUrl}
            alt={imageAlt}
          />
        </Stack>
        <Stack
          sx={{
            marginLeft: 1,
          }}
        >
          {[
            { label: 'Tên học sinh', value: name },
            { label: 'Email', value: email },
            { label: 'Số điện thoại', value: phone },
          ].map((item, index) => (
            <Stack marginTop={1} key={index}>
              <Typography
                sx={{
                  fontFamily: FontFamily.bold,
                  fontSize: FontSize.small_14,
                  color: Color.black,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: FontFamily.regular,
                  fontSize: FontSize.small_16,
                  color: Color.black,
                }}
              >
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Typography sx={globalStyles.textSmallLabel}>
        Thông tin điểm số
      </Typography>

      <Typography sx={globalStyles.textSmallLabel}>
        Thông tin điểm danh
      </Typography>
    </Stack>
  );
}
