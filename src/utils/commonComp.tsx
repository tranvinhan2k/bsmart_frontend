import { IconButton, Typography } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import toast from '~/utils/toast';
import { SX_DATAGRID_CELL_TEXT } from '~/styles';

export const handleDefinedTextReturnComp = (
  text: string | number | undefined
) => {
  if (text) return text;
  if (text === undefined) return <b style={{ color: 'red' }}>Không tồn tại</b>;
  return <b style={{ color: 'red' }}>Xảy ra lỗi</b>;
};

export const handleCopyToClipboard = (text: string | number) => {
  navigator.clipboard.writeText(String(text));
  toast.copyText(`Đã sao chép: ${text}`);
};

interface CopyableCellProps {
  rawValue: string | number | undefined;
  formattedValue: string | number;
}

export function CopyableCell({ rawValue, formattedValue }: CopyableCellProps) {
  if (rawValue) {
    return (
      <>
        <IconButton
          size="small"
          onClick={() => handleCopyToClipboard(rawValue)}
        >
          <Icon name="contentCopyIcon" size="small_20" color="blue" />
        </IconButton>
        <Typography sx={SX_DATAGRID_CELL_TEXT}>{formattedValue}</Typography>
      </>
    );
  }
  if (rawValue === undefined) {
    return (
      <Typography sx={SX_DATAGRID_CELL_TEXT} style={{ color: 'red' }}>
        {formattedValue}
      </Typography>
    );
  }
  return (
    <Typography sx={SX_DATAGRID_CELL_TEXT} style={{ color: 'red' }}>
      {formattedValue}
    </Typography>
  );
}
