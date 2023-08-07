import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import toast from '~/utils/toast';
import {
  SX_DATAGRID_CELL_TEXT,
  SX_DATAGRID_CELL_TEXT_ELLIPSIS,
} from '~/styles';

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
        <Tooltip title="Sao chép">
          <IconButton
            size="small"
            onClick={() => handleCopyToClipboard(rawValue)}
          >
            <Icon name="contentCopyIcon" size="small_20" color="blue" />
          </IconButton>
        </Tooltip>
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
export function CopyableCellEllipsis({
  rawValue,
  formattedValue,
}: CopyableCellProps) {
  if (rawValue) {
    return (
      <>
        <Tooltip title="Sao chép">
          <IconButton
            size="small"
            onClick={() => handleCopyToClipboard(rawValue)}
          >
            <Icon name="contentCopyIcon" size="small_20" color="blue" />
          </IconButton>
        </Tooltip>
        <Typography sx={SX_DATAGRID_CELL_TEXT_ELLIPSIS}>
          {formattedValue}
        </Typography>
      </>
    );
  }
  if (rawValue === undefined) {
    return (
      <Typography sx={SX_DATAGRID_CELL_TEXT_ELLIPSIS} style={{ color: 'red' }}>
        {formattedValue}
      </Typography>
    );
  }
  return (
    <Typography sx={SX_DATAGRID_CELL_TEXT_ELLIPSIS} style={{ color: 'red' }}>
      {formattedValue}
    </Typography>
  );
}

interface IsVerifiedCellProps {
  isVerified: boolean;
}
export function IsVerifiedIconCell({ isVerified }: IsVerifiedCellProps) {
  switch (isVerified) {
    case true:
      return <Icon name="check" size="small_20" color="green" />;
    case false:
      return <Icon name="cancelIcon" size="small_20" color="red" />;
    default:
      return <Icon name="cancelIcon" size="small_20" color="red" />;
  }
}
export function IsVerifiedCell({ isVerified }: IsVerifiedCellProps) {
  let result = null;
  switch (isVerified) {
    case true:
      result = (
        <>
          <Icon name="dot" size="small" color="green" />
          <Typography fontSize={14}>Xác thực</Typography>
        </>
      );
      break;
    case false:
      result = (
        <>
          <Icon name="dot" size="small" color="red" />
          <Typography fontSize={14}>Đang chờ</Typography>
        </>
      );
      break;
    default:
      result = (
        <>
          <Icon name="dot" size="small" color="red" />
          <Typography fontSize={14}>Chưa xác thực</Typography>
        </>
      );
      break;
  }
  return (
    <div title="World Health Organization">
      <Stack direction="row" alignItems="center" gap={1}>
        {result}
      </Stack>
    </div>
  );
}

export function IsApprovedCourseCell({ isVerified }: IsVerifiedCellProps) {
  let result = null;
  switch (isVerified) {
    case true:
      result = (
        <>
          <Icon name="dot" size="small" color="green" />
          <Typography fontSize={14}>Xác thực</Typography>
        </>
      );
      break;
    case false:
      result = (
        <>
          <Icon name="dot" size="small" color="red" />
          <Typography fontSize={14}>Đang chờ</Typography>
        </>
      );
      break;
    default:
      result = (
        <>
          <Icon name="dot" size="small" color="red" />
          <Typography fontSize={14}>Chưa xác thực</Typography>
        </>
      );
      break;
  }
  return (
    <div title="World Health Organization">
      <Stack direction="row" alignItems="center" gap={1}>
        {result}
      </Stack>
    </div>
  );
}
