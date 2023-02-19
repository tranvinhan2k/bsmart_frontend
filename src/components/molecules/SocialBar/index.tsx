import { IconButton, Stack, Tooltip } from '@mui/material';
import { SX_ICON_SOCIAL_STACK, SX_LIST_SOCIAL_STACK } from './styles';
import { SocialPayload } from '~/models';
import { openUrl } from '~/utils/window';
import Icon from '~/components/atoms/Icon';

interface SocialBarProps {
  socials: SocialPayload[];
  color: 'white' | 'black';
}
function SocialBar({ socials, color }: SocialBarProps) {
  return (
    <Stack sx={SX_LIST_SOCIAL_STACK}>
      {socials &&
        socials.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton
              onClick={() => openUrl(social.link)}
              sx={SX_ICON_SOCIAL_STACK}
            >
              <Icon name={social.image} size="small" color={color} />
            </IconButton>
          </Tooltip>
        ))}
    </Stack>
  );
}

export default SocialBar;
