import { UseControllerReturn } from 'react-hook-form';
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import Icon from '../Icon';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles, { SX_TEXT_INPUT_FORM } from '~/styles';
import CustomModal from '../CustomModal';
import { useBoolean } from '~/hooks/useBoolean';
import Button from '../Button';
import { useDebounceEffect } from '~/hooks/useDebounceEffect';
import { canvasPreview } from '~/utils/canvasPreview';

interface ImageInputProps {
  controller: UseControllerReturn<any, string>;
  previewImgHeight: number;
  previewImgWidth: number;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageInput({
  controller,
  previewImgHeight = 1,
  previewImgWidth = 1,
}: ImageInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error: fieldError },
  } = controller;

  const imgRef = useRef<HTMLImageElement>(null);
  const { value: isCropImage, toggle: toggleCropImage } = useBoolean(false);
  const [previewUrl, setPreviewUrl] = useState(value.url);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number>(
    previewImgWidth / previewImgHeight
  );
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef('');

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

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];

    if (selectedFile && selectedFile.type.includes('image')) {
      setError(null);

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const image = new Image();

        image.onload = () => {
          const targetWidth = image.width * 0.7;
          const targetHeight = image.height * 0.7;

          // if (
          //   typeof previewImgWidth === 'number' &&
          //   typeof previewImgHeight === 'number'
          // ) {
          //   targetWidth = Math.round(image.width * 0.7);
          //   targetHeight = Math.round(
          //     (targetWidth * previewImgHeight) / previewImgWidth
          //   );
          // }

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
      toggleCropImage();
    } else {
      setError('Xin hãy chọn lại định dạng ảnh phù hợp (JPEG, PNG, or GIF)');
      onChange(null);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  const handleDeleteClick = () => {
    setPreviewUrl('');
    setError(null);
    onChange(null);
  };

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist');
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }

      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);

      onChange(blob);

      setPreviewUrl(imageUrl);
    });
  }

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
                  Chưa chọn ảnh
                </Typography>
              </Stack>
            </InputAdornment>
          ),
        }}
        onBlur={onBlur}
        onChange={handleFileChange}
        error={invalid}
      />

      <CustomModal
        open={isCropImage}
        onClose={toggleCropImage}
        title="Chỉnh sửa hình ảnh"
      >
        <Stack
          sx={{
            width: '60vw',
            height: '90vh',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              width: '100%',
              height: '60vh',
              alignItems: 'flex-end',
            }}
          >
            <Stack sx={{ flexGrow: 1, height: '100%' }}>
              <Stack height="100%" sx={globalStyles.viewRoundedBorderBody}>
                <Typography sx={globalStyles.textSmallLabel}>
                  Cắt hình ảnh
                </Typography>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={previewUrl}
                    onLoad={onImageLoad}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </ReactCrop>
              </Stack>
            </Stack>
            <Stack sx={{ height: '100%', width: '300px' }}>
              <Stack
                sx={{
                  marginLeft: 1,
                }}
              >
                <Typography sx={globalStyles.textSmallLabel}>
                  Xem trước hình ảnh
                </Typography>
                {!!completedCrop && (
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            marginTop={1}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => {
                onDownloadCropClick();
                toggleCropImage();
              }}
              variant="contained"
            >
              Xác nhận chỉnh sửa
            </Button>
            <Button
              onClick={toggleCropImage}
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
              color="error"
            >
              Hủy bỏ
            </Button>
          </Stack>
        </Stack>
      </CustomModal>

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
              alt="preview hinh anh"
              sx={{
                borderRadius: MetricSize.small_10,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                boxShadow: 5,
              }}
            />
          </Stack>
        </Stack>
      )}

      {(invalid || error) && (
        <FormHelperText error>{` ${
          error || fieldError?.message
        }}`}</FormHelperText>
      )}
    </Stack>
  );
}
