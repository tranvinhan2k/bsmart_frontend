import {
  Box,
  Chip,
  Grid,
  LinearProgress,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Button from '~/components/atoms/Button';
import CustomDialog from '~/components/atoms/CustomDialog';
import Icon from '~/components/atoms/Icon';
import { useCheckCompleteness } from '~/hooks/mentorProfile/useCheckCompleteness';
import MentorProfileProgress from '~/components/molecules/FormComponent/EditProfileForm/MentorProfileProgress';
import sx from './style';

export default function MentorProfileStatusProfileSideBar2() {
  const { mentorProfilesCompleteness } = useCheckCompleteness();
  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button fullWidth>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              <LinearProgress
                color="warning"
                variant="determinate"
                value={70}
                sx={sx.linearProgress}
              />
              <Stack direction="column">
                <Typography sx={sx.completenessHelperText}>
                  Thông tin bắt buộc
                </Typography>
                <Typography sx={sx.completenessHelperSubText}>7/10</Typography>
              </Stack>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              <LinearProgress
                color="warning"
                variant="determinate"
                value={100}
                sx={sx.linearProgress}
              />
              <Stack direction="column">
                <Typography sx={sx.completenessHelperText}>
                  Thông tin tùy chỉnh
                </Typography>
                <Typography sx={sx.completenessHelperSubText}>
                  Chưa hoàn tất
                </Typography>
                <Typography sx={sx.completenessHelperSubText}>
                  Nhấp đề xem chi tiết
                </Typography>
              </Stack>
            </Stack>
          </Button>
        </Grid>
      </Grid>
      <Box mt={1} mb={2}>
        <Tooltip title="Các thông tin bắt buộc chưa được điền đủ" arrow>
          <Stack direction="row" justifyContent="center" alignItems="stretch">
            <Button
              color="miSmartOrange"
              size="small"
              variant="contained"
              disabled
              sx={sx.profileSubmitButton}
            >
              Nộp hồ sơ
            </Button>
          </Stack>
        </Tooltip>
      </Box>
      <CustomDialog open={open} onClose={handleTriggerDialog} maxWidth={false}>
        <MentorProfileProgress />
      </CustomDialog>
    </>
  );
}
