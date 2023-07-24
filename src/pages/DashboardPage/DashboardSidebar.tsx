import { Stack, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Color, MetricSize, FontSize, FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import DashboardSidebarButton from '~/components/molecules/DashboardSidebarButton';
import { image } from '~/constants/image';
import { ActionPayload } from '~/models';
import globalStyles from '~/styles';
import localEnvironment from '~/utils/localEnvironment';

interface Props {
  isMobile?: boolean;
  rows: ActionPayload[];
  isHover: boolean;
  onTriggerHover: (param: boolean) => void;
  onNavigateLink: (link: string) => void;
  onNavigateHomepage: () => void;
}

export default function DashboardSidebar({
  isMobile = false,
  rows,
  isHover,
  onNavigateLink,
  onTriggerHover,
  onNavigateHomepage,
}: Props) {
  const { pathname } = useLocation();
  let activeIndex = -1;

  const filterRows = rows.filter((item) => {
    return !item.isHide;
  });
  filterRows.map((item, index) => {
    if (pathname.includes(item.link)) activeIndex = index;
    return null;
  });
  return (
    <Stack
      sx={{
        marginLeft: '60px',
      }}
    >
      <Stack
        onMouseOut={() => onTriggerHover(false)}
        onMouseOver={() => onTriggerHover(true)}
        sx={{
          transition: 'all 1000ms ease',
          background: Color.white4,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9,
          shadow: 3,
          maxWidth: isHover || isMobile ? '100%' : '60px',
          height: '100vh',
        }}
      >
        <Stack
          sx={{
            paddingTop: 3,
            paddingLeft: MetricSize.small_10,
            background: Color.navy,
            flexDirection: 'row',
            alignItems: 'flex-start',
            overflow: 'hidden',
          }}
        >
          <Box
            alt="logo"
            sx={{
              width: '30px',
              height: undefined,
              aspectRatio: 1,
              objectFit: 'contain',
            }}
            src={image.lms_logo}
            component="img"
          />
          <Typography
            sx={{
              ...globalStyles.textWhiteSubTitle,
              marginLeft: 1,
              transition: 'all 1s ease',
              textAlign: 'center',
              opacity: isHover || isMobile ? 1 : 0,
              maxWidth: isHover || isMobile ? '100%' : 0,
            }}
          >
            {`${localEnvironment.APP_NAME}`.toUpperCase()}
          </Typography>
        </Stack>
        <Stack
          sx={{
            borderBottomRightRadius: {
              xs: 0,
              md: pathname.includes(filterRows[0].link)
                ? MetricSize.small_10
                : 0,
            },
            padding: MetricSize.medium_15,
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
            background: Color.navy,
          }}
        />
        {filterRows?.map((item, index) => {
          return (
            <DashboardSidebarButton
              isHover={isHover || isMobile}
              activeIndex={activeIndex}
              index={index}
              item={item}
              onNavigateLink={onNavigateLink}
              key={item.id}
            />
          );
        })}
        <Stack
          sx={{
            borderTopRightRadius: {
              xs: 0,
              md: pathname.includes(filterRows[filterRows.length - 1].link)
                ? MetricSize.small_10
                : 0,
            },

            padding: MetricSize.medium_15,
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
            background: Color.navy,
          }}
        />
        <Stack sx={{ background: Color.navy }}>
          <Button
            sx={{
              margin: 2,
              transition: 'all 200ms ease',
              opacity: isHover ? 1 : 0,
            }}
            color="info"
            variant="contained"
            onClick={onNavigateHomepage}
          >
            <Typography noWrap>Trở về trang chủ</Typography>
          </Button>
        </Stack>
        <Stack
          sx={{
            flex: 1,
            background: Color.navy,
            flexGrow: 1,
          }}
        />
      </Stack>
    </Stack>
  );
}
