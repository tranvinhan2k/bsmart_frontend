import * as yup from 'yup';

export const validationSchemaSignIn = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default {};
