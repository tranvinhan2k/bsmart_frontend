import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Icon from '../Icon';
import { CourseContext } from '~/HOCs/context/CourseContext';

interface Props {
  sectionId?: number;
  to?: string;
}

export default function ReturnLink({ sectionId, to }: Props) {
  const { onScrollToComponent } = useContext(CourseContext);
  console.log('section return o ngoai', sectionId);

  const navigate = useNavigate();

  const handleGoBack = () => {
    console.log('sectionId return link', sectionId);

    if (sectionId) {
      console.log('j z ta', sectionId);

      if (onScrollToComponent) {
        onScrollToComponent(sectionId);
      }
    }

    // if (to) {
    //   navigate(to, { state: { id: 0, name: '/' } });
    // } else {
    //   navigate(-1);
    // }
  };

  return (
    <Box sx={{ marginBottom: 1 }}>
      <Button
        onClick={handleGoBack}
        variant="text"
        startIcon={<Icon name="left" size="small" color="navy" />}
      >
        Trở lại
      </Button>
    </Box>
  );
}
