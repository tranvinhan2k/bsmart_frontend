import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import ContractBar from '~/components/molecules/ContractBar';
import { SX_FOOTER_STACK } from '~/components/molecules/MainFooter/styles';
import SocialBar from '~/components/molecules/SocialBar';
import { FooterSocialDataList } from '~/constants/';
import { ActionPayload, ContractPayload } from '~/models';
import { AddressDataPayload } from '~/models/address';
import {
  SX_LARGE_TITLE,
  SX_MEDIUM_BOLD_TEXT,
  SX_SMALL_BOLD_TEXT,
  SX_SMALL_GREY_TEXT,
  SX_SMALL_TEXT,
} from '~/styles';

interface MainFooterProps {
  addresses: AddressDataPayload[];
  navigateList: ActionPayload[];
  contracts: ContractPayload[];
}

export default function MainFooter({
  addresses,
  navigateList,
  contracts,
}: MainFooterProps) {
  return (
    <Stack sx={SX_FOOTER_STACK}>
      <Stack paddingY={MetricSize.large_20}>
        {addresses.map((item) => (
          <Stack key={item.id}>
            <Typography sx={SX_MEDIUM_BOLD_TEXT}>{item.city}</Typography>
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {item.addresses.map((subAddress) => (
                <Stack
                  sx={{
                    width: {
                      xs: '100%',
                      md: '33%',
                      marginTop: MetricSize.small_10,
                    },
                  }}
                  key={subAddress.id}
                >
                  <Typography sx={SX_SMALL_BOLD_TEXT}>
                    {`Trụ sở ${subAddress.id + 1}: ${subAddress.address}`}
                  </Typography>
                  <Typography
                    sx={SX_SMALL_GREY_TEXT}
                  >{`Số điện thoại: ${subAddress.phone}`}</Typography>
                  <Typography
                    sx={SX_SMALL_GREY_TEXT}
                  >{`Địa chỉ: ${subAddress.address}`}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Divider color={Color.grey} />
      <Grid
        container
        sx={{ flex: 1, flexDirection: 'row', paddingY: MetricSize.medium_15 }}
      >
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={SX_LARGE_TITLE}>MISMART</Typography>
          <Box sx={{ paddingY: MetricSize.small_5 }}>
            <Typography sx={SX_SMALL_TEXT}>
              Chúng tôi cung cấp các khoá học chất lượng cao để cải thiện các kỹ
              năng lập trình của bạn. Tất cả các giảng viên của chúng tôi đều có
              nhiều kinh nghiệm trong thực tế và giảng dạy.
            </Typography>
          </Box>

          <Box sx={{ paddingTop: MetricSize.medium_15 }}>
            <Typography sx={SX_SMALL_BOLD_TEXT}>
              Theo dõi chúng tôi tại:
            </Typography>
            <SocialBar color="white" socials={FooterSocialDataList} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ paddingX: { xs: '0', md: MetricSize.medium_15 } }}
        >
          <Typography sx={SX_MEDIUM_BOLD_TEXT}>Menu</Typography>
          <Stack sx={{ paddingTop: MetricSize.medium_15 }}>
            {navigateList.map((item) => (
              <Tooltip key={item.name} title={item.name}>
                <NavLink
                  style={{
                    textDecoration: 'none',
                    fontFamily: FontFamily.regular,
                    fontSize: FontSize.small_16,
                    color: Color.white,
                  }}
                  to={item.link}
                >
                  <Typography>{item.name}</Typography>
                </NavLink>
              </Tooltip>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: { xs: 'flex-start', md: 'center' },
              flex: 1,
              height: '100%',
            }}
          >
            <Button
              style={{
                background: Color.tertiary,
                fontFamily: FontFamily.bold,
                fontSize: FontSize.small_16,
                color: Color.white,
              }}
            >
              Đăng kí khóa học
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography sx={SX_MEDIUM_BOLD_TEXT}>
            Liện hệ với chúng tôi
          </Typography>

          <Box sx={{ paddingTop: MetricSize.medium_15 }}>
            <ContractBar color="white" contracts={contracts} />
          </Box>
        </Grid>
      </Grid>
      <Divider color={Color.grey} />
      <Stack
        sx={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Color.grey,
          borderTopWidth: 1,
        }}
      >
        <Typography
          style={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Color.white,
            textAlign: 'center',
            paddingTop: MetricSize.large_20,
            paddingBottom: MetricSize.large_20,
          }}
        >
          © Bản quyền Mismart 2022 - Empowered by{' '}
          <a
            style={{ textDecoration: 'none', color: Color.blue }}
            href="https://google.com"
          >
            Mismart
          </a>
        </Typography>
      </Stack>
    </Stack>
  );
}
