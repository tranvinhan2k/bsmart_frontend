import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ActivityAssignmentPayload } from '~/models/type';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { SubActivityType, SubActivityTypeLabel } from '~/constants/activity';
import CustomDialog from '~/components/atoms/CustomDialog';
import globalStyles from '~/styles';
import Icon, { IconName } from '~/components/atoms/Icon';
import SubActivityHeader from '../SubActivityHeader';
import sx from './style';

interface SubActivityContentAssignmentProps {
  name: string;
  item: ActivityAssignmentPayload;
}

interface DisplayListProps {
  id: number;
  iconName: IconName;
  label: string;
  value: string | number;
}

export default function SubActivityContentAssignment({
  name,
  item,
}: SubActivityContentAssignmentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  const displayList: DisplayListProps[] = [
    {
      id: 0,
      iconName: 'accessTimeIcon',
      label: 'Thời gian bắt đầu',
      value: formatISODateDateToDisplayDateTime(item.startDate),
    },
    {
      id: 1,
      iconName: 'accessTimeIcon',
      label: 'Thời gian kết thúc',
      value: formatISODateDateToDisplayDateTime(item.endDate),
    },
    {
      id: 2,
      iconName: 'historyIcon',
      label: 'Thời gian được chỉnh sửa (phút)',
      value: item.editBeForSubmitMin ?? '',
    },
    {
      id: 3,
      iconName: 'description',
      label: 'Số lượng tệp cho phép',
      value: item.maxFileSubmit ?? '',
    },
    {
      id: 4,
      iconName: 'sdStorageIcon',
      label: 'Dung Lượng tệp cho phép (MB)',
      value: item.maxFileSize ?? '',
    },
    {
      id: 5,
      iconName: 'gradingIcon',
      label: 'Điểm đạt yêu cầu',
      value: item.passPoint ?? '',
    },
  ];

  const attachFiles = item.attachFiles ?? [];

  return (
    <>
      <SubActivityHeader type={SubActivityType.ASSIGNMENT} />
      <Link href="#assignment" underline="hover" onClick={handleTriggerDialog}>
        {name}
      </Link>
      <CustomDialog
        title={`${SubActivityTypeLabel.ASSIGNMENT} '${name}'`}
        onClose={handleTriggerDialog}
        open={open}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Box>
            <Typography sx={sx.itemLabel}>Mô tả</Typography>
            <Typography
              sx={globalStyles.textSmallLight}
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            />
          </Box>
          <Box>
            <Grid container spacing={2}>
              {displayList.map((display) => (
                <Grid item xs={6} key={display.id}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1.5}
                  >
                    <Box>
                      <Icon name={display.iconName} size="small_20" />
                    </Box>
                    {/* <Typography sx={sx.itemLabel}>{display.label}</Typography> */}
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography sx={sx.itemLabel}>{display.label}</Typography>
                      <Typography sx={sx.itemValue}>{display.value}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box>
            <Typography sx={sx.itemLabel}>Tài liệu đính kèm</Typography>
            <Grid container spacing={2}>
              {attachFiles.map((file, index: number) => (
                <Grid item xs={12} key={file.url}>
                  <Link href={file.url} target="_blank">
                    <Typography noWrap>
                      {index + 1}. {file.name}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </CustomDialog>
    </>
  );
}
