import { Stack, Collapse } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { ActionPayload } from '~/models';

export default function SidebarNavigationButton({
  item,
  onNavigateLink,
}: {
  item: ActionPayload;
  onNavigateLink: (link: string) => void;
}) {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState(false);

  const handleOpenCollapse = () => {
    setOpen(!open);
  };

  return !item.items ? (
    <Button onClick={() => onNavigateLink(item.link)} customVariant="normal">
      {item.name}
    </Button>
  ) : (
    <Stack>
      <Button onClick={handleOpenCollapse} customVariant="normal">
        <Stack
          sx={{
            flexDirection: 'row',
            position: 'relative',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.name}
          <Stack
            sx={{
              transform: open ? 'rotate(90deg)' : 'none',
              position: 'absolute',
              right: MetricSize.small_10,
              transition: 'transform 0.5s',
            }}
          >
            <Icon name="arrowRight" size="small_20" color="whiteSmoke" />
          </Stack>
        </Stack>
      </Button>
      <Collapse in={open}>
        <Stack sx={{ paddingLeft: 2, marginTop: 2 }} spacing={1}>
          {item.items.map((subItem) => {
            console.log('pathname', pathname, subItem.link);

            return (
              <Button
                sx={{
                  background: pathname.includes(subItem.link)
                    ? '#b24509'
                    : `${Color.orange}55`,
                  color: pathname.includes(subItem.link)
                    ? Color.white
                    : Color.black,
                  fontSize: FontSize.small_14,
                  padding: MetricSize.small_10,
                  fontFamily: FontFamily.medium,
                  boxShadow: 1,
                }}
                key={subItem.id}
                onClick={() => onNavigateLink(subItem.link)}
                customVariant="normal"
              >
                {subItem.name}
              </Button>
            );
          })}
        </Stack>
      </Collapse>
    </Stack>
  );
}
