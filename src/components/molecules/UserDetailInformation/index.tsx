import { Stack, Typography, Box } from '@mui/material';
import { MetricSize, FontFamily, FontSize, Color } from '~/assets/variables';
import { IconName } from '~/components/atoms/Icon';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
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

      <Stack sx={{ flexDirection: 'row', padding: 3 }}>
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
            { label: 'Tên', value: name, icon: 'user' },
            { label: 'Email', value: email, icon: 'mail' },
            { label: 'Số điện thoại', value: phone, icon: 'phone' },
          ].map((item, index) => (
            <Stack marginTop={1} key={index}>
              <TextPropLine
                icon={item.icon as IconName}
                label={item.label}
                value={item.value}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
