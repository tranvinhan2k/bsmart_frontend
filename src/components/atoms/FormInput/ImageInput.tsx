import { UseControllerReturn } from 'react-hook-form';
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '../Button';
import globalStyles from '~/styles';

interface ImageInputProps {
  controller: UseControllerReturn<any, string>;
  previewImgHeight: number | '100%';
  previewImgWidth: number | '100%';
}
export default function ImageInput({
  controller,
  previewImgHeight,
  previewImgWidth,
}: ImageInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error: fieldError },
  } = controller;

  const [previewUrl, setPreviewUrl] = useState(
    value instanceof File ? URL.createObjectURL(value) : value
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('image')) {
      setError(null);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      onChange(selectedFile);
    } else {
      setError('Xin hãy chọn lại định dạng ảnh phù hợp (JPEG, PNG, or GIF)');
      onChange(null);
    }
  };

  const handleDeleteClick = () => {
    setPreviewUrl('');
    setError(null);
    onChange(null);
  };

  return (
    <Stack
      sx={{
        borderRadius: '5px',
      }}
    >
      <TextField
        type="file"
        sx={{
          ':hover': {
            cursor: 'pointer',
          },
          input: {
            opacity: 0,
            ':hover': {
              cursor: 'pointer',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton sx={{ marginRight: 1 }} component="span">
                  <Icon name="add-icon" size="medium" />
                </IconButton>
                <Typography sx={globalStyles.textLowSmallLight}>
                  Chưa có hình ảnh được chọn.
                </Typography>
              </Stack>
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
          <Stack
            sx={{
              position: 'relative',
            }}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Stack
              onClick={handleDeleteClick}
              sx={{
                transition: 'all 1s ease',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                color: Color.transparent,
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                ':hover': {
                  cursor: 'pointer',
                  background: `${Color.navy}AA`,
                  backdropFilter: 'blur(10px)',
                  color: Color.white,
                },
              }}
            >
              Xóa hình ảnh
            </Stack>
            <Avatar
              src={previewUrl}
              alt="Preview"
              variant="rounded"
              sx={{ width: previewImgWidth, height: previewImgHeight }}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
