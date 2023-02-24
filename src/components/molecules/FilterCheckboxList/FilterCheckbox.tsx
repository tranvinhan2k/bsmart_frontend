import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { CheckBoxPayload } from '~/models';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Checkbox from '~/components/atoms/Checkbox';
import Icon from '~/components/atoms/Icon';

interface FilterCheckboxProps {
  label: string;
  data: CheckBoxPayload[];
}

export default function FilterCheckbox({ label, data }: FilterCheckboxProps) {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isViewMore, setViewMore] = useState<boolean>(true);
  const [isViewMoreMobile, setViewMoreMobile] = useState<boolean>(false);

  const handleClickedCheckBox = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((checkbox) => checkbox !== value));
      return;
    }
    setCheckedList([...checkedList, value]);
  };

  const handleTriggerViewMore = () => {
    setViewMore(!isViewMore);
  };
  const handleTriggerViewMoreMobile = () => {
    setViewMoreMobile(!isViewMoreMobile);
  };

  return data && data.length !== 0 ? (
    <Stack>
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
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.bold,
            ':hover': { cursor: 'pointer' },
          }}
        >
          {label}
        </Typography>
      </Button>
      <Typography
        sx={{
          fontSize: FontSize.small_18,
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
                isChecked={checkedList.includes(checkbox.value)}
                onCheck={() => handleClickedCheckBox(checkbox.value)}
              >
                {checkbox.label}
              </Checkbox>
            </Stack>
          );
        })}
      </Stack>
      <Box>
        {data.length > 2 && (
          <Button
            sx={{
              display: { xs: 'none', md: 'flex' },
              paddingX: 0,
              ':hover': {
                background: Color.white,
                textDecorationLine: 'underline',
              },
            }}
            onClick={handleTriggerViewMore}
          >
            {isViewMore ? (
              <Stack flexDirection="row" alignItems="center">
                <Icon size="small" name="down" />
                <Typography
                  sx={{
                    paddingLeft: MetricSize.medium_15,
                    fontSize: FontSize.small_16,
                    fontFamily: FontFamily.regular,
                    ':hover': { cursor: 'pointer' },
                  }}
                >
                  Xem thêm
                </Typography>
              </Stack>
            ) : (
              <Stack flexDirection="row" alignItems="center">
                <Icon size="small" name="up" />
                <Typography
                  sx={{
                    paddingLeft: MetricSize.medium_15,
                    fontSize: FontSize.small_16,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  Thu Gọn
                </Typography>
              </Stack>
            )}
          </Button>
        )}
      </Box>
    </Stack>
  ) : (
    <Stack>Is Loading ...</Stack>
  );
}
