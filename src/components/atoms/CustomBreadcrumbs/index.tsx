import { Breadcrumbs, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Color } from '~/assets/variables';
import globalStyles from '~/styles';

interface Props {
  data: { link: string; label: string }[];
}

export default function CustomBreadcrumbs({ data }: Props) {
  const navigate = useNavigate();

  return (
    <Breadcrumbs>
      {data.map((item, index) => (
        <Typography
          sx={{
            ...globalStyles.textLowSmallLight,
            ':hover': {
              color: Color.black,
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
          key={index}
          onClick={() => navigate(item.link)}
        >
          {item.label}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}
