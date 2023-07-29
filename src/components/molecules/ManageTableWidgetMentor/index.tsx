import { Box, Grid, Stack, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';

export default function ManageTableWidgetMentor() {
  interface TitleProps {
    id: number;
    title: string;
    iconName: IconName;
    background: string;
    value: string | number;
    desc1: string | number;
    subDesc: string | number;
    desc2: string | number;
  }

  const title: TitleProps[] = [
    {
      id: 0,
      title: 'Tổng giáo viên',
      iconName: 'groups',
      background: 'linear-gradient(to right,#5b73e8,#44c4fa)',
      value: 12,
      desc1: 'Tăng',
      subDesc: '18%',
      desc2: 'so với tháng trước',
    },
    {
      id: 0,
      title: 'Tổng khóa học được tạo',
      iconName: 'coPresent',
      background: 'linear-gradient(to right,#1d976c,#2fd38a)',
      value: 192,
      desc1: 'Tăng',
      subDesc: '58%',
      desc2: 'so với tháng trước',
    },
    {
      id: 0,
      title: 'Thông tin thêm 1',
      iconName: 'person',
      background: 'linear-gradient(45deg,#ffb64d,#ffcb80)',
      value: '??',
      desc1: 'Giảm',
      subDesc: '18%',
      desc2: 'so với tháng trước',
    },
    {
      id: 0,
      title: 'Thông tin thêm 2',
      iconName: 'person',
      background: 'linear-gradient(45deg,#ff5370,#ff869a)',
      value: '??',
      desc1: 'Giảm',
      subDesc: '18%',
      desc2: 'so với tháng trước',
    },
  ];

  return (
    <Grid container spacing={2} mt={2}>
      {title.map((item) => (
        <Grid item xs={12} md={6} lg={3} key={item.id}>
          <Box
            sx={{
              borderRadius: '5px',
              color: '#fff',
              boxShadow: '0 1px 2.94px 0.06px #041a3729',
              border: 'none',
              // margin: '8px 0 25px',
              transition: 'all .3s ease-in-out',
              background: item.background,
              padding: '25px',
            }}
          >
            <Typography sx={{ fontFamily: FontFamily.medium }}>
              {item.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              mt={1}
            >
              <Icon name={item.iconName} size="large" />
              <Typography sx={{ fontFamily: FontFamily.medium, fontSize: 29 }}>
                {item.value}
              </Typography>
            </Stack>
            <Typography sx={{ fontFamily: FontFamily.medium, fontSize: 13 }}>
              {item.desc1} <u>{item.subDesc}</u> {item.desc2}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
