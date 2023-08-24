import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestEditBasicInfo from './RequestEdit/RequestEditBasicInfo';
import RequestEditDegree from './RequestEdit/RequestEditDegree';
import RequestEditIdentity from './RequestEdit/RequestEditIdentity';
import RequestEditSkill from './RequestEdit/RequestEditSkill';
import RequestUpdateProcess from './RequestEditProcess';
import RequestOriginBasicInfo from './RequestOrigin/RequestOriginBasicInfo';
import RequestOriginDegree from './RequestOrigin/RequestOriginDegree';
import RequestOriginIdentity from './RequestOrigin/RequestOriginIdentity';
import RequestOriginSkill from './RequestOrigin/RequestOriginSkill';
import RequestUpdateMentorDetailsProcess from './RequestUpdateMentorDetailsProcess';
import { SX_FORM_LABEL, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsUpdateMentorProfileRequestProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsUpdateMentorProfileRequest({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsUpdateMentorProfileRequestProps) {
  const enum Text {
    mainTitle = 'Chi tiết yêu cầu cập nhật hồ sơ giáo viên',
  }

  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>{Text.mainTitle}</Typography>
      </Box>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={2}
        rowSpacing={1}
        p={2}
      >
        <Grid item sm={12} md={12} lg={6}>
          <Typography sx={SX_FORM_LABEL} align="center">
            Bản đang sử dụng
          </Typography>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            mt={1}
          >
            <RequestOriginBasicInfo rowId={row.id} />
            <RequestOriginIdentity rowId={row.id} />
            <RequestOriginDegree rowId={row.id} />
            <RequestOriginSkill rowId={row.id} />
          </Stack>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Typography sx={SX_FORM_LABEL} align="center">
            Bản chỉnh sửa
          </Typography>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            mt={1}
          >
            <RequestEditBasicInfo rowId={row.id} />
            <RequestEditIdentity rowId={row.id} />
            <RequestEditDegree rowId={row.id} />
            <RequestEditSkill rowId={row.id} />
            <RequestUpdateProcess
              idMentorProfile={row.id}
              onClose={onClose}
              refetchSearch={refetchSearch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
