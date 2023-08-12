import { UseControllerReturn } from 'react-hook-form';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricSize, Color } from '~/assets/variables';
// eslint-disable-next-line import/no-cycle
import Icon from '../Icon';
import globalStyles from '~/styles';
import { openUrl } from '~/utils/window';
import toast from '~/utils/toast';

interface FileListInputProps {
  controller: UseControllerReturn<any, string>;
}
function FileListInput({ controller }: FileListInputProps) {
  const [customError, setCustomError] = useState<string | null>(null);

  const {
    field: { value, onChange: controllerOnChange },
    fieldState: { invalid, error },
  } = controller;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = (paramIndex: number) => {
    const tmpValue = value.files.filter(
      (_: any, index: number) => index !== paramIndex
    );

    controllerOnChange({
      files: tmpValue,
      deleteIndexes:
        value.files[paramIndex].fileType === 'ATTACH'
          ? [...(value?.deleteIndexes || []), paramIndex]
          : [...(value?.deleteIndexes || [])],
    });
  };

  const handleFileChange = (e: any) => {
    console.log('value params', e.target.files, value);

    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('application')) {
      setCustomError(null);
      controllerOnChange({
        ...value,
        files: [...(value?.files || []), selectedFile],
      });
    } else {
      const errorText = 'Hãy nhập định dạng file đúng (PDF, Word, or Excel)';
      toast.notifyErrorToast(errorText);
      setCustomError(errorText);
    }
  };

  useEffect(() => {
    if (!value) {
      controllerOnChange({ files: [], deleteIndexes: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('attachFiles', value);

  return (
    <Stack>
      <Stack
        sx={{
          border: `0.5px solid ${customError || invalid ? Color.red : '#ddd'}`,
          borderRadius: MetricSize.small_5,
          padding: 1,
          background: Color.white,
        }}
      >
        <Stack>
          {value.files && value?.files.length > 0 ? (
            value?.files?.map((item: any, index: number) => {
              return (
                <Stack
                  sx={{
                    marginBottom: 1,
                    background: Color.white4,
                    borderRadius: MetricSize.small_5,
                    padding: 1,
                  }}
                  key={index}
                >
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography noWrap>{item.name}</Typography>
                    <Stack sx={globalStyles.viewFlexRowCenter}>
                      {item.url && (
                        <IconButton onClick={() => openUrl(item?.url)}>
                          <Icon
                            name="download"
                            size="small_20"
                            color="tertiary"
                          />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDelete(index)}>
                        <Icon name="delete" size="small_20" color="red" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })
          ) : (
            <Stack
              padding={2}
              sx={{
                background: Color.white4,
                marginBottom: 1,
              }}
            >
              <Typography
                textAlign="center"
                sx={globalStyles.textLowSmallLight}
              >
                Chưa thêm tệp đính kèm nào.
              </Typography>
            </Stack>
          )}
        </Stack>
        <Box>
          <Button
            component="label"
            startIcon={<Icon name="add" size="small_20" color="white" />}
            variant="contained"
            color={customError || invalid ? 'error' : 'info'}
            onClick={handleOpen}
          >
            Thêm tệp đính kèm
            <input
              hidden
              accept="application/*"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      </Stack>
      {(customError || invalid) && (
        <FormHelperText error>
          {customError || (error as any)?.message}
        </FormHelperText>
      )}
    </Stack>
  );
}
export default FileListInput;
