import { Stack } from '@mui/material';
import {
  Color,
  Common,
  FontFamily,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import searchIcon from '~/assets/images/icons8_search_52px.png';

interface SearchBarProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}
export default function SearchBar({
  label,
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  const handleChangeText = (event: any) => {
    onChange(event.target.value);
  };
  return (
    <Stack
      sx={{
        borderRadius: Common.borderRadius,
        background: Color.semiTransparent,
        marginTop: MetricSize.large_20,
        marginBottom: MetricSize.large_20,
        flexDirection: 'row',
        height: Common.inputFieldHeight,
        width: MetricSize.halfWidth,
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChangeText}
        placeholder={label}
        style={{
          fontFamily: FontFamily.regular,
          fontSize: FontSize.small_16,
          padding: MetricSize.medium_15,
          border: 'none',
          background: Color.transparent,
          overflow: 'hidden',
          borderRadius: Common.borderRadius,
          color: Color.white,
          width: '100%',
        }}
        onSubmit={onSubmit}
      />
      <img
        style={{
          height: IconSize.small,
          width: IconSize.small,
          paddingLeft: MetricSize.medium_15,
          paddingRight: MetricSize.medium_15,
        }}
        src={searchIcon}
        alt="search icon"
      />
    </Stack>
  );
}
