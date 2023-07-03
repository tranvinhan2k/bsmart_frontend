import { Stack, Collapse } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { ActionPayload } from '~/models';

export default function DashboardSidebarButton({
  item,
  activeIndex,
  index,
  onSetActive,
  onNavigateLink,
}: {
  item: ActionPayload;
  activeIndex: number;
  index: number;
  onSetActive: (index: number) => void;
  onNavigateLink: (link: string) => void;
}) {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState(false);

  const handleOpenCollapse = () => {
    onSetActive(index);
    setOpen(!open);
  };

  const handleSingleNavigate = () => {
    onSetActive(index);
    onNavigateLink(item.link);
  };

  useEffect(() => {
    if (activeIndex !== index && open) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return !item.items ? (
    <Stack
      onClick={handleSingleNavigate}
      sx={{
        transition: 'background-color 500ms ease',
        borderBottomRightRadius:
          activeIndex - 1 === index ? MetricSize.small_10 : 0,
        borderTopRightRadius:
          activeIndex + 1 === index ? MetricSize.small_10 : 0,
        padding: MetricSize.medium_15,
        color: activeIndex === index ? Color.black : Color.white,
        fontSize: FontSize.small_16,
        fontFamily:
          activeIndex === index ? FontFamily.bold : FontFamily.regular,
        background:
          activeIndex === index
            ? `linear-gradient(90deg, ${Color.navy}99 30%, ${Color.white4} 80%)`
            : Color.navy,
        ':hover': {
          background: `linear-gradient(153deg, ${Color.navy}CC 30%, ${Color.white4} 75%)`,
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
          // justifyContent: 'space-between',
        }}
      >
        {item.icon && (
          <Stack marginRight={1}>
            <Icon
              size="small_20"
              color={activeIndex === index ? 'black' : 'white'}
              name={item.icon}
            />
          </Stack>
        )}
        {item.name}
        <Stack
          sx={{
            position: 'absolute',
            right: MetricSize.medium_15,
            transform: activeIndex === index ? 'rotate(90deg)' : 0,
          }}
        >
          <Icon name="arrowRight" size="small" />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <Stack>
      <Stack
        onClick={handleOpenCollapse}
        sx={{
          position: 'relative',
          transition: 'background-color 700ms ease',
          borderBottomRightRadius:
            activeIndex - 1 === index ? MetricSize.small_10 : 0,
          borderTopRightRadius:
            activeIndex + 1 === index ? MetricSize.small_10 : 0,
          padding: MetricSize.medium_15,
          color: activeIndex === index ? 'Color.black' : Color.white,
          fontSize: FontSize.small_16,
          fontFamily:
            activeIndex === index ? FontFamily.bold : FontFamily.regular,
          background:
            activeIndex === index
              ? `linear-gradient(90deg, ${Color.navy}99 30%, ${Color.white4} 80%)`
              : Color.navy,
          ':hover': {
            background: `linear-gradient(90deg, ${Color.navy}CC 30%, ${Color.white4} 80%)`,
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
            // justifyContent: 'space-between',
          }}
        >
          {item.icon && (
            <Stack marginRight={1}>
              <Icon
                size="small_20"
                color={activeIndex === index ? 'black' : 'white'}
                name={item.icon}
              />
            </Stack>
          )}
          {item.name}
          <Stack
            sx={{
              position: 'absolute',
              right: MetricSize.medium_15,
              transform: activeIndex === index ? 'rotate(90deg)' : 0,
            }}
          >
            <Icon name="arrowRight" size="small" />
          </Stack>
        </Stack>
      </Stack>
      <Collapse in={open}>
        <Stack sx={{ marginBottom: 1 }}>
          {item.items.map((subItem) => {
            return (
              <Stack
                sx={{
                  transition: 'background 500ms',
                  height: '30px',
                  justifyContent: 'center',
                  background: pathname.includes(subItem.link)
                    ? Color.grey3
                    : Color.white4,
                  color: pathname.includes(subItem.link)
                    ? Color.black
                    : Color.black,
                  fontSize: FontSize.small_14,
                  paddingY: MetricSize.small_10,
                  paddingLeft: MetricSize.large_30,
                  paddingRight: MetricSize.small_10,
                  marginRight: 1,
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
