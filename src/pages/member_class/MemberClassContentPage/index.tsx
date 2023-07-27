import { useContext } from 'react';
import { Stack } from '@mui/material';
import { ClassContext } from '~/HOCs/context/ClassContext';
import TextTitle from '~/components/atoms/texts/TextTitle';
import Content from '~/components/molecules/Content';
import globalStyles from '~/styles';

export default function MentorClassContentPage() {
  const { detailClass } = useContext(ClassContext);
  return (
    <Stack>
      <TextTitle title="Nội dung lớp học" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <Content sections={detailClass?.activities || []} />
      </Stack>
    </Stack>
  );
}
