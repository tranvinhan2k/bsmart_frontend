import { object, string } from 'yup';
import {
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  USERNAME_REQUIRED,
} from '~/form/message';

export const validationSchemaSignIn = object({
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
});

export default {};
