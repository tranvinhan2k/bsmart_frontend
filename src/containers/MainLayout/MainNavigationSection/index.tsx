import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MainNavigation from '~/components/molecules/navigations/MainNavigation';
import {
  HeaderContractDataList,
  HeaderSocialDataList,
  NavigationActionData,
} from '~/constants';
import { useQueryGetAllCourse, useDispatchGetCart } from '~/hooks';
import { selectFilterParams } from '~/redux/courses/selector';
import { selectIsToggleAddToCart, selectRole } from '~/redux/user/selector';
import { toggleAddToCart } from '~/redux/user/slice';
import localEnvironment from '~/utils/localEnvironment';

const texts = {
  CART_LINK: '/cart',
  INTRODUCE_MENTOR_KEYWORD: 'mentor-introduce',
  COURSE_MENU_KEYWORD: 'course_menu',
  COURSE_MENU_LINK: 'course_menu/course-detail',
  MOCK_TEACHER_NAME: 'Giáo viên',
  MOCK_COURSE_NAME: 'Khóa học',
  APP_NAME: localEnvironment.APP_NAME,
  SEARCH_COURSE_PLACEHOLDER: 'Tìm kiếm khóa học',
};

export default function MainNavigationSection() {
  const dispatch = useDispatch();

  const navigation = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const role = useSelector(selectRole);
  const filterParams = useSelector(selectFilterParams);
  const isAddToCart = useSelector(selectIsToggleAddToCart);

  const { cart, error, handleDispatch, isLoading } = useDispatchGetCart();

  const { courses } = useQueryGetAllCourse();

  // useState
  const [isOpenDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isOpenProfileDrawer, setOpenProfileDrawer] = useState<boolean>(false);
  const [courseAnchorEl, setCourseAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // function
  function checkEqualValue(_value1: string, _value2: string) {
    return _value1.includes(_value2);
  }

  const handleToggleDrawer = () => {
    setOpenDrawer(!isOpenDrawer);
  };

  const handleToggleProfileDrawer = () => {
    setOpenProfileDrawer(!isOpenProfileDrawer);
  };

  const handleMouseEnterNavigation = (_event: any, _link: string) => {
    // if (checkEqualValue(_link, texts.COURSE_MENU_KEYWORD)) {
    //   setCourseAnchorEl(_event.currentTarget);
    //   return;
    // }
  };
  const handleCloseCourseMenu = () => {
    setCourseAnchorEl(null);
  };

  const handleMouseLeaveNavigation = () => {
    setCourseAnchorEl(null);
  };

  const handleClickNavigation = (_link: string) => {
    setCourseAnchorEl(null);

    navigation(_link);

    if (isOpenDrawer) {
      handleToggleDrawer();
    }
  };

  const handleNavigateCartPage = () => {
    navigation(texts.CART_LINK);
  };

  const handleSearchValue = (_searchValue: string) => {
    // TODO: add feature search value
  };

  const navigationLink = (_link: string) => {
    setCourseAnchorEl(null);
    navigation(_link);
  };

  useEffect(() => {
    function handleRefetchCart() {
      if (isAddToCart) {
        dispatch(toggleAddToCart(false));
      }
    }

    handleRefetchCart();
  }, [dispatch, isAddToCart]);

  return (
    <MainNavigation
      texts={texts}
      isOpenDrawer={isOpenDrawer}
      isOpenProfileDrawer={isOpenProfileDrawer}
      cart={cart as any}
      courses={courses?.items}
      role={role}
      filterParams={filterParams}
      pathName={pathName}
      pages={NavigationActionData}
      contracts={HeaderContractDataList}
      socials={HeaderSocialDataList}
      courseAnchorEl={courseAnchorEl}
      onSearchCourse={handleSearchValue}
      onNavigationLink={navigationLink}
      onToggleDrawer={handleToggleDrawer}
      onToggleProfileDrawer={handleToggleProfileDrawer}
      onCloseCourseMenu={handleCloseCourseMenu}
      onMouseEnterNavigation={handleMouseEnterNavigation}
      onMouseLeaveNavigation={handleMouseLeaveNavigation}
      onClickNavigation={handleClickNavigation}
      onClickCart={handleNavigateCartPage}
    />
  );
}
