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
import { getYearPickerUtilityClass } from '@mui/x-date-pickers';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { image } from '~/constants/image';
import Icon, { IconName } from '~/components/atoms/Icon';
import Tag from '~/components/atoms/Tag';
import {
  ClassStatusList,
  CourseStatusList,
  CourseTypeDataKeys,
  courseTypeData,
} from '~/constants';

interface UserCourseItemProps {
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  courseTeacherName?: string[];
  courseName: string | undefined;
  subjectName?: string;
  courseType?: string;
  courseStatus?: string;
  totalClass?: number;
  courseDescription: string | undefined;
  menuItemList?: {
    id: number;
    title: string;
    icon: IconName;
    isHide?: boolean;
    onClick: () => void;
  }[];
  onClick?: () => void;
}
export default function UserCourseItem({
  courseDescription,
  courseName,
  courseType,
  subjectName,
  courseTeacherName,
  totalClass,
  courseStatus,
  imageAlt,
  imageUrl,
  menuItemList,
  onClick,
}: UserCourseItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [viewDetailShowing, setViewDetailShowing] = useState(false);

  const isHover = onClick !== null;

  const handleClose = () => {
    setAnchorEl(() => null);
  };
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseOver = () => {
    setViewDetailShowing(true);
  };
  const handleMouseOut = () => {
    setViewDetailShowing(false);
  };

  return (
    <Stack
      sx={{
        transition: 'all 200ms ease',
        marginBottom: MetricSize.medium_15,
        borderRadius: MetricSize.small_5,
        marginRight: { xs: '0', md: '10px' },
        boxShadow: 2,
        borderColor: Color.grey,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'relative',
        background: Color.white,
        ':hover': {
          cursor: isHover ? 'pointer' : 'default',
          boxShadow: isHover ? 5 : 2,
          transform: isHover ? 'scale(1.02)' : 'none',
        },
      }}
    >
      {isHover && (
        <Stack
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            transition: 'all 500ms ease',
            backdropFilter: 'blur(0px)',
            borderRadius: MetricSize.small_5,
            justifyContent: 'center',
            alignItems: 'center',

            ':hover': {
              backdropFilter: 'blur(4px)',
              background: `${Color.navy}88`,
            },
          }}
          onClick={onClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {viewDetailShowing && (
            <>
              <Icon name="search" size="ex_large" color="white" />
              <Typography
                sx={{
                  fontFamily: FontFamily.light,
                  fontSize: FontSize.small_18,
                  color: Color.white,
                }}
              >
                Xem chi tiết khóa học
              </Typography>
            </>
          )}
        </Stack>
      )}
      {courseStatus && (
        <Box
          sx={{
            position: 'absolute',
            top: MetricSize.small_5,
            left: MetricSize.small_5,
            padding: 1,
            borderRadius: MetricSize.small_5,
            background: `${Color.tertiary}55`,
            backdropFilter: 'blur(10px)',
            color: Color.white,
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_14,
          }}
        >
          {CourseStatusList.find((item) => item.value === courseStatus)?.label}
        </Box>
      )}

      {menuItemList?.length !== 0 && (
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
      )}
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            borderTopRightRadius: MetricSize.small_5,
            borderTopLeftRadius: MetricSize.small_5,
            objectFit: 'cover',
            width: '100%',
            height: undefined,
            aspectRatio: 16 / 9,
            backgroundColor: '#0093E9',
            background: '#F5F5F5',
          }}
          src={imageUrl || image.noCourse}
          alt={imageAlt}
        />

        <Stack
          sx={{
            padding: MetricSize.medium_15,
            borderTop: `0.5px solid ${Color.border}`,
          }}
        >
          {totalClass && totalClass !== 0 ? (
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontWeight: 'bold',
                fontFamily: FontFamily.bold,
                color: Color.red,
              }}
            >
              {`Có ${totalClass} lớp đang mở` || ''}
            </Typography>
          ) : null}
          <Stack
            sx={{
              marginTop: 1,
              height: '120px',
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
            {courseTeacherName && (
              <Typography
                sx={{
                  fontSize: FontSize.small_14,
                  fontFamily: FontFamily.light,
                  color: Color.grey,
                }}
              >
                {courseTeacherName.map((item, index) => (
                  <span key={item}>{`${index !== 0 && ', '} ${item} `}</span>
                ))}
              </Typography>
            )}
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                color: Color.grey,
              }}
              dangerouslySetInnerHTML={{ __html: courseDescription || '' }}
            />
          </Stack>
          <Stack
            spacing={1}
            sx={{
              flexDirection: 'row',
              marginTop: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {courseType && (
              <Box>
                <Tag
                  title={courseTypeData[courseType as CourseTypeDataKeys]}
                  color="tertiary"
                />
              </Box>
            )}
            {subjectName && (
              <Box>
                <Tag title={subjectName} color="white5" textColor="grey" />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
      {menuItemList?.length !== 0 && (
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
                    <Icon name={item.icon} size="small_20" color="black" />
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </MenuItem>
              );
            }
            return undefined;
          })}
        </Menu>
      )}
    </Stack>
  );
}
UserCourseItem.defaultProps = {
  courseType: '',
  courseTeacherName: '',
  courseStatus: '',
  subjectName: '',
  menuItemList: [],
  totalClass: 0,
  onClick: null,
};
