import { Link as MUILink, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { SX_TEXT_LINK } from '~/components/atoms/Link/styles';

interface LinkProps {
  to?: string;
  href?: string;
  children: any;
  onClick?: () => void;
}

export default function Link({
  to = undefined,
  href,
  children,
  onClick,
}: LinkProps) {
  switch (true) {
    case to !== undefined:
      return (
        <NavLink
          onClick={onClick}
          style={{ textDecoration: 'none' }}
          to={to as string}
        >
          <Typography sx={SX_TEXT_LINK}>{children}</Typography>
        </NavLink>
      );
    case href !== undefined:
      return (
        <MUILink onClick={onClick} href={href}>
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
  onClick: () => {},
};
