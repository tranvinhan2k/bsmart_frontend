import { Box, Link, Typography } from '@mui/material';
import { ActivityResourcePayload } from '~/models/type';
import sx from './style';

interface SubActivityContentResourceProps {
  name: string;
  item: ActivityResourcePayload;
}

export default function SubActivityContentResource({
  name,
  item,
}: SubActivityContentResourceProps) {
  return (
    <>
      <Typography sx={sx.itemLabel}>Tên</Typography>
      <Typography sx={sx.itemValue}>{name}</Typography>
      <Box mt={2}>
        <Typography sx={sx.itemLabel}>Tệp đính kèm</Typography>
        <Link href={item.file.url} target="_blank" color="secondary">
          <Typography noWrap>{item.file.name}</Typography>
        </Link>
      </Box>
    </>
  );
}
