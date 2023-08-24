import { Stack, Box, Typography } from '@mui/material';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { Color, MetricSize } from '~/assets/variables';
import { image } from '~/constants/image';
import globalStyles from '~/styles';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import ClassItem from '~/components/molecules/items/ClassItem';
import toast from '~/utils/toast';

interface Props {
  classes: DetailCourseClassPayload[] | undefined;
  onOpenUpdateModal?: (index: number) => void;
  onOpenAddModal?: () => void;
  onDeleteModal?: (id: number) => void;
}
export default function Classes({
  classes,
  onOpenAddModal,
  onOpenUpdateModal,
  onDeleteModal,
}: Props) {
  const handleUpdate = (index: number) => {
    if (onOpenUpdateModal) {
      onOpenUpdateModal(index);
    }
  };

  const handleDelete = (index: number) => {
    if (onDeleteModal) {
      onDeleteModal(index);
    }
  };

  return (
    <Stack
      marginBottom={2}
      sx={{
        borderRadius: MetricSize.small_5,
      }}
    >
      {classes && classes?.length > 0 ? (
        <>
          {classes?.map((item, index) => (
            <Stack key={item.id} marginTop={index === 0 ? 0 : 1}>
              <ClassItem
                status={item.status}
                price={item.price}
                id={index}
                onUpdate={
                  item.status === 'EDITREQUEST' || item.status === 'REQUESTING'
                    ? () => handleUpdate(item.id)
                    : undefined
                }
                onDeleteModal={
                  item.status === 'EDITREQUEST' || item.status === 'REQUESTING'
                    ? () => handleDelete(item.id)
                    : undefined
                }
                code={item.code}
                endDate={item.endDate}
                imageUrl={item.imageUrl}
                maxStudent={item.maxStudent}
                minStudent={item.minStudent}
                startDate={item.startDate}
                timetable={item.timeInWeekRequests}
              />
            </Stack>
          ))}
          {onOpenAddModal && (
            <Box marginTop={1}>
              <Button
                onClick={onOpenAddModal}
                variant="contained"
                color="secondary"
                sx={{
                  color: Color.white,
                }}
                startIcon={<Icon name="add" size="small_20" color="white" />}
              >
                Thêm lớp học
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Stack
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            alt="no class"
            src={image.no_classes}
            sx={{
              width: '20%',
              objectFit: 'contain',
            }}
          />
          <Typography sx={globalStyles.textSubTitle}>
            Chưa có lớp học nào.
          </Typography>
          <Typography sx={globalStyles.textLowSmallLight}>
            Bạn không thể thêm khóa học nếu không có lớp học nào. Tạo lớp học
            ngay.
          </Typography>
          <Box marginTop={2}>
            {onOpenAddModal && (
              <Button
                onClick={onOpenAddModal}
                variant="contained"
                color="secondary"
                sx={{
                  color: Color.white,
                }}
                startIcon={<Icon name="add" size="small_20" color="white" />}
              >
                Thêm lớp học
              </Button>
            )}
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
