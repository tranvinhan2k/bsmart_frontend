import { UseControllerReturn } from 'react-hook-form';
import {
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Box,
  Link,
} from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { MetricSize } from '~/assets/variables';
import Button from '../Button';

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
        <Stack mt={1}>
          <Link href={value.url}>{value.name}</Link>
          <Box mt={2}>
            <Button
              customVariant="normal"
              startIcon={<Icon name="delete" size="small" />}
              size="small"
              onClick={handleDeleteClick}
            >
              Gỡ file
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
export default FileInput;
