import { useState } from 'react';
import { Button, Stack, Menu, Typography, IconButton } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import globalStyles from '~/styles';
import { FormInputVariant } from '~/models/form';
import { OptionPayload } from '~/models';
import { Color } from '~/assets/variables';

interface CRUDTableSearchingProps {
  searchPlaceholder: string;
  searchControl: UseFormReturn;
  filterFormInputList?: {
    variant: FormInputVariant;
    name: string;
    placeholder: string;
    data?: OptionPayload[];
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
        marginTop: 1,
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
            <Button
              sx={{
                height: '35px',
                color: Color.white,
              }}
              color="secondary"
              onClick={handleMenu}
              variant="contained"
            >
              <Icon name="filter" color="white" size="small_20" />
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
          >
            <Stack
              sx={{
                width: '500px',
                minHeight: '400px',
                padding: 2,
                justifyContent: 'space-between',
              }}
            >
              <Stack>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={globalStyles.textSmallLabel}>
                    Bộ lọc
                  </Typography>
                  <IconButton onClick={handleClose}>
                    <Icon name="close" size="small" color="black" />
                  </IconButton>
                </Stack>
                {filterFormInputList?.map((item, index) => (
                  <Stack
                    key={index}
                    sx={{
                      marginTop: 1,
                    }}
                  >
                    <FormInput
                      variant={item.variant}
                      control={searchControl.control}
                      name={item.name}
                      placeholder={item.placeholder}
                      data={item.data}
                    />
                  </Stack>
                ))}
              </Stack>
              <Button
                sx={{
                  marginTop: 1,
                  color: Color.white,
                }}
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
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
            startIcon={<Icon name="search" color="white" size="small_20" />}
            variant="contained"
            color="miSmartOrange"
          >
            Tìm kiếm
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

CRUDTableSearching.defaultProps = {
  filterFormInputList: [],
};
