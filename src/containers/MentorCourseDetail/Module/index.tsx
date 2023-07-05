import {
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Collapse,
} from '@mui/material';
import { useState } from 'react';
import { MetricSize, Color, FontFamily } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import UpdateModuleForm from '../UpdateModuleForm';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';

interface Props {
  module: any;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function Module({ module, onDelete, onUpdate }: Props) {
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
    <Stack
      sx={{
        marginBottom: 1,
        borderRadius: MetricSize.small_5,
        paddingY: 1,
        paddingX: 2,
        background: Color.white,
      }}
      key={module.id}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: fixOpen ? 'flex-start' : 'center',
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Collapse in={!fixOpen}>
            <Typography>
              <span style={{ fontFamily: FontFamily.bold }}>
                {`Bài học ${module.id + 1}: `}
              </span>
              {module.name}
            </Typography>
          </Collapse>
          <Collapse in={fixOpen}>
            <UpdateModuleForm module={module} onSubmit={handleUpdate} />
          </Collapse>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="Chỉnh sửa học phần">
            <IconButton onClick={handleFixOpen}>
              <Icon
                name={fixOpen ? 'close' : 'edit'}
                color="black"
                size="small"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa học phần">
            <IconButton onClick={handleClearOpen}>
              <Icon name="delete" color="black" size="small" />
            </IconButton>
          </Tooltip>
          {/* <Button>
        <Icon name="add" size="small_20" color="black" />
        Thêm nội dung bài học
      </Button> */}
        </Stack>
      </Stack>
      <ConfirmDialog
        open={clearOpen}
        title="Xác nhận xóa khóa học"
        content="Bạn có chắc xóa khóa học này ?"
        handleAccept={handleDelete}
        handleClose={handleClearOpen}
      />
    </Stack>
  );
}
