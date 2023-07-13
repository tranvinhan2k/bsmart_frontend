import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Icon, { IconName } from '../../Icon';
import { Color, MetricSize, FontSize, FontFamily } from '~/assets/variables';

interface Props {
  link: string;
  name: string;
  icon: IconName;
  isHide?: boolean | undefined;
  isActive: boolean;
}

export default function DashboardNavigationTabs({
  icon,
  isActive,
  link,
  name,
  isHide = false,
}: Props) {
  const navigate = useNavigate();
  if (isHide) return null;
  return (
    <Stack
      onClick={() => navigate(link)}
      sx={{
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        background: isActive ? Color.grey3 : 'none',
        paddingY: 2,
        paddingX: 2,
        borderTopRightRadius: MetricSize.small_5,
        borderBottomRightRadius: MetricSize.small_5,
        transition: 'all 500ms ease',
        fontSize: FontSize.small_14,
        fontFamily: FontFamily.light,
        color: isActive ? Color.black : Color.grey,
        ':hover': {
          background: Color.whiteSmoke,
          cursor: 'pointer',
        },
      }}
    >
      <Stack marginRight={1}>
        <Icon name={icon} size="small" color={isActive ? 'black' : 'grey'} />
      </Stack>
      {name}
    </Stack>
  );
}
