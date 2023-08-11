import { Box, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { ActivityLessonPayload } from '~/models/type';
import { SubActivityType, SubActivityTypeLabel } from '~/constants/activity';
import CustomDialog from '~/components/atoms/CustomDialog';
import SubActivityHeader from '../SubActivityHeader';
import sx from './style';

interface SubActivityContentLessonProps {
  name: string;
  item: ActivityLessonPayload;
}

export default function SubActivityContentLesson({
  name,
  item,
}: SubActivityContentLessonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  return (
    <>
      <SubActivityHeader type={SubActivityType.LESSON} />
      <Link href="#lesson" underline="hover" onClick={handleTriggerDialog}>
        {name}
      </Link>
      <CustomDialog
        title={`${SubActivityTypeLabel.LESSON}`}
        onClose={handleTriggerDialog}
        open={open}
      >
        <>
          <Typography sx={sx.itemLabel}>Tên</Typography>
          <Typography sx={sx.itemValue}>{name}</Typography>
          <Box mt={2}>
            <Typography sx={sx.itemLabel}>Mô tả</Typography>
            <Typography
              sx={sx.itemValue}
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            />
          </Box>
        </>
      </CustomDialog>
    </>
  );
}
