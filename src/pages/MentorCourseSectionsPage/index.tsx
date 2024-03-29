import { Stack, Typography, Divider } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingWrapper } from '~/HOCs';
import { CourseContext } from '~/HOCs/context/CourseContext';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import ReturnLink from '~/components/atoms/ReturnLink';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import UpdateSectionForm from '~/containers/MentorCourseDetailSection/UpdateSectionForm';
import {
  useGetDetailActivity,
  useGetIdFromUrl,
  useMutationDeleteContent,
  useMutationUpdateContent,
  useTryCatch,
} from '~/hooks';
import globalStyles from '~/styles';
import { formatStringToNumber } from '~/utils/number';

export default function MentorCourseSectionsPage() {
  const navigate = useNavigate();
  const courseId = useGetIdFromUrl('id');
  const sectionId = useGetIdFromUrl('sectionId');

  const { refetchPercent, course, refetchContent } = useContext(CourseContext);
  const [clearOpen, setClearOpen] = useState(false);

  const { activity, isLoading, error } = useGetDetailActivity(sectionId);

  const { handleTryCatch } = useTryCatch('cập nhật nội dung');
  const deleteSection = useTryCatch('xóa học phần');

  const { mutateAsync: handleDeleteContent } = useMutationDeleteContent();
  const { handleMutationUpdateSection } = useMutationUpdateContent(
    course.status
  );

  const handleClearOpen = () => {
    setClearOpen(!clearOpen);
  };
  const handleUpdateSection = async (data: {
    id: number;
    name: string;
    visible: boolean;
    authorizeClasses: string[];
  }) => {
    await handleTryCatch(async () => {
      await handleMutationUpdateSection({
        id: data.id,
        params: {
          name: data.name,
          visible: data.visible,
          authorizeClasses:
            data.authorizeClasses?.map((item) => formatStringToNumber(item)) ||
            [],
          courseId,
        },
      });
      await refetchContent();
      navigate(-1);
    });
  };

  const handleDeleteSection = async () => {
    await deleteSection.handleTryCatch(async () => {
      await handleDeleteContent(sectionId);
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
      await refetchPercent();
      await refetchContent();
      handleClearOpen();
    });
  };

  return (
    <LoadingWrapper error={error} isLoading={isLoading}>
      <Stack>
        <ReturnLink
          to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`}
        />
        <Stack>
          <Typography sx={globalStyles.textSubTitle}>
            Nội dung học phần
          </Typography>
          <Divider />
          <UpdateSectionForm
            onSubmit={handleUpdateSection}
            section={activity}
            onDelete={handleClearOpen}
          />
          <ConfirmDialog
            open={clearOpen}
            title="Xác nhận xóa học phần"
            content="Bạn có chắc xóa học phần này ?"
            handleAccept={handleDeleteSection}
            handleClose={handleClearOpen}
          />
        </Stack>
      </Stack>
    </LoadingWrapper>
  );
}
