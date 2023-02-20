import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Checkbox from '~/components/atoms/Checkbox';
import Icon from '~/components/atoms/Icon';
import { CheckBoxPayload } from '~/models';

interface FilterCheckboxProps {
  data: CheckBoxPayload[];
}

export default function FilterCheckbox({ data }: FilterCheckboxProps) {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isViewMore, setViewMore] = useState<boolean>(true);

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

  return data && data.length !== 0 ? (
    <Stack>
      {data.map((checkbox, index) => {
        if (index >= 2 && isViewMore) {
          return <Stack key={checkbox.id} />;
        }
        return (
          <Stack key={checkbox.id}>
            <Checkbox
              isChecked={checkedList.includes(checkbox.value)}
              onCheck={() => handleClickedCheckBox(checkbox.value)}
            >
              {checkbox.label}
            </Checkbox>
          </Stack>
        );
      })}
      <Box>
        {data.length > 2 && (
          <Button onClick={handleTriggerViewMore}>
            {isViewMore ? (
              <Stack flexDirection="row" alignItems="center">
                <Icon size="small" name="down" />
                <Typography
                  sx={{
                    paddingLeft: MetricSize.small,
                    fontSize: FontSize.small,
                    fontFamily: FontFamilies.regular,
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
                    paddingLeft: MetricSize.small,
                    fontSize: FontSize.small,
                    fontFamily: FontFamilies.regular,
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
