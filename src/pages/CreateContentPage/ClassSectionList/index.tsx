import { Box, Stack, Typography, IconButton, Tooltip } from '@mui/material';

import { image } from '~/constants/image';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import CreateSectionModule from '../CreateSectionModule';
import { SectionProps } from '~/models/section';

interface ClassSectionListProps {
  content: SectionProps[] | undefined;
  onAddNew: (id: number, name: string) => void;
}

export default function ClassSectionList({
  content,
  onAddNew,
}: ClassSectionListProps) {
  if (content === undefined || content.length === 0) {
    return (
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: MetricSize.large_20,
        }}
      >
        <Box
          component="img"
          alt="no section"
          src={image.emptyCourseList}
          sx={{
            height: '200px',
            width: '200px',
            objectFit: 'contain',
          }}
        />
        <Typography>Danh sách học phần đang trống .</Typography>
      </Stack>
    );
  }

  const handleAddNew = (id: number, name: string) => {
    onAddNew(id, name);
  };

  console.log(content);

  return (
    <Stack>
      {content.map((item) => (
        <Stack
          sx={{ marginTop: 1, padding: 2, background: '#ddd' }}
          key={item.id}
        >
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
              >{`Học phần ${item.id + 1}: `}</span>
              {item.name}
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
                <IconButton onClick={() => {}}>
                  <Icon name="edit" color="black" size="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa học phần">
                <IconButton onClick={() => {}}>
                  <Icon name="delete" color="black" size="small" />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Thêm học phần">
                <Button>
                  <Icon name="add" size="small_20" color="black" />
                  Thêm nội dung học phần
                </Button>
              </Tooltip> */}
            </Stack>
          </Stack>
          <Stack sx={{ marginTop: 1, paddingLeft: 1 }}>
            {item.modules.map((module) => (
              <Stack
                sx={{
                  borderRadius: MetricSize.small_5,
                  padding: 2,
                  background: Color.white,
                  marginTop: 1,
                }}
                key={module.id}
              >
                <Stack
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>
                    <span style={{ fontFamily: FontFamily.bold }}>
                      {`Bài học ${module.id + 1}: `}
                    </span>
                    {module.name}
                  </Typography>
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Tooltip title="Chỉnh sửa học phần">
                      <IconButton onClick={() => {}}>
                        <Icon name="edit" color="black" size="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa học phần">
                      <IconButton onClick={() => {}}>
                        <Icon name="delete" color="black" size="small" />
                      </IconButton>
                    </Tooltip>
                    <Button>
                      <Icon name="add" size="small_20" color="black" />
                      Thêm nội dung bài học
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Box sx={{ marginTop: 1, paddingLeft: 1 }}>
            <CreateSectionModule id={item.id} onAddNew={handleAddNew} />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
