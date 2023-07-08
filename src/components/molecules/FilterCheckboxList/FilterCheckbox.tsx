import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Checkbox from '~/components/atoms/Checkbox';
import Icon from '~/components/atoms/Icon';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';

interface FilterCheckboxProps {
  value: number[] | undefined;
  label: string;
  data: OptionPayload[] | undefined;
  onChange: (data: number[]) => void;
}

export default function FilterCheckbox({
  value = [],
  label,
  data,
  onChange,
}: FilterCheckboxProps) {
  const [isViewMore, setViewMore] = useState<boolean>(true);
  const [isViewMoreMobile, setViewMoreMobile] = useState<boolean>(false);

  const handleClickedCheckBox = (id: number) => {
    if (value.includes(id)) {
      const resultvalue = value.filter((checkbox) => checkbox !== id);
      onChange(resultvalue);
      return;
    }
    const resultSelectedCheckbox = [...value, id];
    onChange(resultSelectedCheckbox);
  };

  const handleTriggerViewMore = () => {
    setViewMore(!isViewMore);
  };
  const handleTriggerViewMoreMobile = () => {
    setViewMoreMobile(!isViewMoreMobile);
  };

  return data && data.length !== 0 ? (
    <Stack
      sx={{
        transition: 'all 1s ease',
      }}
    >
      <Button
        sx={{
          textAlign: 'start',
          display: { xs: 'block', md: 'none' },
          paddingX: 0,
          ':hover': {
            background: Color.white,
            textDecorationLine: 'underline',
            cursor: 'pointer',
          },
        }}
        onClick={handleTriggerViewMoreMobile}
      >
        <Typography
          sx={{
            fontSize: FontSize.small_16,
            fontFamily: FontFamily.bold,
            ':hover': { cursor: 'pointer' },
          }}
        >
          {label}
        </Typography>
      </Button>
      <Typography
        sx={{
          fontSize: FontSize.small_16,
          fontFamily: FontFamily.bold,
          display: { xs: 'none', md: 'block' },
        }}
      >
        {label}
      </Typography>
      <Stack
        sx={{
          display: { xs: isViewMoreMobile ? 'none' : 'block', md: 'block' },
        }}
      >
        {data.map((checkbox, index) => {
          return (
            <Stack
              sx={{
                display: {
                  xs: isViewMoreMobile ? 'none' : 'block',
                  md: isViewMore && index >= 2 ? 'none' : 'block',
                },
              }}
              key={checkbox.id}
            >
              <Checkbox
                isChecked={value.includes(checkbox.id)}
                onCheck={() => handleClickedCheckBox(checkbox.id)}
              >
                {checkbox.label}
              </Checkbox>
            </Stack>
          );
        })}
      </Stack>
      <Box>
        {data.length > 2 && (
          <Stack marginY={1} flexDirection="row" alignItems="center">
            <Icon size="small" name={isViewMore ? 'down' : 'up'} />
            <Typography
              onClick={handleTriggerViewMore}
              sx={{
                marginLeft: 1,
                ...globalStyles.textLowSmallLight,
                ':hover': { cursor: 'pointer', textDecoration: 'underline' },
              }}
            >
              {isViewMore ? ' Xem thêm' : 'Thu Gọn'}
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  ) : (
    <Stack marginBottom={2}>
      <Skeleton height={100} />
    </Stack>
  );
}
