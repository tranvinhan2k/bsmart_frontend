import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

export const BOX = {
  width: MetricSize.centeredContainer1,
  marginX: 'auto',
  textAlign: 'center',
  padding: '95px 0 150px',
};

export const H2 = {
  fontSize: FontSize.large_45,
  fontWeight: FontWeight.bold,
  lineHeight: '55px',
  color: Color.navy,
  marginBottom: MetricSize.large_20,
};

export const CONTAINER = {
  position: 'relative',
  textAlign: 'center',
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
};
