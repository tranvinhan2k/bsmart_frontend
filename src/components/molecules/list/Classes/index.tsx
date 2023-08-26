import { Stack, Box, Typography } from '@mui/material';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { Color, MetricSize } from '~/assets/variables';
import { image } from '~/constants/image';
import globalStyles from '~/styles';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import ClassItem from '~/components/molecules/items/ClassItem';
import toast from '~/utils/toast';
import { LoadingWrapper } from '~/HOCs';

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
      <LoadingWrapper isEmptyCourse={classes?.length === 0}>
        <Stack>
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
                numberOfStudent={item.numberOfStudent}
                startDate={item.startDate}
                timetable={item.timeInWeekRequests}
              />
            </Stack>
          ))}
        </Stack>
      </LoadingWrapper>
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
    </Stack>
  );
}
