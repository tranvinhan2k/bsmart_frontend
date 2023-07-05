import { Box, Stack, Typography } from '@mui/material';
import CustomCarousel from '~/components/molecules/CustomCarousel';
import { image } from '~/constants/image';
import globalStyles from '~/styles';

import PublicCourseItem from '../PublicCourseItem';

export interface PublicCourseTabProps {
  publicCourses: any;
  selectedCourse: any;
  onChangeCourse: (item: any) => void;
}

export default function PublicCourseTab({
  publicCourses,
  selectedCourse,
  onChangeCourse,
}: PublicCourseTabProps) {
  const renderItem = (item: any) => {
    const isSelected = selectedCourse?.id === item?.id;

    return (
      <PublicCourseItem
        item={item}
        isSelected={isSelected}
        onSelectedItem={() => {
          onChangeCourse(item);
        }}
      />
    );
  };

  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Khóa học cộng đồng</Typography>
      <Typography sx={globalStyles.textLowSmallLight}>
        Khóa học cộng đồng là những khóa học do trung tâm tạo sẵn. Đã có sẵn
        giáo trình học và nội dung giảng dạy. Giáo viên chỉ cần thêm giờ học của
        mình.
      </Typography>
      {publicCourses?.length > 0 ? (
        <CustomCarousel
          label="Chọn khóa học có sẵn"
          items={publicCourses || []}
          renderItem={renderItem}
        />
      ) : (
        <Stack>
          <Box
            sx={{
              alignSelf: 'center',
              width: '20%',
              objectFit: 'contain',
            }}
            component="img"
            alt="no course"
            src={image.emptyCourseList}
          />
          <Typography textAlign="center">
            Không có khóa học cộng đồng nào.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
