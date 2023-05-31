import React, { useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { image } from '~/constants/image';
import Icon, { IconName } from '~/components/atoms/Icon';

interface UserCourseItemProps {
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  courseName: string | undefined;
  courseDescription: string | undefined;
  menuItemList: {
    id: number;
    title: string;
    icon: IconName;
    isHide?: boolean;
    onClick: () => void;
  }[];
}
export default function UserCourseItem({
  courseDescription,
  courseName,
  imageAlt,
  imageUrl,
  menuItemList,
}: UserCourseItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(() => null);
  };
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Stack
      sx={{
        marginTop: MetricSize.medium_15,
        marginLeft: '10px',
        boxShadow: 2,
        borderColor: Color.grey,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={handleMenu}
        sx={{
          height: '25px',
          width: '25px',
          position: 'absolute',
          top: MetricSize.small_10,
          right: MetricSize.small_10,
          background: Color.white,
        }}
      >
        <Icon name="moreVert" size="small" color="black" />
      </IconButton>
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'contain',
            width: '100%',
            height: undefined,
            aspectRatio: 16 / 9,
            background: 'black',
          }}
          src={imageUrl || image.noCourse}
          alt={imageAlt}
        />
        <Stack
          sx={{
            padding: MetricSize.medium_15,
            border: '0.5px solid #ddd',
          }}
        >
          <Stack
            sx={{
              height: '100px',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontWeight: 'bold',
                fontFamily: FontFamily.bold,
              }}
            >
              {courseName || ''}
            </Typography>
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                color: Color.grey,
              }}
            >
              {courseDescription}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}
      >
        {menuItemList?.map((item) => {
          if (!item.isHide) {
            return (
              <MenuItem key={item.title} onClick={item.onClick}>
                <ListItemIcon>
                  <Icon name={item.icon} size="medium" color="black" />
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </MenuItem>
            );
          }
          return undefined;
        })}
      </Menu>
    </Stack>
  );
}
