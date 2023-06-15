import { Box, Stack } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useManageClass } from '~/hooks/useManageClass';
import Button from '~/components/atoms/Button';
import CustomSwitch from '~/components/atoms/Switch';
import Topic from '~/components/molecules/ResourceMentor/Topic';

interface ResourceMentorMainProps {
  editMode: boolean;
}

export default function ResourceMentorMain({
  editMode,
}: ResourceMentorMainProps) {
  const id = 4;
  const { classDetails } = useManageClass({ id });

  const [expandAll, setExpandAll] = useState(false);
  const handleSetExpandAll = (event: ChangeEvent<HTMLInputElement>) => {
    setExpandAll(event.target.checked);
  };

  return (
    <>
      <Stack
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={1}
        mb={2}
      >
        <CustomSwitch
          text="Mở rộng tất cả"
          editMode={expandAll}
          handleSetEditMode={handleSetExpandAll}
        />
      </Stack>
      {classDetails &&
        classDetails.classSectionList &&
        classDetails.classSectionList.map((item) => (
          <Topic editMode={editMode} key={item.id} />
        ))}
      {/* <ResourceMentorMainItem editMode={editMode} /> */}
      {editMode && (
        <Box mt={2}>
          <Button variant="contained" color="miSmartWhite">
            Thêm tài nguyên
          </Button>
        </Box>
      )}
    </>
  );
}
