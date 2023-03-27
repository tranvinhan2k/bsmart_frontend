import { UseControllerReturn } from 'react-hook-form';
import {
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { Color, MetricSize } from '~/assets/variables';
import Button from '../Button';

interface FileInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function FileInput({ controller, placeholder }: FileInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error: fieldError },
  } = controller;
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('application')) {
      setFile(selectedFile);
      setError(null);
      onChange(selectedFile);
    } else {
      setFile(null);
      setError('Hãy nhập định dạng file đúng (PDF, Word, or Excel)');
      onChange(null);
    }
  };

  const handleDeleteClick = () => {
    setFile(null);
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

      {file && (
        <Stack marginTop={1}>
          <Typography
            sx={{
              boxShadow: 3,
              background: Color.whiteSmoke,
              padding: 1,
              marginY: 1,
            }}
          >
            {file.name}
          </Typography>
          <Stack marginTop={1}>
            <Button
              customVariant="normal"
              startIcon={<Icon name="delete" size="medium" />}
              onClick={handleDeleteClick}
            >
              Remove
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
export default FileInput;
