import { Breadcrumbs, Stack, Typography } from '@mui/material';
import breadcrumbBackground from '~/assets/images/banner.jpg';
import breadcrumbBackground2 from '~/assets/images/banner-2.jpg';
import { Colors } from '~/assets/variables';
import { ActionPayload } from '~/models';
import {
  SX_BREADCRUMB_TITLE,
  SX_CONTENT_TITLE,
  SX_HOMEPAGE_STACK,
  SX_MAIN_TITLE,
  SX_NAVIGATION_CONTAINER,
  SX_NAVIGATION_COVER_STACK,
  SX_NAVIGATION_STACK,
  SX_NAVIGATION_TITLE,
  SX_SUB_HOMEPAGE_STACK,
  SX_SUB_TITLE,
} from './styles';
import Button from '~/components/atoms/Button';

interface BreadcrumbNavigationProps {
  isHomePage: boolean;
  breadcrumbs: ActionPayload[];
  onViewCourse: () => void;
}

export default function BreadcrumbNavigation({
  isHomePage,
  breadcrumbs,
  onViewCourse,
}: BreadcrumbNavigationProps) {
  if (breadcrumbs.length === 1) {
    return null;
  }

  return (
    <Stack
      sx={{
        ...SX_NAVIGATION_CONTAINER,
        backgroundImage: `url(${
          isHomePage ? breadcrumbBackground : breadcrumbBackground2
        })`,
      }}
    >
      <Stack
        sx={{
          ...SX_NAVIGATION_COVER_STACK,
          height: isHomePage ? '750px' : '420px',
        }}
      >
        {isHomePage ? (
          <Stack sx={SX_HOMEPAGE_STACK}>
            <Typography textAlign="center" sx={SX_MAIN_TITLE}>
              KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
            </Typography>
            <Typography textAlign="center" sx={SX_SUB_TITLE}>
              Trở thành lập trình viên chuyên nghiệp tại BSmart
            </Typography>
            <Stack sx={SX_SUB_HOMEPAGE_STACK}>
              <Typography textAlign="center" sx={SX_CONTENT_TITLE}>
                Chúng tôi cung cấp các khoá học chất lượng cao để cải thiện các
                kỹ năng lập trình của bạn. Tất cả các giảng viên của chúng tôi
                đều có nhiều kinh nghiệm trong thực tế và giảng dạy.
              </Typography>
            </Stack>
            <Stack paddingTop={2} sx={{ flexDirection: 'row' }}>
              <Button customVariant="normal" onClick={onViewCourse}>
                XEM KHÓA HỌC
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack sx={SX_NAVIGATION_STACK}>
            <Typography sx={SX_NAVIGATION_TITLE}>
              {breadcrumbs[1].name}
            </Typography>
            <Stack paddingTop={1}>
              <Breadcrumbs
                sx={{ color: Colors.white }}
                separator=">"
                aria-label="breadcrumb"
              >
                {breadcrumbs.map((item) => (
                  <Typography key={item.link} sx={SX_BREADCRUMB_TITLE}>
                    {item.name}
                  </Typography>
                ))}
              </Breadcrumbs>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
