import { Link, Typography } from '@mui/material';
import { useState } from 'react';
import { ActivityLessonPayload } from '~/models/type';
import { SubActivityType, SubActivityTypeLabel } from '~/constants/activity';
import CustomDialog from '~/components/atoms/CustomDialog';
import globalStyles from '~/styles';
import SubActivityHeader from '../SubActivityHeader';

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
        title={`${SubActivityTypeLabel.LESSON} '${name}'`}
        onClose={handleTriggerDialog}
        open={open}
      >
        <Typography
          sx={globalStyles.textSmallLight}
          dangerouslySetInnerHTML={{
            __html: item.description,
          }}
        />
      </CustomDialog>
    </>
  );
}
