import { useState } from 'react';
import { Stack, Menu, Typography, IconButton } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import globalStyles from '~/styles';
import { FormInputVariant } from '~/models/form';
import { OptionPayload } from '~/models';

interface CRUDTableSearchingProps {
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

export default function CRUDTableSearching({
  searchPlaceholder,
  searchControl,
  filterFormInputList,
  onSearch,
}: CRUDTableSearchingProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const formInputList = [{}];

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Stack
      sx={{
        marginY: 2,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <FormInput
            variant="text"
            control={searchControl.control}
            name="searchValue"
            placeholder={searchPlaceholder}
          />
        </Stack>

        {filterFormInputList?.length !== 0 && (
          <Stack marginLeft={1}>
            <Button onClick={handleMenu} customVariant="horizonForm">
              <Icon name="filter" color="white" size="medium" />
            </Button>
          </Stack>
        )}
        {filterFormInputList?.length !== 0 && (
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onMouseLeave={handleClose}
          >
            <Stack sx={{ width: '500px', padding: 2 }}>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                paddingY={1}
              >
                <Typography sx={globalStyles.textSmallLabel}>Bộ lọc</Typography>
                <IconButton onClick={handleClose}>
                  <Icon name="close" size="small" color="black" />
                </IconButton>
              </Stack>
              {filterFormInputList?.map((item) => (
                <FormInput
                  key={item.name}
                  variant={item.variant}
                  control={searchControl.control}
                  name={item.name}
                  placeholder={item.placeholder}
                  data={item.data}
                />
              ))}
              <Button onClick={handleClose} customVariant="horizonForm">
                Xác nhận
              </Button>
            </Stack>
          </Menu>
        )}
        <Stack
          sx={{
            marginLeft: 1,
            width: '15%',
          }}
        >
          <Button
            onClick={searchControl.handleSubmit(onSearch)}
            startIcon={<Icon name="search" color="white" size="medium" />}
            customVariant="horizonForm"
          >
            <Typography noWrap sx={{ display: { xs: 'none', lg: 'block' } }}>
              Tìm kiếm
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

CRUDTableSearching.defaultProps = {
  filterFormInputList: [],
};
