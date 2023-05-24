import { Box } from '@mui/material';
import Topic from '~/components/molecules/ResourceMentor/Topic';
import Button from '~/components/atoms/Button';

interface ResourceMentorMainProps {
  editMode: boolean;
}

export default function ResourceMentorMain({
  editMode,
}: ResourceMentorMainProps) {
  return (
    <>
      <Topic editMode={editMode} />
      <Topic editMode={editMode} />
      {/* <ResourceMentorMainItem editMode={editMode} /> */}
      {editMode && (
        <Box mt={2}>
          <Button variant="outlined">Thêm tài nguyên</Button>
        </Box>
      )}
    </>
  );
}
