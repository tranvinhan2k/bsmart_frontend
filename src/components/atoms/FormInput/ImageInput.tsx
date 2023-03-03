import { UseControllerReturn } from 'react-hook-form';
import { TextField, Stack, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { MetricSize } from '~/assets/variables';
import Button from '../Button';

interface ImageInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function ImageInput({ controller, placeholder }: ImageInputProps) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error: fieldError },
  } = controller;
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('image')) {
      setFile(selectedFile);
      setError(null);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      onChange(selectedFile);
    } else {
      setFile(null);
      setError('Please select a valid image file (JPEG, PNG, or GIF)');
      onChange(null);
    }
  };

  const handleDeleteClick = () => {
    setFile(null);
    setPreviewUrl('');
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
        variant="outlined"
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

      {previewUrl && (
        <Stack marginTop={1}>
          <img src={previewUrl} alt="Preview" />
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
export default ImageInput;
