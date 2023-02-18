import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<boolean>();

  const handleChangeSearchValue = (event: any) => {
    setSearchValue(event.target.value);
  };
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: MetricSize.medium,
      }}
    >
      <Stack>
        <TextField
          variant="outlined"
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
          }}
          value={searchValue}
          onChange={handleChangeSearchValue}
          placeholder="Tìm kiếm ..."
          InputProps={{
            endAdornment: <Icon name="search" size="medium" />,
          }}
        />
      </Stack>
    </Stack>
  );
}
