import { useEffect, useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { useDebounce } from '~/hooks/useDebounce';

interface SearchBarProps {
  value: string;
  color: 'white' | 'black';
  placeholder: string;
  size?: 'small' | 'medium';
  onSubmit: (searchValue: string) => void;
}

export default function SearchBar({
  value,
  color = 'black',
  placeholder,
  size = 'medium',
  onSubmit,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>(value);
  const debounceValue = useDebounce(searchValue, 1000);

  const handleChangeSearchValue = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleTextFieldKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchValue(searchValue);
      onSubmit(searchValue);
    }
  };

  useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (debounceValue) {
      onSubmit(debounceValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <TextField
      size="small"
      color="primary"
      sx={{
        borderRadius: MetricSize.small_5,
        background: Color.white2,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small_16,
        flex: 1,
        marginX: 1,
      }}
      value={searchValue}
      onChange={handleChangeSearchValue}
      onKeyDown={handleTextFieldKeyDown}
      placeholder={placeholder}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => onSubmit(searchValue)}>
            <Icon name="search" size="small_20" color="black" />
          </IconButton>
        ),
      }}
    />
  );
}
