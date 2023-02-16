import { Link as MUILink, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { SX_TEXT_LINK } from '~/components/atoms/Link/styles';

interface LinkProps {
  to?: string;
  href?: string;
  children: any;
}

export default function Link({ to = undefined, href, children }: LinkProps) {
  switch (true) {
    case to !== undefined:
      return (
        <NavLink style={{ textDecoration: 'none' }} to={to as string}>
          <Typography sx={SX_TEXT_LINK}>{children}</Typography>
        </NavLink>
      );
    case href !== undefined:
      return (
        <MUILink href={href}>
          <Typography sx={SX_TEXT_LINK}>{children}</Typography>
        </MUILink>
      );
    default:
      return null;
  }
}

Link.defaultProps = {
  to: undefined,
  href: undefined,
};
