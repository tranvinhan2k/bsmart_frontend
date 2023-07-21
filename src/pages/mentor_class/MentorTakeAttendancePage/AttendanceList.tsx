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
import { PresentStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';

interface AttendanceListProps {
  item: any;
  index: number;
  isShowImage: boolean;
  onZoomImage: (index: number) => void;
  onSetPresent: (id: number, type: PresentStatusKeys) => void;
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
    setOpenNote(!openNote);
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
        borderBottom: '0.5px solid #ddd',
        background:
          item.isPresent === 'PRESENT'
            ? `${Color.tertiary}22`
            : item.isPresent === 'ABSENT'
            ? `${Color.red}22`
            : Color.white3,
      }}
      container
    >
      <Grid item xs={1}>
        <Typography padding={2} sx={globalStyles.textLowSmallLight}>
          {item.id}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Button
          sx={{
            padding: 1,
            borderRadius: isShowImage ? MetricSize.small_5 : 1000,
          }}
          onClick={() => onZoomImage(index)}
        >
          <Tooltip title="Nhấn để phóng to hình ảnh">
            <Box
              sx={{
                height: isShowImage ? '120px' : '50px',
                width: undefined,
                aspectRatio: 3 / 4,
                objectFit: 'fill',
                borderRadius: isShowImage ? MetricSize.small_5 : 1000,
              }}
              component="img"
              alt="avatar"
              src={item?.image}
            />
          </Tooltip>
        </Button>
      </Grid>
      <Grid xs={3}>
        <Typography
          sx={{
            paddingX: 2,
            fontSize: FontSize.small_16,
            fontFamily: FontFamily.regular,
            color: Color.black,
          }}
        >
          {item.name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Stack
          sx={{
            paddingX: 2,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Stack
            sx={{
              padding: MetricSize.small_10,
              overflowX: 'hidden',
              height: '100%',
            }}
          >
            {openNote ? (
              <TextField
                sx={{ background: Color.white }}
                placeholder="Ghi chú"
                rows={5}
                multiline
                value={note}
                onChange={(e: any) => setNote(e.target.value)}
              />
            ) : (
              <Typography
                sx={{
                  wordBreak: 'break-all',
                }}
              >{`${item.note}`}</Typography>
            )}
          </Stack>
          <IconButton onClick={handleAddNote}>
            <Icon name="edit" size="small" color="black" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={2}>
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
                color="tertiary"
                size="small_20"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Đánh vắng">
            <IconButton onClick={() => onSetPresent(item.id, 'ABSENT')}>
              <Icon
                name={item.isPresent === 'ABSENT' ? 'xCircleFill' : 'xCircle'}
                color="red"
                size="small_20"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <IconButton onClick={onViewDetail}>
              <Icon name="viewDetail" color="black" size="small_20" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
}
