import { Stack, Collapse, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

import Icon from '~/components/atoms/Icon';
import { ActionPayload } from '~/models';

export default function DashboardSidebarButton({
  item,
  activeIndex,
  index,
  isHover,
  onNavigateLink,
}: {
  item: ActionPayload;
  activeIndex: number;
  index: number;
  isHover: boolean;
  onNavigateLink: (link: string) => void;
}) {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState(false);

  const handleOpenCollapse = () => {
    setOpen(!open);
  };

  const handleSingleNavigate = () => {
    onNavigateLink(item.link);
  };

  useEffect(() => {
    if ((activeIndex !== index && open) || isHover === false) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isHover]);

  return !item.items ? (
    <Stack
      onClick={handleSingleNavigate}
      sx={{
        transition: 'height 500ms ease',
        backdropFilter: 'blur(4px)',
        borderBottomRightRadius: {
          xs: 0,
          md: activeIndex - 1 === index ? MetricSize.small_10 : 0,
        },
        borderTopRightRadius: {
          xs: 0,
          md: activeIndex + 1 === index ? MetricSize.small_10 : 0,
        },
        padding: MetricSize.medium_15,
        color: Color.white,
        fontSize: FontSize.small_16,
        fontFamily:
          activeIndex === index ? FontFamily.bold : FontFamily.regular,
        background: activeIndex === index ? Color.transparent : Color.navy,
        ':hover': {
          background:
            activeIndex === index
              ? `linear-gradient(90deg, ${Color.white} 70%, ${Color.transparent} 100%)`
              : `${Color.navy}AA`,
          cursor: 'pointer',
          color: Color.white,
        },
      }}
      key={item.id}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          svg: {
            color: activeIndex === index ? Color.black : Color.white,
          },
          // justifyContent: 'space-between',
        }}
      >
        {item.icon && (
          <Stack marginRight={1}>
            <Icon size="small_20" color="white" name={item.icon} />
          </Stack>
        )}
        <Stack
          sx={{
            transition: 'all 1000ms ease',
            opacity: isHover ? '1' : 0,
            width: isHover ? '100%' : '0',
            flexWrap: 'nowrap',
          }}
        >
          <Typography
            sx={{
              color: activeIndex === index ? Color.black : Color.white,
            }}
            noWrap
          >
            {item.name}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <Stack>
      <Stack
        onClick={handleOpenCollapse}
        sx={{
          position: 'relative',
          transition: 'height 700ms ease',
          borderBottomRightRadius: {
            xs: 0,
            md: activeIndex - 1 === index ? MetricSize.small_10 : 0,
          },
          borderTopRightRadius: {
            xs: 0,
            md: activeIndex + 1 === index ? MetricSize.small_10 : 0,
          },
          padding: MetricSize.medium_15,
          color: Color.white,
          fontSize: FontSize.small_16,
          fontFamily:
            activeIndex === index ? FontFamily.bold : FontFamily.regular,
          background: activeIndex === index ? Color.transparent : Color.navy,
          ':hover': {
            background:
              activeIndex === index
                ? `linear-gradient(153deg, ${Color.white} 30%, ${Color.transparent} 80%)`
                : `${Color.navy}AA`,
            cursor: 'pointer',
            color: Color.white,
          },
        }}
        key={item.id}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            svg: {
              color: activeIndex === index ? Color.black : Color.white,
            },
            // justifyContent: 'space-between',
          }}
        >
          {item.icon && (
            <Stack marginRight={1}>
              <Icon size="small_20" color="white" name={item.icon} />
            </Stack>
          )}
          <Stack
            sx={{
              transition: 'all 1000ms ease',
              opacity: isHover ? '1' : 0,
              width: isHover ? '100%' : '0',
              flexWrap: 'nowrap',
            }}
          >
            <Typography
              sx={{
                color: activeIndex === index ? Color.black : Color.white,
              }}
              noWrap
            >
              {item.name}
            </Typography>

            <Stack
              sx={{
                position: 'absolute',
                right: MetricSize.medium_15,
                transform: activeIndex === index ? 'rotate(90deg)' : 0,
              }}
            >
              <Icon
                name="arrowRight"
                size="small"
                color={activeIndex === index ? 'black' : 'white'}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Collapse in={open}>
        <Stack sx={{ marginBottom: 1 }}>
          {item.items.map((subItem) => {
            if (subItem.isHide) return null;
            return (
              <Stack
                sx={{
                  transition: 'background 500ms',
                  height: '30px',
                  justifyContent: 'center',
                  background: pathname.includes(subItem.link)
                    ? Color.grey
                    : Color.white4,
                  color: pathname.includes(subItem.link)
                    ? Color.black
                    : Color.black,
                  fontSize: FontSize.small_14,
                  paddingY: MetricSize.small_10,
                  paddingLeft: MetricSize.large_30,
                  paddingRight: MetricSize.small_10,
                  fontFamily: pathname.includes(subItem.link)
                    ? FontFamily.medium
                    : FontFamily.light,
                  ':hover': {
                    background: `${Color.grey}`,
                    cursor: 'pointer',
                    color: Color.black,
                  },
                }}
                key={subItem.id}
                onClick={() => onNavigateLink(subItem.link)}
              >
                <Stack
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                  }}
                >
                  {item.icon && (
                    <Stack marginRight={1}>
                      <Icon size="small_20" color="black" name={item.icon} />
                    </Stack>
                  )}
                  {subItem.name}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Collapse>
    </Stack>
  );
}
