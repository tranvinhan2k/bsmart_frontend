import { useNavigate } from 'react-router-dom';
import { Box, Divider, Stack, Typography } from '@mui/material';
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

interface Props {
  price: number;
  numOfSlot: number;
  level: OptionPayload;
  startDate: string;
  endDate: string;
  categoryName: string;
  subjectName: string;
}

export default function Sidebar({
  categoryName,
  endDate,
  level,
  numOfSlot,
  price,
  startDate,
  subjectName,
}: Props) {
  const navigate = useNavigate();

  const handleNavigateBuyCousePage = () => {
    navigate('/buy-course');
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
      value: `${numOfSlot}`,
    },
    {
      id: 1,
      image: (
        <Box
          sx={{
            width: IconSize.small_20,
            height: undefined,
            aspectRatio: 1,
          }}
          component="img"
          alt="level"
          src={LEVEL_IMAGES[level.value as keyof typeof LEVEL_IMAGES]}
        />
      ),
      name: 'Độ khó',
      value: level.label,
    },
  ];

  const textLineData: {
    id: number;
    icon: IconName;
    label: string;
    value: string;
  }[] = [
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
      value: formatDate(startDate),
    },
    {
      id: 3,
      icon: 'date',
      label: 'Ngày dự kiến kết thúc',
      value: formatDate(endDate),
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
          zIndex: 10,

          background: Color.white,
          borderRadius: MetricSize.small_10,
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <Stack>
          <Typography
            sx={{
              fontFamily: FontFamily.bold,
              fontSize: FontSize.large_45,
            }}
          >
            {formatMoney(price, true)}
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
        {/* <Stack
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
        </Stack> */}
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
        <Stack
          marginTop={3}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
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
            startIcon={<Icon name="payment" size="small_20" color="navy" />}
          >
            Giỏ hàng
          </Button>
        </Stack>
      </Stack>
      <Stack
        sx={{
          position: 'sticky',

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
