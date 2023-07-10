import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { StyleMUIType } from '~/models';

const view1: StyleMUIType = {
  paddingY: 1,
  paddingRight: 1,
  flexDirection: 'row',
  flexWrap: { xs: 'wrap', md: 'nowrap' },
  background: Color.white,
  borderRadius: MetricSize.small_10,
};
const view2: StyleMUIType = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 1,
  minHeight: '500px',
  minWidth: '1000px',
};
const view3: StyleMUIType = {
  width: `${100 / 7}%`,
};
const viewDayOfWeek: StyleMUIType = {
  justifyContent: 'center',
  alignItems: 'center',

  paddingX: 1,
  marginY: 1,
  borderRight: '1px solid #ddd',

  fontSize: FontSize.small_18,
  fontFamily: FontFamily.regular,
};
const view4: StyleMUIType = {
  '.MuiPickersToolbar-root': {
    display: 'none',
  },
  '.MuiDialogActions-root': {
    display: 'none',
  },
  '.MuiPickerStaticWrapper-content': {
    background: Color.transparent,
  },
};

const styles = {
  view1,
  view2,
  view3,
  view4,
  viewDayOfWeek,
};
export default styles;
