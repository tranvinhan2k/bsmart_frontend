import { useNavigate } from 'react-router-dom';
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import {
  Color,
  FontFamily,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';
import { LEVEL_IMAGES } from '~/constants/level';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import Button from '~/components/atoms/Button';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { image } from '~/constants/image';
import toast from '~/utils/toast';
import { NavigationLink } from '~/constants/routeLink';
import { selectProfile } from '~/redux/user/selector';
import { addCheckoutItem } from '~/redux/courses/slice';
import { LevelKeys } from '~/models/variables';
import {
  useDispatchGetCart,
  useMutationAddCourseToCart,
  useTryCatch,
} from '~/hooks';
import { RequestCartItem } from '~/api/cart';
import { useBoolean } from '~/hooks/useBoolean';
import { LoadingWrapper } from '~/HOCs';

interface Props {
  courseId: number;
  courseName: string;
  levelLabel: string;
  level: LevelKeys;
  categoryName: string;
  subjectName: string;
  classes: DetailCourseClassPayload[];
  scrollIntroduce: () => void;
  scrollContent: () => void;
  scrollClasses: () => void;
  scrollMentor: () => void;
}

const initClass: DetailCourseClassPayload = {
  courseName: '',
  courseId: 0,
  endDate: '',
  id: 0,
  status: 'ALL',
  imageAlt: '',
  imageUrl: image.mockClass,
  maxStudent: 0,
  minStudent: 0,
  purchase: false,
  isFullStudent: false,
  numberOfSlot: 0,
  price: 0,
  startDate: '',
  timeInWeekRequests: [],
  code: '',
};

export default function Sidebar({
  courseId,
  courseName,
  levelLabel,
  level,
  classes,
  categoryName,
  subjectName,
  scrollClasses,
  scrollContent,
  scrollIntroduce,
  scrollMentor,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const { mutateAsync: handleAddCourseToCart } = useMutationAddCourseToCart();
  const { handleTryCatch } = useTryCatch('thêm vào giỏ hàng');
  const { handleDispatch } = useDispatchGetCart();
  const [open, setOpen] = useState(false);
  const [navigationPartId, setNavigatePartId] = useState(0);
  const [chooseClass, setChooseClass] =
    useState<DetailCourseClassPayload>(initClass);

  const levelImage = LEVEL_IMAGES[level as keyof typeof LEVEL_IMAGES];
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeClass = (item: DetailCourseClassPayload) => {
    if (!item.purchase) {
      setChooseClass(item);
      handleOpen();
      scrollClasses();
    }
  };

  const handleDeleteChooseClass = () => {
    setChooseClass(initClass);
  };

  const handleCheckOut = () => {
    if (chooseClass.id !== 0) {
      dispatch(
        addCheckoutItem({
          checkOutCourses: {
            ...chooseClass,
            courseId,
            courseName,
          },
          totalAmount: chooseClass.price,
        })
      );
      navigate(`/${NavigationLink.check_out}`);
    } else {
      toast.notifyErrorToast('Hãy chọn lớp học bạn cần !');
    }
  };

  const handleAddToCart = async () => {
    if (chooseClass.id !== 0) {
      const params: RequestCartItem = {
        cartItemId: undefined,
        subCourseId: chooseClass.id,
      };
      await handleTryCatch(async () => {
        await handleAddCourseToCart(params);
        await handleDispatch();
      });
    } else {
      toast.notifyErrorToast('Hãy chọn lớp học bạn cần !');
    }
  };

  const barData: {
    id: number;
    image: React.ReactNode;
    name: string;
    value: string;
  }[] = [
    {
      id: 0,
      image: <Icon name="date" size="small_20" color="black" />,
      name: 'Số buổi học',
      value: `${chooseClass.numberOfSlot}`,
    },
    {
      id: 1,
      image: !level ? (
        <Icon name="date" size="small_20" color="black" />
      ) : (
        <Box
          sx={{
            width: IconSize.small_20,
            height: undefined,
            aspectRatio: 1,
          }}
          component="img"
          alt="level"
          src={levelImage}
        />
      ),
      name: 'Trình độ',
      value: levelLabel,
    },
  ];

  const textLineData: {
    id: number;
    icon: IconName;
    label: string;
    value: string;
  }[] = [
    {
      id: 4,
      icon: 'number',
      label: 'Mã lớp',
      value: `${chooseClass.id}`,
    },
    {
      id: 0,
      icon: 'category',
      label: 'Lĩnh vực',
      value: categoryName,
    },
    {
      id: 1,
      icon: 'subject',
      label: 'Môn học',
      value: subjectName,
    },
    {
      id: 2,
      icon: 'date',
      label: 'Ngày bắt đầu',
      value: formatDate(chooseClass.startDate),
    },
    {
      id: 3,
      icon: 'date',
      label: 'Ngày dự kiến kết thúc',
      value: formatDate(chooseClass.endDate),
    },
  ];

  const navigationButton: {
    id: number;
    name: string;
    onClick: () => void;
  }[] = [
    {
      id: 2,
      name: 'Danh sách lớp học',
      onClick: scrollClasses,
    },
    {
      id: 0,
      name: 'Mô tả khóa học',
      onClick: scrollIntroduce,
    },
    {
      id: 1,
      name: 'Khung chương trình',
      onClick: scrollContent,
    },
    {
      id: 3,
      name: 'Về giáo viên',
      onClick: scrollMentor,
    },
  ];

  return (
    <Stack
      sx={{
        position: 'sticky',
        top: '90px',
      }}
      paddingRight={{
        xs: '0',
        md: MetricSize.large_30,
      }}
      paddingBottom={1}
    >
      <Stack
        sx={{
          background: Color.white,
          borderRadius: MetricSize.small_10,
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <Collapse in={!open}>
          <Typography
            onClick={handleDeleteChooseClass}
            sx={{
              transition: 'all 500ms ease',
              ...globalStyles.textSmallLabel,
              ':hover': {
                textDecoration: 'underline',
                cursor: 'pointer',
                color: Color.black,
              },
            }}
          >
            Chọn lớp học
          </Typography>

          <LoadingWrapper isEmptyCourse={classes.length === 0}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                maxHeight: '250px',
                overflowY: 'auto',
              }}
            >
              {classes.map((item, index) => {
                return (
                  <Stack
                    sx={{
                      marginTop: 1,
                      marginLeft: index % 3 === 0 ? 0 : 1,
                      width: '31%',
                    }}
                    key={item.id}
                  >
                    <Stack
                      onClick={() => handleChangeClass(item)}
                      sx={{
                        padding: 1,
                        overflow: 'hidden',
                        background:
                          chooseClass.id === item.id
                            ? `${Color.tertiary}44`
                            : Color.white,
                        borderColor:
                          chooseClass.id === item.id
                            ? `${Color.tertiary}`
                            : Color.grey,
                        borderWidth: chooseClass.id === item.id ? '3px' : '1px',
                        borderStyle: 'solid',
                        transition: 'all 200ms ease',
                        height: undefined,
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: MetricSize.small_5,
                        opacity: item.purchase || item.isFullStudent ? 0.3 : 1,
                        ':hover': {
                          cursor:
                            item.purchase || item.isFullStudent
                              ? 'default'
                              : 'pointer',
                          background:
                            item.purchase || item.isFullStudent
                              ? Color.white
                              : Color.grey3,
                          borderColor:
                            item.purchase || item.isFullStudent
                              ? Color.grey
                              : Color.transparent,
                        },
                      }}
                    >
                      {/* <Stack padding={1}>
                    <Box
                      component="img"
                      alt={item.imageAlt}
                      src={image.classSlot}
                      sx={{
                        transition: 'all 200ms ease',
                        filter:
                          chooseClass.id === item.id
                            ? 'none'
                            : 'grayscale(100%)',
                        width: '50px',
                        height: undefined,
                        objectFit: 'contain',
                        aspectRatio: 1,
                      }}
                    />
                  </Stack> */}
                      {/* <Typography sx={globalStyles.textLowSmallLight}>
                    Tháng Tám
                  </Typography> */}
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontSize: FontSize.small_14,
                          fontFamily:
                            chooseClass.id === item.id
                              ? FontFamily.regular
                              : FontFamily.light,
                          color:
                            chooseClass.id === item.id
                              ? Color.tertiary
                              : Color.black,
                        }}
                      >
                        {/* {`Lớp học #${item.id}`} */}
                        Mã lớp
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontSize: {
                            xs: '12px',
                            md: FontSize.small_16,
                          },
                          fontFamily:
                            chooseClass.id === item.id
                              ? FontFamily.bold
                              : FontFamily.medium,
                          color:
                            chooseClass.id === item.id
                              ? Color.tertiary
                              : Color.black,
                        }}
                      >
                        {/* {`Lớp học #${item.id}`} */}
                        {`#${item.code}`}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontSize: FontSize.small_14,
                          fontFamily:
                            chooseClass.id === item.id
                              ? FontFamily.regular
                              : FontFamily.light,
                          color:
                            chooseClass.id === item.id
                              ? Color.tertiary
                              : Color.black,
                        }}
                      >
                        {formatMoney(item.price)}
                      </Typography>
                      {item.isFullStudent && (
                        <Typography
                          sx={{
                            textAlign: 'center',
                            fontSize: FontSize.small_14,
                            fontFamily:
                              chooseClass.id === item.id
                                ? FontFamily.regular
                                : FontFamily.light,
                            color:
                              chooseClass.id === item.id
                                ? Color.tertiary
                                : Color.black,
                          }}
                        >
                          (Lớp đã đầy học sinh)
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </LoadingWrapper>
        </Collapse>
        <Collapse in={open}>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name="return" size="small" color="grey" />
            <Typography
              onClick={handleOpen}
              sx={{
                marginLeft: 1,
                transition: 'all 500ms ease',
                ...globalStyles.textLowSmallLight,
                ':hover': {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: Color.black,
                },
              }}
            >
              Chọn lại lớp học
            </Typography>
          </Stack>
          <Stack>
            <Stack>
              <Typography
                sx={{
                  fontFamily: FontFamily.bold,
                  fontSize: FontSize.large_45,
                }}
              >
                {formatMoney(chooseClass.price, true)}
                <span
                  style={{
                    paddingLeft: MetricSize.small_10,
                    fontFamily: FontFamily.bold,
                    fontSize: FontSize.small_18,
                  }}
                >
                  VND
                </span>
              </Typography>
            </Stack>
            <Stack
              sx={{
                marginTop: 2,
                borderRadius: MetricSize.small_10,
                border: '0.5px solid #bbb',

                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {barData.map((item, index) => {
                return (
                  <Stack
                    key={item.id}
                    sx={{
                      paddingX: 1,
                      paddingY: MetricSize.small_5,
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      borderRight: index === 0 ? '0.5px solid #bbb' : 'none',
                    }}
                  >
                    <Stack padding={1}>{item.image}</Stack>
                    <Stack>
                      <Typography
                        sx={{
                          fontSize: FontSize.small_14,
                          fontFamily: FontFamily.light,
                          color: Color.grey,
                        }}
                      >
                        {item.name.toUpperCase()}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: FontSize.small_14,
                          fontFamily: FontFamily.bold,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
            <Stack marginTop={2}>
              {textLineData.map((item) => (
                <TextPropLine
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Stack>
          </Stack>
        </Collapse>

        {profile?.roles?.[0]?.code === 'STUDENT' && (
          <Stack
            marginTop={1}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              disabled={chooseClass.id === 0}
              onClick={handleCheckOut}
              variant="contained"
              sx={{ color: Color.white, flex: 1 }}
              startIcon={<Icon name="payment" size="small_20" color="white" />}
            >
              Đăng kí
            </Button>
            <Stack marginX={1} />
          </Stack>
        )}
      </Stack>
      <Stack
        sx={{
          background: Color.white,
          borderRadius: MetricSize.small_10,
          paddingY: 2,
          marginTop: 1,
        }}
      >
        <Stack
          sx={{
            paddingX: 4,
          }}
        >
          <Typography sx={globalStyles.textSubTitle}>Mục Lục</Typography>
          <Divider />
        </Stack>
        <Stack marginTop={1}>
          {navigationButton.map((item) => (
            <Stack
              onClick={() => {
                item.onClick();
                setNavigatePartId(item.id);
              }}
              key={item.id}
              sx={{
                background: navigationPartId === item.id ? '#ddd' : Color.white,
                transition: 'all 1s ease',
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.regular,
                padding: 1,
                marginX: 3,
                color: Color.black,

                ':hover': {
                  background: Color.grey3,
                  cursor: 'pointer',
                  color: Color.black,
                },
              }}
            >
              {item.name.toUpperCase()}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
