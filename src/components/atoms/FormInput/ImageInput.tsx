import { UseControllerReturn } from 'react-hook-form';
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles, { SX_TEXT_INPUT_FORM } from '~/styles';

interface ImageInputProps {
  controller: UseControllerReturn<any, string>;
  previewImgHeight: number | string;
  previewImgWidth: number | string;
}
export default function ImageInput({
  controller,
  previewImgHeight = '100%',
  previewImgWidth = '100%',
}: ImageInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error: fieldError },
  } = controller;

  const [previewUrl, setPreviewUrl] = useState(
    value instanceof File ? URL.createObjectURL(value) : value
  );
  const [error, setError] = useState<string | null>(null);

  function dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];

    if (selectedFile && selectedFile.type.includes('image')) {
      setError(null);

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const image = new Image();
        image.onload = () => {
          let targetWidth = image.width;
          let targetHeight = image.height;

          if (
            typeof previewImgWidth === 'number' &&
            typeof previewImgHeight === 'number'
          ) {
            targetWidth = Math.round(image.width * 0.7);
            targetHeight = Math.round(
              (targetWidth * previewImgHeight) / previewImgWidth
            );
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          ctx?.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            targetWidth,
            targetHeight
          );

          const resizedDataUrl = canvas.toDataURL(selectedFile.type);

          const previewImage = new Image();
          previewImage.src = resizedDataUrl;
          previewImage.style.objectFit = 'cover';

          setPreviewUrl(previewImage.src);
          onChange(dataURLtoFile(resizedDataUrl, selectedFile.name));
        };

        image.src = event.target?.result as string;
      };

      reader.readAsDataURL(selectedFile);
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
          ...SX_TEXT_INPUT_FORM,
          height: previewUrl ? 0 : '100%',
          opacity: previewUrl ? 0 : 1,
          ':hover': {
            cursor: 'pointer',
          },
          input: {
            paddingX: 0,
            zIndex: 3,
            opacity: 0,
            ':hover': {
              cursor: 'pointer',
              background: Color.grey,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  zIndex: 2,
                  left: 0,
                }}
              >
                <IconButton sx={{ marginRight: 1 }} component="span">
                  <Icon name="add-icon" size="small_20" />
                </IconButton>
                <Typography
                  sx={{
                    ...globalStyles.textLowSmallLight,
                    zIndex: -1,
                  }}
                >
                  Chưa có hình ảnh được chọn.
                </Typography>
              </Stack>
            </InputAdornment>
          ),
        }}
        onBlur={onBlur}
        onChange={handleFileChange}
        error={invalid}
      />

      {previewUrl && (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          marginTop={1}
        >
          <Stack
            sx={{
              position: 'relative',
              width: previewImgWidth,
              height: previewImgHeight,
            }}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Stack
              onClick={handleDeleteClick}
              sx={{
                borderRadius: MetricSize.small_10,
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
                  background: `${Color.red}99`,
                  backdropFilter: 'blur(10px)',
                  color: Color.white,
                  svg: {
                    color: Color.white,
                  },
                },
              }}
            >
              <Icon name="delete" size="medium" color="transparent" />
              Xóa hình ảnh
            </Stack>
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{
                borderRadius: MetricSize.small_10,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Stack>
        </Stack>
      )}

      {invalid && (
        <FormHelperText error>{`${(error as any).message}`}</FormHelperText>
      )}
    </Stack>
  );
}
