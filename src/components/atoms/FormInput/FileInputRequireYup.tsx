import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { UseControllerReturn } from 'react-hook-form';
import { MetricSize } from '~/assets/variables';
import { openUrl } from '~/utils/window';
import Icon from '../Icon';
import globalStyles from '~/styles';

interface FileInputRequireYupProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function FileInputRequireYup({
  controller,
  placeholder,
}: FileInputRequireYupProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error: fieldError },
  } = controller;

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    onChange(selectedFile);
  };

  const handleDeleteClick = () => {
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
          helperText={fieldError?.message}
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
export default FileInputRequireYup;
