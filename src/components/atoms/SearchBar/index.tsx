import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';

interface SearchBarProps {
  color: 'white' | 'black';
  placeholder: string;
  onSubmit: (searchValue: string) => void;
}

export default function SearchBar({
  color = 'black',
  placeholder,
  onSubmit,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>();

  const handleChangeSearchValue = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSubmitSearchValue = () => {
    if (!searchValue) return;
    onSubmit(searchValue);
  };
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: MetricSize.medium_15,
        flex: 1,
      }}
    >
      <TextField
        variant="outlined"
        sx={{
          flex: 1,
          fontFamily: FontFamily.regular,
          fontSize: FontSize.small_16,
          background: Color.semiTransparent,
          input: {
            color: Color[color],
          },
          '&:placeholder': {
            color: Color[color],
          },
        }}
        value={searchValue}
        onChange={handleChangeSearchValue}
        onSubmit={handleSubmitSearchValue}
        placeholder={placeholder}
        InputProps={{
          endAdornment: <Icon name="search" size="medium" color={color} />,
        }}
      />
    </Stack>
  );
}
