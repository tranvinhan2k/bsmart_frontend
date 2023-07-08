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
import { mockLevelData } from '~/constants';
import toast from '~/utils/toast';
import { NavigationLink } from '~/constants/routeLink';
import { selectProfile } from '~/redux/user/selector';
import { addCheckoutItem } from '~/redux/courses/slice';

interface Props {
  categoryName: string;
  subjectName: string;
  classes: DetailCourseClassPayload[];
}

const initClass = {
  endDate: '',
  id: '',
  imageAlt: '',
  imageUrl: image.mockClass,
  level: mockLevelData[0],
  maxStudent: 0,
  minStudent: 0,
  numberOfSlot: 0,
  price: 0,
  startDate: '',
  timeInWeekRequests: [],
};

export default function Sidebar({ classes, categoryName, subjectName }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const [open, setOpen] = useState(false);
  const [chooseClass, setChooseClass] =
    useState<DetailCourseClassPayload>(initClass);

  const levelImage =
    LEVEL_IMAGES[chooseClass.level.value as keyof typeof LEVEL_IMAGES];
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeClass = (item: DetailCourseClassPayload) => {
    setChooseClass(item);
    handleOpen();
  };

  const handleDeleteChooseClass = () => {
    setChooseClass(initClass);
  };

  const handleCheckOut = () => {
    if (chooseClass.id !== '') {
      dispatch(addCheckoutItem(chooseClass));
      navigate(`/${NavigationLink.check_out}`);
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
      image: !chooseClass.level ? (
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
      name: 'Độ khó',
      value: chooseClass.level.label,
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
      value: chooseClass.id,
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
      id: 0,
      name: 'Kiến thức học được',
      onClick: () => {},
    },
    {
      id: 1,
      name: 'Khung chương trình',
      onClick: () => {},
    },
    {
      id: 2,
      name: 'Danh sách lớp học',
      onClick: () => {},
    },
    {
      id: 3,
      name: 'Về giáo viên',
      onClick: () => {},
    },
  ];

  return (
    <Stack
      sx={{
        position: 'sticky',
        top: '90px',
      }}
      paddingRight={MetricSize.large_30}
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
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {classes.map((item, index) => (
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
                    ':hover': {
                      cursor: 'pointer',
                      background: Color.grey3,
                      border: Color.transparent,
                    },
                  }}
                >
                  <Stack padding={1}>
                    <Box
                      component="img"
                      alt={item.imageAlt}
                      src={
                        LEVEL_IMAGES[
                          item.level.value.toUpperCase() as keyof typeof LEVEL_IMAGES
                        ]
                      }
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
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: FontSize.small_14,
                      fontFamily:
                        chooseClass.id === item.id
                          ? FontFamily.bold
                          : FontFamily.regular,
                      color:
                        chooseClass.id === item.id
                          ? Color.tertiary
                          : Color.black,
                    }}
                  >
                    {`Lớp học #${item.id}`}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
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
              onClick={handleCheckOut}
              variant="contained"
              sx={{ color: Color.white, flex: 1 }}
              startIcon={<Icon name="payment" size="small_20" color="white" />}
            >
              Đăng kí
            </Button>
            <Stack marginX={1} />
            <Button
              sx={{
                flex: 1,
              }}
              variant="outlined"
              startIcon={<Icon name="cart" size="small_20" color="navy" />}
            >
              Giỏ hàng
            </Button>
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
              onClick={item.onClick}
              key={item.id}
              sx={{
                transition: 'all 1s ease',
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                paddingY: 1,
                paddingX: 4,
                color: Color.grey,

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
