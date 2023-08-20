import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';
import SubActivityContentLesson from '../SubActivityCourseDetails/SubActivityContent/SubActivityContentLesson';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';
import { Color } from '~/assets/variables';
import SubActivityContent from '../SubActivityCourseDetails/SubActivityContent';
import RequestCourseContents from '../RequestCourseContents';
import RequestRegisterProcess from './RequestRegisterProcess';
import { ActivityPayload } from '~/models/type';

interface ManageTableDetailsCourseUpdateRequestProps {
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export interface ManageTableDetailsCourseUpdateRequestPayload {
  oldContent: ActivityPayload[];
  updateContent: ActivityPayload[];
}

export default function ManageTableDetailsCourseUpdateRequest({
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsCourseUpdateRequestProps) {
  return (
    <>
      <Box>
        <Typography sx={SX_REQUEST_TITLE}>
          Chi tiết yêu cầu cập nhật khóa học
        </Typography>
      </Box>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={2}
        rowSpacing={1}
        marginY={1}
      >
        <Grid item sm={12} md={6} lg={6}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={{
              padding: 2,
              background: Color.grey3,
            }}
          >
            <Typography sx={globalStyles.textSubTitle}>Nội dung cũ</Typography>
            <Divider />
            <RequestCourseContents
              items={[
                {
                  id: 0,
                  created: '',
                  createdBy: '',
                  lastModified: '',
                  lastModifiedBy: '',
                  name: 'Hello',
                  parentActivityId: 0,
                  subActivities: [
                    {
                      id: 0,
                      created: '',
                      createdBy: '',
                      lastModified: '',
                      lastModifiedBy: '',
                      name: 'Giới thiệu',
                      parentActivityId: 0,
                      subActivities: [],
                      type: 'LESSON',
                      visible: false,
                    },
                    {
                      id: 0,
                      created: '',
                      createdBy: '',
                      lastModified: '',
                      lastModifiedBy: '',
                      name: 'Giới thiệu',
                      parentActivityId: 0,
                      subActivities: [],
                      type: 'LESSON',
                      visible: false,
                    },
                  ],
                  type: '',
                  visible: false,
                },
              ]}
            />
          </Stack>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={{
              padding: 2,
              background: `${Color.tertiary}55`,
            }}
          >
            <Typography sx={globalStyles.textSubTitle}>Nội dung mới</Typography>
            <Divider />
            <RequestCourseContents
              items={[
                {
                  id: 0,
                  created: '',
                  createdBy: '',
                  lastModified: '',
                  lastModifiedBy: '',
                  name: 'Hello',
                  parentActivityId: 0,
                  subActivities: [
                    {
                      id: 0,
                      created: '',
                      createdBy: '',
                      lastModified: '',
                      lastModifiedBy: '',
                      name: 'Giới thiệu',
                      parentActivityId: 0,
                      subActivities: [],
                      type: 'LESSON',
                      visible: false,
                    },
                    {
                      id: 0,
                      created: '',
                      createdBy: '',
                      lastModified: '',
                      lastModifiedBy: '',
                      name: 'Giới thiệu',
                      parentActivityId: 0,
                      subActivities: [],
                      type: 'LESSON',
                      visible: false,
                    },
                  ],
                  type: '',
                  visible: false,
                },
              ]}
            />
          </Stack>
        </Grid>
      </Grid>
      <Stack marginTop={2}>
        <RequestRegisterProcess />
      </Stack>
    </>
  );
}
