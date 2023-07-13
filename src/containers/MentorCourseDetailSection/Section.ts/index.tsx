import { useState } from 'react';

import {
  Stack,
  Collapse,
  Typography,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';
import UpdateSectionForm from '../UpdateSectionForm';
import Icon from '~/components/atoms/Icon';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';

interface Props {
  index: number;
  section: any;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function Section({ index, section, onDelete, onUpdate }: Props) {
  const [fixOpen, setFixOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  const handleFixOpen = () => {
    setFixOpen(!fixOpen);
  };

  const handleClearOpen = () => {
    setClearOpen(!clearOpen);
  };

  const handleUpdate = async () => {
    await onUpdate();
    handleFixOpen();
  };

  const handleDelete = async () => {
    await onDelete();
    handleClearOpen();
  };

  return (
    <Stack>
      <Collapse in={!fixOpen}>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>
            <span
              style={{
                fontFamily: FontFamily.bold,
                fontSize: FontSize.small_16,
              }}
            >{`Học phần ${index + 1}: `}</span>
            {section.name}
          </Typography>

          <Stack
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Tooltip title="Chỉnh sửa học phần">
              <IconButton onClick={handleFixOpen}>
                <Icon name="edit" color="black" size="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa học phần">
              <IconButton onClick={handleClearOpen}>
                <Icon name="delete" color="black" size="small" />
              </IconButton>
            </Tooltip>
            {/* // TODO: Nếu có thêm nội dung thì xài cái này */}
            {/* <Tooltip title="Thêm học phần">
                <Button>
                  <Icon name="add" size="small_20" color="black" />
                  Thêm nội dung học phần
                </Button>
              </Tooltip> */}
          </Stack>
        </Stack>
      </Collapse>
      <Collapse in={fixOpen}>
        <Stack
          sx={{
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <IconButton onClick={handleFixOpen}>
              <Icon name="close" size="small" color="black" />
            </IconButton>
          </Box>

          <UpdateSectionForm section={section} onSubmit={handleUpdate} />
        </Stack>
      </Collapse>
      <ConfirmDialog
        open={clearOpen}
        title="Xác nhận xóa học phần"
        content="Bạn có chắc xóa học phần này ?"
        handleAccept={handleDelete}
        handleClose={handleClearOpen}
      />
    </Stack>
  );
}
