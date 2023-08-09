import { UseControllerReturn } from 'react-hook-form';
import {
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { Color, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import { openUrl } from '~/utils/window';

interface FileInputProps {
  controller: UseControllerReturn<any, string>;
}
function FileInput({ controller }: FileInputProps) {
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
        border: `1px solid ${Color.grey}`,
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
          <Typography sx={globalStyles.textLowSmallLight} noWrap>
            {value.name}
          </Typography>
          <Stack
            direction={{ md: 'column', lg: 'row' }}
            justifyContent={{ md: 'flex-start', lg: 'space-between' }}
            alignItems={{ md: 'center', lg: 'flex-start' }}
          >
            {value.url && (
              <IconButton onClick={() => openUrl(value.url)}>
                <Icon name="download" size="small_20" color="tertiary" />
              </IconButton>
            )}
            <IconButton onClick={handleDeleteClick}>
              <Icon name="clear" size="small_20" color="red" />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
export default FileInput;
