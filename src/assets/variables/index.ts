import { date, mixed } from 'yup';
import { CourseStatusKeys } from '~/models/variables';

export const isAllowUpdateActivity = (status: CourseStatusKeys) =>
  status === 'EDITREQUEST' ||
  status === 'REQUESTING' ||
  status === 'NOTSTART' ||
  status === 'STARTING' ||
  status === 'ENDED';

export const Color = {
  aquamarine: '#7fffd4',
  black: '#000',
  blackTransparent: '#00000000',
  blackTransparent2: '#00000080',
  blue: '#0d6efd',
  blue2: '#f0f8ff',
  blueTransparent: '#050133b3',
  brown: '#663c00',
  green: '#49cc90',
  grey: '#999',
  grey2: '#696969',
  grey3: '#0000001f',
  grey4: '#878a99',
  navy: '#1d1e22',
  navy2: '#130f40',
  neutral: '#ccc',
  tertiary: '#19A7CE',
  red: '#e74033',
  orange: '#ed6c02',
  semiTransparent: '#ffffff22',
  transparent: '#00000000',
  white: '#ffffff',
  whiteSmoke: '#f5f5f5',
  white2: '#eeeeee',
  white3: '#f9f9f9',
  white4: '#eff3f6',
  white5: '#ebebeb',
  border: '#dddddd',
};

export const BorderRadius = {
  small_5: '5px',
  small_10: '10px',
  medium_25: '25px',
  large_50: '50px',
};

export const Common = {
  inputFieldHeight: '40px',
  borderCircle: '1000px',
};

export const FontFamily = {
  regular: 'Roboto-Regular',
  light: 'Roboto-Light',
  bold: 'Roboto-Bold',
  medium: 'Roboto-Medium',
  thin: 'Roboto-Thin',
  sidebar: 'Roboto-Regular',
  title: 'Varela Round',
  dosis: 'Dosis',
};

export const FontSize = {
  small_16: 16,
  small_14: 14,
  small_18: 18,
  medium_24: 24,
  medium_28: 28,
  large_35: 35,
  large_45: 45,
  extraLarge_70: 70,
};

export const FontWeight = {
  bold: 700,
  semiBold: 600,
  medium: 500,
  normal: 400,
};

export const IconSize = {
  small: '15px',
  ex_small: '10px',
  small_20: '20px',
  medium: '30px',
  large: '35px',
  ex_large: '45px',
};

export const MetricSize = {
  centeredContainer1: 'clamp(0rem, 70vw + 10rem, 100rem)',
  small_5: '5px',
  small_10: '10px',
  medium_15: '15px',
  large_20: '20px',
  large_30: '30px',
  extraLarge_90: '90px',
  extraLarge_100: '100px',
  fullHeight: '100vh',
  fullWidth: '100vw',
  halfWidth: '50vw',
  none: 0,
  formInputHeight: '20px',
};

export const YupValidationForm = {
  startDate: date()
    .typeError('Ngày phải hợp lệ (DD/MM/YYYY)')
    .required('Ngày không được để trống'),
  endDate: (text: string, name: string) =>
    date()
      .typeError('Ngày phải hợp lệ (DD/MM/YYYY)')
      .required('Ngày không được để trống')
      .test('is-greater', text, function (endDate: Date) {
        const startDateExpected = this.parent[name];

        if (!startDateExpected || !endDate) {
          return true;
        }

        return (
          new Date(endDate).getTime() > new Date(startDateExpected).getTime()
        );
      }),
  notEmptyString: (text: string) =>
    mixed().test('required', text, (data: any) => {
      return data?.[0] !== '' && data !== '' && data?.length > 0;
    }),
};

/* Positioning */
/* Display & Box Model */
/* Color */
/* Text */
/* Other */
