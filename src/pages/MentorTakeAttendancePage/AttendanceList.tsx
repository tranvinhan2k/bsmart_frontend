/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { headerCell } from './style';
import { Color, MetricSize, FontSize, FontFamily } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { PresentStatus } from '.';

interface AttendanceListProps {
  item: any;
  index: number;
  isShowImage: boolean;
  onZoomImage: (index: number) => void;
  onSetPresent: (id: number, type: PresentStatus) => void;
  onViewDetail: () => void;
  onAddNote: (note: string, id: number) => void;
}

export default function AttendanceList({
  item,
  index,
  isShowImage,
  onSetPresent,
  onViewDetail,
  onZoomImage,
  onAddNote,
}: AttendanceListProps) {
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState(item.note);

  const handleAddNote = () => {
    setOpenNote(!note);
    if (note !== item.note) {
      onAddNote(note, item.id);
    }
  };

  return (
    <Grid
      key={item.id}
      sx={{
        alignItems: 'center',
        transition: 'background 1s, height 1s',
        borderBottom: '3px solid #eee',
        background:
          item.isPresent === 'PRESENT'
            ? `${Color.green}55`
            : item.isPresent === 'ABSENT'
            ? `${Color.red}55`
            : index % 2 === 0
            ? Color.white2
            : Color.whiteSmoke,
      }}
      container
    >
      <Grid sx={headerCell} item md={1}>
        {item.id}
      </Grid>
      <Grid sx={headerCell} item md={4}>
        <Button
          sx={{
            padding: MetricSize.medium_15,
            borderRadius: isShowImage ? MetricSize.medium_15 : 1000,
          }}
          onClick={() => onZoomImage(index)}
        >
          <Tooltip title="Nhấn để phóng to hình ảnh">
            <Box
              sx={{
                height: isShowImage ? '240px' : '50px',
                width: isShowImage ? '180px' : '50px',
                objectFit: 'fill',
                borderRadius: isShowImage ? MetricSize.medium_15 : 1000,
              }}
              component="img"
              alt="avatar"
              src={item?.image}
            />
          </Tooltip>
        </Button>
      </Grid>
      <Grid md={3}>
        <Typography
          sx={{
            marginLeft: '10px',
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.medium,
            color: Color.black,
          }}
        >
          {item.name}
        </Typography>
      </Grid>
      <Grid sx={headerCell} item md={2}>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          {openNote ? (
            <TextField
              placeholder="Ghi chú"
              value={note}
              onChange={(e: any) => setNote(e.target.value)}
            />
          ) : (
            <Typography>{`${item.note}`}</Typography>
          )}
          <IconButton onClick={handleAddNote}>
            <Icon name="edit" size="small" color="black" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid sx={headerCell} item md={2}>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Tooltip title="Điểm danh">
            <IconButton onClick={() => onSetPresent(item.id, 'PRESENT')}>
              <Icon
                name={
                  item.isPresent === 'PRESENT'
                    ? 'checkCircleFill'
                    : 'checkCircle'
                }
                color="green"
                size="medium"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Đánh vắng">
            <IconButton onClick={() => onSetPresent(item.id, 'ABSENT')}>
              <Icon
                name={item.isPresent === 'ABSENT' ? 'xCircleFill' : 'xCircle'}
                color="red"
                size="medium"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <IconButton onClick={onViewDetail}>
              <Icon name="viewDetail" color="black" size="medium" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
}
