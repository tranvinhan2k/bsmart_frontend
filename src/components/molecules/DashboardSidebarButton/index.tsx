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
        color: activeIndex === index ? Color.black : Color.whiteSmoke,
        fontSize: FontSize.small_18,
        fontFamily:
          activeIndex === index ? FontFamily.bold : FontFamily.regular,
        background: activeIndex === index ? Color.white4 : Color.navy,
        ':hover': {
          background: `linear-gradient(90deg, ${Color.navy}AA 30%, ${Color.white4} 75%)`,
          cursor: 'pointer',
          color: Color.white,
        },
      }}
      key={item.id}
    >
      {item.name}
    </Stack>
  ) : (
    <Stack>
      <Stack
        onClick={handleOpenCollapse}
        sx={{
          position: 'relative',
          transition: 'background-color 500ms ease',
          borderBottomRightRadius:
            activeIndex - 1 === index ? MetricSize.small_10 : 0,
          borderTopRightRadius:
            activeIndex + 1 === index ? MetricSize.small_10 : 0,
          padding: MetricSize.medium_15,
          color: activeIndex === index ? Color.black : Color.whiteSmoke,
          fontSize: FontSize.small_18,
          fontFamily:
            activeIndex === index ? FontFamily.bold : FontFamily.regular,
          background: activeIndex === index ? Color.white4 : Color.navy,
          ':hover': {
            background: `linear-gradient(90deg, ${Color.navy}AA 30%, ${Color.white4} 75%)`,
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
            justifyContent: 'space-between',
          }}
        >
          {item.name}
          <Stack
            sx={{
              postion: 'absolute',
              right: 0,
              transform: activeIndex === index ? 'rotate(90deg)' : 0,
            }}
          >
            <Icon name="arrowRight" size="small" />
          </Stack>
        </Stack>
      </Stack>
      <Collapse in={open}>
        <Stack sx={{ marginRight: 2, marginBottom: 2 }}>
          {item.items.map((subItem) => {
            return (
              <Stack
                sx={{
                  transition: 'background 500ms',
                  marginTop: 1,
                  marginX: 1,
                  height: '30px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: MetricSize.small_5,
                  background: pathname.includes(subItem.link)
                    ? Color.grey2
                    : Color.white,
                  color: pathname.includes(subItem.link)
                    ? Color.white
                    : Color.black,
                  fontSize: FontSize.small_14,
                  padding: MetricSize.small_10,
                  fontFamily: FontFamily.medium,
                  ':hover': {
                    background: Color.grey,
                    cursor: 'pointer',
                    color: Color.white,
                  },
                }}
                key={subItem.id}
                onClick={() => onNavigateLink(subItem.link)}
              >
                {subItem.name}
              </Stack>
            );
          })}
        </Stack>
      </Collapse>
    </Stack>
  );
}
