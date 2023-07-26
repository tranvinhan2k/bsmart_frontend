import { Box, Button as MuiButton, Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { OptionPayload } from '~/models';
import { FormInputVariant } from '~/models/form';

interface ManageTableSearchingProps {
  searchPlaceholder: string;
  searchControl: UseFormReturn;
  filterFormInputList?: {
    variant: FormInputVariant;
    name: string;
    placeholder: string;
    data: OptionPayload[];
  }[];
  onSearch: (data: any) => void;
}

export default function ManageTableSearching({
  searchPlaceholder,
  searchControl,
  filterFormInputList,
  onSearch,
}: ManageTableSearchingProps) {
  return (
    <Box my={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack sx={{ flexGrow: 1 }}>
          <FormInput
            variant="text"
            control={searchControl.control}
            name="searchValue"
            placeholder={searchPlaceholder}
          />
        </Stack>
        <Stack
          sx={{
            marginLeft: 1,
            width: '15%',
          }}
        >
          <MuiButton
            onClick={searchControl.handleSubmit(onSearch)}
            startIcon={<Icon name="search" color="white" size="small_20" />}
            color="miSmartOrange"
            variant="contained"
          >
            <Typography noWrap>Tìm kiếm</Typography>
          </MuiButton>
        </Stack>
      </Stack>
    </Box>
  );
}

ManageTableSearching.defaultProps = {
  filterFormInputList: [],
};
