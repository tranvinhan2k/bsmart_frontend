import { Stack, Breadcrumbs, Link, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingWrapper } from '~/HOCs';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import CustomBreadcrumbs from '~/components/atoms/CustomBreadcrumbs';
import { InputData } from '~/components/atoms/FormInput/InputGroup';
import DashboardBreadcrumbNavigation from '~/components/molecules/navigations/DashboardBreadcrumbNavigation';
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
  const [clearOpen, setClearOpen] = useState(false);

  const { activity, isLoading, error, refetch } =
    useGetDetailActivity(sectionId);

  const { handleTryCatch } = useTryCatch('cập nhật nội dung');
  const deleteSection = useTryCatch('xóa học phần');

  const { mutateAsync: handleDeleteContent } = useMutationDeleteContent();
  const { handleMutationUpdateSection } = useMutationUpdateContent();

  const handleClearOpen = () => {
    setClearOpen(!clearOpen);
  };
  const handleUpdateSection = async (data: {
    id: number;
    name: string;
    visible: boolean;
    authorizeClasses: string[];
  }) => {
    await handleTryCatch(async () =>
      handleMutationUpdateSection({
        id: data.id,
        params: {
          name: data.name,
          visible: data.visible,
          authorizeClasses:
            data.authorizeClasses?.map((item) => formatStringToNumber(item)) ||
            [],
          courseId,
        },
      })
    );
    await refetch();
  };

  const handleDeleteSection = async () => {
    await deleteSection.handleTryCatch(async () => {
      await handleDeleteContent(sectionId);
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
    });
    handleClearOpen();
  };

  return (
    <LoadingWrapper error={error} isLoading={isLoading}>
      <Stack>
        <CustomBreadcrumbs
          data={[
            {
              label: 'Nội dung học phần',
              link: `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`,
            },
            {
              label: `Học phần ${activity?.name}`,
              link: `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}/${sectionId}`,
            },
          ]}
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
