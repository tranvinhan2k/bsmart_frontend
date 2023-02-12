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
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import ContractBar from '~/components/common/ContractBar';
import SocialBar from '~/components/common/SocialBar';
import { AddressData } from '~/constants';
import { NavigationActionData } from '~/constants/actions';
import { FooterContractDataList } from '~/constants/contract';
import { FooterSocialDataList } from '~/constants/socials';
import {
  SX_LARGE_TITLE,
  SX_MEDIUM_BOLD_TEXT,
  SX_SMALL_BOLD_TEXT,
  SX_SMALL_GREY_TEXT,
  SX_SMALL_TEXT,
} from '~/styles';

export default function Footer() {
  return (
    <Stack
      sx={{
        background: Colors.navy,
        flex: 1,
        paddingX: MetricSize.extraLarge,
        paddingTop: MetricSize.large,
      }}
    >
      <Stack paddingY={MetricSize.large}>
        {AddressData.map((item) => (
          <Stack key={item.id}>
            <Typography sx={SX_MEDIUM_BOLD_TEXT}>{item.city}</Typography>
            <Stack flexDirection="row" justifyContent="space-between">
              {item.addresses.map((subAddress) => (
                <Stack key={subAddress.id}>
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
      <Divider color={Colors.grey} />
      <Grid
        container
        sx={{ flex: 1, flexDirection: 'row', paddingY: MetricSize.medium }}
      >
        <Grid
          item
          xl={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={SX_LARGE_TITLE}>BSMART</Typography>
          <Box sx={{ paddingY: MetricSize.small }}>
            <Typography sx={SX_SMALL_TEXT}>
              Chúng tôi cung cấp các khoá học chất lượng cao để cải thiện các kỹ
              năng lập trình của bạn. Tất cả các giảng viên của chúng tôi đều có
              nhiều kinh nghiệm trong thực tế và giảng dạy.
            </Typography>
          </Box>

          <Box sx={{ paddingTop: MetricSize.medium }}>
            <Typography sx={SX_SMALL_BOLD_TEXT}>
              Theo dõi chúng tôi tại:
            </Typography>
            <SocialBar socials={FooterSocialDataList} />
          </Box>
        </Grid>
        <Grid xl={2} sx={{ paddingX: MetricSize.medium }}>
          <Typography sx={SX_MEDIUM_BOLD_TEXT}>Menu</Typography>
          <Stack sx={{ paddingTop: MetricSize.medium }}>
            {NavigationActionData.map((item) => (
              <Tooltip key={item.link} title={item.name}>
                <NavLink
                  style={{
                    textDecoration: 'none',
                    fontFamily: FontFamilies.regular,
                    fontSize: FontSize.small,
                    color: Colors.white,
                  }}
                  to={item.link}
                >
                  <Typography>{item.name}</Typography>
                </NavLink>
              </Tooltip>
            ))}
          </Stack>
        </Grid>
        <Grid xl={4}>
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: '100%',
            }}
          >
            <Button
              style={{
                background: Colors.orange,
                fontFamily: FontFamilies.bold,
                fontSize: FontSize.small,
                color: Colors.white,
              }}
            >
              Đăng kí khóa học
            </Button>
          </Stack>
        </Grid>
        <Grid xl={2}>
          <Typography sx={SX_MEDIUM_BOLD_TEXT}>
            Liện hệ với chúng tôi
          </Typography>

          <Box sx={{ paddingTop: MetricSize.medium }}>
            <ContractBar contracts={FooterContractDataList} />
          </Box>
        </Grid>
      </Grid>
      <Divider color={Colors.grey} />
      <Stack
        sx={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Colors.grey,
          borderTopWidth: 1,
        }}
      >
        <Typography
          style={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
            color: Colors.white,
            textAlign: 'center',
            paddingTop: MetricSize.large,
            paddingBottom: MetricSize.large,
          }}
        >
          © Bản quyền BSmart 2022 - Empowered by{' '}
          <a
            style={{ textDecoration: 'none', color: Colors.blue }}
            href="https://google.com"
          >
            BSmart
          </a>
        </Typography>
      </Stack>
    </Stack>
  );
}
