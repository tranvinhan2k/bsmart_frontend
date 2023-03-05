import {
  Box,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Button from '~/components/atoms/Button';
import {
  SX_CONTAINER,
  SX_WITHDRAW_TITLE,
  SX_WITHDRAW_BALANCE,
  SX_WITHDRAW_BALANCE_NUMBER,
  SX_TITLE_NOTE,
  SX_DESC_NOTE,
  SX_NOTE,
} from './style';

export default function WithdrawSection() {
  const formData = [
    { id: 1, placeholder: 'Nhập số tiền', icon: <LocalAtmIcon /> },
    { id: 2, placeholder: 'Ngân hàng', icon: <AccountBalanceIcon /> },
    { id: 3, placeholder: 'Số tài khoản', icon: <AccountCircleIcon /> },
    { id: 4, placeholder: 'Chủ tài khoản', icon: <Person2Icon /> },
    { id: 5, placeholder: 'Ghi chú', icon: <StickyNote2Icon /> },
    { id: 6, placeholder: 'Mã xác thực', icon: <VpnKeyIcon /> },
  ];

  return (
    <>
      <Box sx={SX_CONTAINER}>
        <Typography component="h3" sx={SX_WITHDRAW_TITLE}>
          Rút tiền
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          my={2}
        >
          <Typography component="p" sx={SX_WITHDRAW_BALANCE}>
            Số dư hiện tại:
          </Typography>
          <Typography sx={SX_WITHDRAW_BALANCE_NUMBER}>300,000 vnđ</Typography>
        </Stack>
        {formData.map((formField) => (
          <Box key={formField.id} mb={2}>
            <FormControl size="small" fullWidth>
              <TextField
                placeholder={formField.placeholder}
                size="small"
                InputProps={{
                  sx: { padding: 0 },
                  startAdornment: (
                    <InputAdornment position="end" sx={{ padding: 2 }}>
                      {formField.icon}
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>
        ))}
        <Button customVariant="normal">Rút tiền</Button>
      </Box>
      <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_TITLE_NOTE}>
          *Lưu ý:
        </Typography>
        <Typography component="p" sx={SX_DESC_NOTE}>
          1 trong 2 trường hợp gặp phải khi bạn không thể rút hết số dư còn lại
          là:
        </Typography>
        <Typography component="p" sx={SX_NOTE}>
          Trường hợp 1:
        </Typography>
        <Typography component="p" sx={SX_NOTE}>
          Trường hợp 2:
        </Typography>
      </Box>
    </>
  );
}
