import { Role } from './role';
import { ClassStatusKeys, CourseStatusKeys } from './variables';

export type RoutePayload = {
  path: string;
  main: () => JSX.Element;
  role: Role[];
  classStatus?: ClassStatusKeys;
  courseStatus?: CourseStatusKeys;
};
