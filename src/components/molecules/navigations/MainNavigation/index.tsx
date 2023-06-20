import React from 'react';

import {
  Avatar,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Button,
  Drawer,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';

import Icon from '~/components/atoms/Icon';
import SearchBar from '~/components/atoms/SearchBar';
import SocialBar from '~/components/molecules/SocialBar';
import ContractBar from '~/components/molecules/ContractBar';
import AuthorizationBar from '../../MainHeader/AuthorizationBar';

import { AuthorizationActionData } from '~/constants';

import styles from './styles';
import { Role } from '~/models/role';
import { CoursePayload } from '~/models/courses';
import { ResponseCartItem } from '~/api/cart';
import { selectProfile } from '~/redux/user/selector';
import { ProfileImgType } from '~/constants/profile';
import { image } from '~/constants/image';
import MentorDetailSection from '~/containers/MentorProfileLayoutSection/MentorDetailSection';

interface NavigationProps {
  texts: {
    CART_LINK: string;
    COURSE_MENU_KEYWORD: string;
    COURSE_MENU_LINK: string;
    MOCK_TEACHER_NAME: string;
    MOCK_COURSE_NAME: string;
    APP_NAME: string;
    SEARCH_COURSE_PLACEHOLDER: string;
  };
  isOpenDrawer: boolean;
  isOpenProfileDrawer: boolean;
  cart: ResponseCartItem | undefined;
  courses: CoursePayload[] | undefined;
  role: Role | null;
  filterParams: {
    q: string | undefined;
    categoryId: number[] | undefined;
    subjectId: number[] | undefined;
    page: number;
    size: number;
    sort: string[] | undefined;
    provinces: number[] | undefined;
    types: number[] | undefined;
  } | null;
  pathName: string;
  pages: ActionPayload[];
  socials: SocialPayload[];
  contracts: ContractPayload[];
  courseAnchorEl: HTMLElement | null;
  onToggleDrawer: () => void;
  onToggleProfileDrawer: () => void;
  onNavigationLink: (_link: string) => void;
  onCloseCourseMenu: () => void;
  onSearchCourse: (searchValue: string) => void;
  onMouseEnterNavigation: (_event: any, _link: string) => void;
  onMouseLeaveNavigation: () => void;
  onClickNavigation: (_link: string) => void;
  onClickCart: () => void;
}

export default function MainNavigation({
  texts,
  isOpenDrawer,
  isOpenProfileDrawer,
  cart,
  courses,
  role,
  filterParams,
  pathName,
  pages,
  contracts,
  socials,
  courseAnchorEl,
  onCloseCourseMenu,
  onToggleDrawer,
  onToggleProfileDrawer,
  onNavigationLink,
  onSearchCourse,
  onClickCart,
  onClickNavigation,
  onMouseEnterNavigation,
  onMouseLeaveNavigation,
}: NavigationProps) {
  const profile = useSelector(selectProfile);

  const renderNavigationList = () => {
    return (
      pages &&
      pages.map(
        (item) =>
          !item.isHide && (
            <React.Fragment key={item.link}>
              <Button
                style={{
                  textDecoration: 'none',
                  padding: MetricSize.medium_15,
                }}
                onClick={() => onClickNavigation(item.link)}
                onMouseOver={(e) => onMouseEnterNavigation(e, item.link)}
              >
                <Typography
                  style={{
                    fontFamily: FontFamily.bold,
                    fontSize: FontSize.small_16,
                    color: pathName.includes(item.link)
                      ? Color.orange
                      : Color.navy,
                  }}
                >
                  {item.name}
                </Typography>
              </Button>
            </React.Fragment>
          )
      )
    );
  };

  return (
    <Stack sx={styles.view}>
      <Stack sx={styles.view3}>
        <IconButton onClick={onToggleProfileDrawer}>
          <Avatar
            alt="Avatar"
            src={
              profile?.userImages?.find(
                (img) => img?.type === ProfileImgType.AVATAR
              )?.url || image.noAvatar
            }
            sx={{
              width: 40,
              height: 40,
            }}
          />
        </IconButton>
      </Stack>
      <Stack>
        <Typography sx={styles.text1}>
          {texts.APP_NAME.toUpperCase()}
        </Typography>
      </Stack>
      <Stack sx={styles.view1} flexDirection="row">
        {renderNavigationList()}
      </Stack>
      <Stack sx={styles.view2}>
        {role !== 'ROLE_TEACHER' && (
          <IconButton onClick={onClickCart}>
            <Badge
              badgeContent={cart?.totalItem}
              color="secondary"
              sx={styles.badge}
            >
              <Icon name="cart" size="medium" />
            </Badge>
          </IconButton>
        )}
      </Stack>
      <Stack sx={styles.view3}>
        <IconButton onClick={onToggleDrawer}>
          <Icon name="menu" size="medium" />
        </IconButton>
      </Stack>

      <Drawer anchor="right" open={isOpenDrawer} onClose={onToggleDrawer}>
        <Stack sx={styles.view4}>
          <Stack sx={styles.subView}>
            <Typography sx={styles.text2}>
              {texts.APP_NAME.toUpperCase()}
            </Typography>
            <IconButton onClick={onToggleDrawer}>
              <Icon name="close" color="navy" size="medium" />
            </IconButton>
          </Stack>
          {renderNavigationList()}
          <SearchBar
            value={filterParams?.q || ''}
            color="black"
            placeholder={texts.SEARCH_COURSE_PLACEHOLDER}
            onSubmit={onSearchCourse}
          />
          <ContractBar color="black" contracts={contracts} />
          <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <SocialBar color="black" socials={socials} />
            <AuthorizationBar
              color="black"
              loginData={AuthorizationActionData[0]}
              registerData={AuthorizationActionData[1]}
              onLoginClick={() => onNavigationLink('/login')}
              onRegisterClick={() =>
                onNavigationLink(AuthorizationActionData[1].link)
              }
            />
          </Stack>
        </Stack>
      </Drawer>
      <Drawer
        anchor="left"
        open={isOpenProfileDrawer}
        onClose={onToggleProfileDrawer}
      >
        <MentorDetailSection />
      </Drawer>
      <Menu
        id="basic-menu"
        anchorEl={courseAnchorEl}
        open={Boolean(courseAnchorEl)}
        onClose={onCloseCourseMenu}
        onMouseLeave={onMouseLeaveNavigation}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {courses &&
          courses.map((course: any) => {
            return (
              <MenuItem
                key={course.id}
                onClick={() =>
                  onClickNavigation(`/${texts.COURSE_MENU_LINK}/${course.id}`)
                }
              >
                {course.title || `Tên khóa học ${course.id}`}
              </MenuItem>
            );
          })}
      </Menu>
    </Stack>
  );
}
