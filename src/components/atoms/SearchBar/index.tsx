import { useState } from 'react';
import { TextField, Stack } from '@mui/material';
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
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChangeSearchValue = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleTextFieldKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit(searchValue);
    }
  };
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        paddingX: MetricSize.medium_15,
      }}
    >
      <TextField
        variant="outlined"
        sx={{
          borderRadius: MetricSize.small_10,
          borderColor: Color.white,
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
        onKeyDown={handleTextFieldKeyDown}
        placeholder={placeholder}
        InputProps={{
          endAdornment: <Icon name="search" size="medium" color={color} />,
        }}
      />
    </Stack>
  );
}
