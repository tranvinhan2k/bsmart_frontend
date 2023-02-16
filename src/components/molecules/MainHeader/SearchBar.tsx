import { Stack } from '@mui/material';
import {
  Colors,
  Common,
  FontFamilies,
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
        background: Colors.semiTransparent,
        marginTop: MetricSize.large,
        marginBottom: MetricSize.large,
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
          fontFamily: FontFamilies.regular,
          fontSize: FontSize.small,
          padding: MetricSize.medium,
          border: 'none',
          background: Colors.transparent,
          overflow: 'hidden',
          borderRadius: Common.borderRadius,
          color: Colors.white,
          width: '100%',
        }}
        onSubmit={onSubmit}
      />
      <img
        style={{
          height: IconSize.small,
          width: IconSize.small,
          paddingLeft: MetricSize.medium,
          paddingRight: MetricSize.medium,
        }}
        src={searchIcon}
        alt="search icon"
      />
    </Stack>
  );
}
