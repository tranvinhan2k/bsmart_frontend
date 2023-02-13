import { Breadcrumbs, Button, Stack, Typography } from '@mui/material';
import breadcrumbBackground from '~/assets/images/banner.jpg';
import breadcrumbBackground2 from '~/assets/images/banner-2.jpg';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import { ActionPayload } from '~/models';

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
        flex: 1,
        backgroundImage: `url(${
          isHomePage ? breadcrumbBackground : breadcrumbBackground2
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          background: Colors.blueTransparent,
          position: 'position',
          content: '""',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          height: isHomePage ? '750px' : '420px',
        }}
      >
        {isHomePage ? (
          <Stack
            sx={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingX: '160px',
            }}
          >
            <Typography
              textAlign="center"
              sx={{
                color: Colors.orange,
                fontSize: FontSize.medium,
                fontFamily: FontFamilies.bold,
              }}
            >
              KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
            </Typography>
            <Typography
              textAlign="center"
              sx={{
                color: Colors.white,
                fontSize: FontSize.extraLarge,
                fontFamily: FontFamilies.bold,
              }}
            >
              Trở thành lập trình viên chuyên nghiệp tại BSmart
            </Typography>
            <Stack
              sx={{
                paddingX: '160px',
              }}
            >
              <Typography
                textAlign="center"
                sx={{
                  color: Colors.white,
                  fontSize: FontSize.small,
                  fontFamily: FontFamilies.regular,
                }}
              >
                Chúng tôi cung cấp các khoá học chất lượng cao để cải thiện các
                kỹ năng lập trình của bạn. Tất cả các giảng viên của chúng tôi
                đều có nhiều kinh nghiệm trong thực tế và giảng dạy.
              </Typography>
            </Stack>
            <Stack paddingTop={2} sx={{ flexDirection: 'row' }}>
              <Button
                onClick={onViewCourse}
                sx={{
                  background: Colors.orange,
                  padding: MetricSize.medium,
                  fontFamily: FontFamilies.bold,
                  fontSize: FontSize.small,
                  '&:hover': {
                    background: Colors.white,
                    color: Colors.orange,
                  },
                }}
              >
                XEM KHÓA HỌC
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.extraLarge,
                fontFamily: FontFamilies.medium,
                color: Colors.orange,
              }}
            >
              {breadcrumbs[1].name}
            </Typography>
            <Stack paddingTop={1}>
              <Breadcrumbs
                sx={{ color: Colors.white }}
                separator=">"
                aria-label="breadcrumb"
              >
                {breadcrumbs.map((item) => (
                  <Typography
                    key={item.link}
                    sx={{
                      fontFamily: FontFamilies.regular,
                      fontSize: FontSize.small,
                      color: Colors.white,
                    }}
                  >
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
