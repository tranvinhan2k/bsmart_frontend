import { UseControllerReturn } from 'react-hook-form';
import {
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { MetricSize } from '~/assets/variables';

interface FileInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function FileInput({ controller, placeholder }: FileInputProps) {
  const [error, setError] = useState<string | null>(null);
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error: fieldError },
  } = controller;

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('application')) {
      setError(null);
      console.log(selectedFile);

      onChange(selectedFile);
    } else {
      setError('Hãy nhập định dạng file đúng (PDF, Word, or Excel)');
      onChange(null);
    }
  };

  const handleDeleteClick = () => {
    setError(null);
    onChange(null);
  };

  return (
    <Stack
      sx={{
        borderRadius: '5px',
        border: '1px solid grey',
        padding: MetricSize.medium_15,
      }}
    >
      {!value && (
        <TextField
          type="file"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton component="span">
                  <Icon name="add-icon" size="medium" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onBlur={onBlur}
          onChange={handleFileChange}
          error={invalid}
          helperText={fieldError?.message || error}
        />
      )}

      {value && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography>{value.name}</Typography>
          <Stack
            direction={{ md: 'column', lg: 'row' }}
            justifyContent={{ md: 'flex-start', lg: 'space-between' }}
            alignItems={{ md: 'center', lg: 'flex-start' }}
            spacing={2}
          >
            {value.url && (
              <MuiButton
                variant="outlined"
                color="success"
                fullWidth
                href={value.url}
                target="_blank"
                size="small"
              >
                <Icon name="eye" size="medium" />
              </MuiButton>
            )}
            <MuiButton
              variant="outlined"
              color="error"
              fullWidth
              size="small"
              onClick={handleDeleteClick}
            >
              <Icon name="clear" size="medium" />
            </MuiButton>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
export default FileInput;
