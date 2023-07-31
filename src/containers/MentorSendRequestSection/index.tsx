import {
  Box,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import OtherRequestSection from '../SendRequestSection/OtherRequestSection';
import UpdateMentorProfileRequestSection from '../SendRequestSection/UpdateMentorProfileRequestSection';
import WithdrawSection from '../SendRequestSection/WithdrawRequestSection';
import {
  SX_FORM,
  SX_FORM_LABEL,
  SX_FORM_LABEL_WARNING,
  SX_FORM_TITLE,
} from './style';

export default function MentorSendRequestSection() {
  const enum Text {
    sectionLabel = 'Gửi yêu cầu',
    selectLabel = 'Phân loại',
    selectUpdateMentorProfile = 'Yêu cầu bổ sung hồ sơ giáo viên',
    selectWithdraw = 'Yêu cầu rút tiền',
    selectOther = 'Các loại đơn khác',
  }

  const [errorMsg, setErrorMsg] = useState<string>('');
  const handleSetError = (data: string) => setErrorMsg(data);

  const [requestNo, setRequestNo] = useState<number>(0);
  const handleChangeRequestType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRequestNo(Number(e.target.value));
    setErrorMsg('');
  };

  const tabEl = [
    {
      id: 0,
      component: (
        <UpdateMentorProfileRequestSection handleSetError={handleSetError} />
      ),
    },
    { id: 1, component: <WithdrawSection /> },
    // { id: 2, component: <OtherRequestSection /> },
  ];

  return (
    <>
      <Box sx={SX_FORM}>
        <Typography component="h3" sx={SX_FORM_TITLE}>
          {Text.sectionLabel}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <Typography sx={SX_FORM_LABEL}>{Text.selectLabel}</Typography>
              <Box mt={1} />
              <TextField
                value={requestNo}
                onChange={handleChangeRequestType}
                select
                size="small"
              >
                <MenuItem value={0}>{Text.selectUpdateMentorProfile}</MenuItem>
                <MenuItem value={1}>{Text.selectWithdraw}</MenuItem>
                <MenuItem value={2}>{Text.selectOther}</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          {errorMsg && (
            <Grid item xs={6}>
              <Typography sx={SX_FORM_LABEL}>Chú thích</Typography>
              <Typography sx={SX_FORM_LABEL_WARNING}>{errorMsg}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      {tabEl.map((tab) => (
        <TabPanel value={requestNo as number} index={tab.id} key={tab.id}>
          <Box>{tab.component}</Box>
        </TabPanel>
      ))}
    </>
  );
}
