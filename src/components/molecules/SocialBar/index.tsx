import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { SX_ICON_SOCIAL_STACK, SX_IMAGE, SX_LIST_SOCIAL_STACK } from './styles';
import { SocialPayload } from '~/models';
import { openUrl } from '~/utils/window';

interface SocialBarProps {
  socials: SocialPayload[];
}
function SocialBar({ socials }: SocialBarProps) {
  return (
    <Stack sx={SX_LIST_SOCIAL_STACK}>
      {socials &&
        socials.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton
              onClick={() => openUrl(social.link)}
              sx={SX_ICON_SOCIAL_STACK}
            >
              <Box
                component="img"
                sx={SX_IMAGE}
                src={social.image}
                alt={social.name}
              />
            </IconButton>
          </Tooltip>
        ))}
    </Stack>
  );
}

export default SocialBar;
