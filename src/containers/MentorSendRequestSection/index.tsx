import {
  Box,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import UpdateMentorProfileRequestSection from '../SendRequestSection/UpdateMentorProfileRequestSection';
import UpdateMentorProfileRequestSectionGuide from '../SendRequestSection/UpdateMentorProfileRequestSection/UpdateMentorProfileRequestSectionGuide';
import WithdrawSection from '../SendRequestSection/WithdrawRequestSection';
import WithdrawRequestSectionGuide from '../SendRequestSection/WithdrawRequestSection/WithdrawRequestSectionGuide';
import { SX_FORM, SX_FORM_TITLE } from './style';

export default function MentorSendRequestSection() {
  const enum Text {
    sectionLabel = 'Gửi yêu cầu',
    selectLabel = 'Phân loại',
    // selectUpdateMentorProfile = 'Cập nhật hồ sơ giáo viên',
    selectWithdraw = 'Rút tiền',
  }

  const [requestNo, setRequestNo] = useState<number>(0);
  const handleChangeRequestType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRequestNo(Number(e.target.value));
  };

  const tabEl = [
    {
      id: 0,
      component: <WithdrawSection />,
      guide: <WithdrawRequestSectionGuide />,
    },
    // {
    //   id: 1,
    //   component: <UpdateMentorProfileRequestSection />,
    //   guide: <UpdateMentorProfileRequestSectionGuide />,
    // },
  ];

  return (
    <>
      <Box sx={SX_FORM}>
        <Typography component="h3" sx={SX_FORM_TITLE}>
          {Text.sectionLabel}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormControl fullWidth size="small">
              <Typography>
                <b>{Text.selectLabel}</b>
              </Typography>
              <Box mt={1} />
              <TextField
                value={requestNo}
                onChange={handleChangeRequestType}
                select
                size="small"
              >
                <MenuItem value={0}>{Text.selectWithdraw}</MenuItem>
                {/* <MenuItem value={1}>{Text.selectUpdateMentorProfile}</MenuItem> */}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            {tabEl[requestNo].guide}
          </Grid>
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
