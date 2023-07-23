import { Stack, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Color, FontSize, FontFamily, IconSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import {
  NavigationLink,
  MentorDashboardNavigationActionLink,
} from '~/constants/routeLink';

interface Props {
  classCode: string;
  courseName: string;
  onReturnClassList: () => void;
  onCloseDrawerMenu: () => void;
}

export default function ClassHeader({
  classCode,
  courseName,
  onCloseDrawerMenu,
  onReturnClassList,
}: Props) {
  return (
    <Stack
      sx={{
        background: Color.black,
        paddingY: 2,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <IconButton
        sx={{
          transition: 'all 500ms ease',
          marginX: 2,
          width: '23px',
          height: '23px',
          ':hover': {
            background: Color.tertiary,
          },
        }}
        onClick={onReturnClassList}
      >
        <Icon name="left" size="small_20" color="white" />
      </IconButton>
      <Typography
        noWrap
        sx={{
          flexGrow: 1,
          fontSize: FontSize.small_18,
          fontFamily: FontFamily.regular,
          color: Color.white,
        }}
      >
        {`Lớp học #${classCode} - `}
        <span
          style={{
            color: Color.grey,
            fontFamily: FontFamily.light,
          }}
        >
          {courseName}
        </span>
      </Typography>
      <IconButton
        sx={{
          display: { xs: 'flex', md: 'none' },
        }}
        onClick={onCloseDrawerMenu}
      >
        <Icon name="menu" size="large" color="white" />
      </IconButton>
    </Stack>
  );
}
