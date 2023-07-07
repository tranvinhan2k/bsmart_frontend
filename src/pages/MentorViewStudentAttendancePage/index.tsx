/* eslint-disable no-nested-ternary */
import { Stack, Grid, Box, Typography, Chip } from '@mui/material';
import { useEffect } from 'react';
import { Color, IconSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { image } from '~/constants/image';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';
import { formatDate } from '~/utils/date';

export default function MentorViewStudentAttendancePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Stack>
      <Grid container>
        <Grid item md={6}>
          <Stack
            sx={{
              height: '200px',
              flexDirection: 'row',
              padding: MetricSize.medium_15,
              borderRadius: MetricSize.small_10,
              boxShadow: 3,
              background:
                'linear-gradient(90deg, rgba(241,255,143,1) 30%, rgba(255,90,8,1) 92%)',
            }}
          >
            <Box
              component="img"
              sx={{
                height: '200px',
                width: undefined,
                aspectRatio: 1,
                objectFit: 'fill',
                borderRadius: MetricSize.medium_15,
              }}
              src={image.noAvatar}
            />
            <Stack
              sx={{
                marginLeft: 1,
              }}
            >
              <Typography sx={globalStyles.textTitle}>Trần Vĩ Nhân</Typography>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="mail" color="black" size="small_20" />
                <Typography>tranvinhan2k@gmail.com</Typography>
              </Stack>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="phone" color="black" size="small_20" />
                <Typography>+84362017555</Typography>
              </Stack>

              <Stack sx={{ alignItems: 'center', flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <Stack
                      sx={{
                        background: '#555',
                        borderRadius: 1000,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: MetricSize.small_5,
                        height: IconSize.medium,
                        width: IconSize.medium,
                      }}
                      key={item}
                    >
                      {item < 4 && (
                        <Icon
                          name="checkCircleFill"
                          color="green"
                          size="medium"
                        />
                      )}
                      {item === 4 && (
                        <Icon name="xCircleFill" color="red" size="medium" />
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={3}>
          <Stack
            sx={{
              height: '200px',
              marginLeft: 2,
              background: '#eee',
              padding: MetricSize.medium_15,
              borderRadius: MetricSize.small_10,
              boxShadow: 3,
              alignItems: 'center',
            }}
          >
            <Typography sx={globalStyles.textSubTitle}>Tên lớp học</Typography>
            <Stack
              sx={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography sx={globalStyles.textTitle}>LTV_12</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={3}>
          <Stack
            sx={{
              height: '200px',
              marginLeft: 2,
              background: '#eee',
              padding: MetricSize.medium_15,
              borderRadius: MetricSize.small_10,
              boxShadow: 3,
              alignItems: 'center',
            }}
          >
            <Typography sx={globalStyles.textSubTitle}>
              Số khóa học hiện tại
            </Typography>
            <Stack
              sx={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography sx={globalStyles.textTitle}>27/30</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Grid container marginTop={2}>
        <Grid item md={1}>
          <Stack sx={{ padding: 1, background: Color.border }}>
            <Typography>ID</Typography>
          </Stack>
        </Grid>
        <Grid item md={9}>
          <Stack sx={{ padding: 1, background: Color.border, marginLeft: 1 }}>
            <Typography>Ngày</Typography>
          </Stack>
        </Grid>
        <Grid item md={2}>
          <Stack sx={{ padding: 1, background: Color.border, marginLeft: 1 }}>
            <Typography>Trạng Thái</Typography>
          </Stack>
        </Grid>
      </Grid>
      {[1, 2, 3, 4, 5].map((item) => (
        <Grid
          container
          sx={{
            marginTop: 1,
            paddingX: MetricSize.small_5,
            paddingY: MetricSize.large_20,
            background: '#eee',
            borderRadius: MetricSize.small_5,
          }}
          key={item}
        >
          <Grid md={1}>{item}</Grid>
          <Grid md={9} sx={{ paddingLeft: 2 }}>
            {formatDate(new Date().toISOString())}
          </Grid>
          <Grid md={2} sx={{ paddingLeft: 2 }}>
            {item === 1 ? (
              <Chip label="Đã điểm danh" color="success" />
            ) : item === 2 ? (
              <Chip label="Vắng mặt" color="error" />
            ) : (
              <Chip label="Chưa điểm danh" />
            )}
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}
