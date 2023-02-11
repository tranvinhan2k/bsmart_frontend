import { IconButton, Stack, Tooltip } from '@mui/material';
import { IconSize, MetricSize } from '~/assets/variables';
import { SocialPayload } from '~/models';
import { openUrl } from '~/utils/window';

interface SocialBarProps {
  socials: SocialPayload[];
}
function SocialBar({ socials }: SocialBarProps) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {socials &&
        socials.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton
              onClick={() => openUrl(social.link)}
              sx={{
                height: MetricSize.large,
                width: MetricSize.large,
                padding: MetricSize.medium,
              }}
            >
              <img
                style={{ height: IconSize.small, width: IconSize.small }}
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
