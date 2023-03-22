import { Role } from './role';

export interface RoutePayload {
  path: string;
  main: () => JSX.Element;
  role?: Role;
}
