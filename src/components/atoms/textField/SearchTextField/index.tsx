import { TextField, InputAdornment, TextFieldProps } from '@mui/material';
import Icon from '../../Icon';
import { Color } from '~/assets/variables';

export function SearchTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      sx={{
        background: Color.white,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon name="search" size="small_20" color="black" />
          </InputAdornment>
        ),
      }}
      size="small"
      placeholder="Nhập tên khóa học cần tìm kiếm.."
    />
  );
}
