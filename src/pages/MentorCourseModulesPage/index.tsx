import { Stack, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoadingWrapper } from '~/HOCs';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import CustomBreadcrumbs from '~/components/atoms/CustomBreadcrumbs';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import AddSubSectionForm from '~/containers/MentorCourseDetailSection/AddSubSectionForm';
import { validationClassContentModule } from '~/form/validation';
import {
  useGetDetailActivity,
  useGetIdFromUrl,
  useMutationDeleteContent,
  useMutationUpdateContent,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import globalStyles from '~/styles';
import { formatStringToNumber } from '~/utils/number';

export default function MentorCourseModulesPage() {
  const navigate = useNavigate();
  const courseId = useGetIdFromUrl('id');
  const sectionId = useGetIdFromUrl('sectionId');
  const moduleId = useGetIdFromUrl('moduleId');
  const [clearOpen, setClearOpen] = useState(false);

  const resolverLesson = useYupValidationResolver(validationClassContentModule);
  const hookFormLesson = useForm({
    defaultValues: {
      name: '',
      visible: false,
      parentActivityId: sectionId,
      courseId,
      description: '',
      authorizeClasses: [],
      file: [],
    },
    resolver: resolverLesson,
  });

  const { activity, isLoading, error, refetch } =
    useGetDetailActivity(moduleId);
  const type = activity?.type || 'LESSON';
  const { handleTryCatch } = useTryCatch('cập nhật nội dung');
  const deleteSection = useTryCatch('xóa học phần');

  const { mutateAsync: handleDeleteContent } = useMutationDeleteContent();
  const { handleMutationUpdateSection } = useMutationUpdateContent();

  const handleClearOpen = () => {
    setClearOpen(!clearOpen);
  };
  const handleUpdateModule = async (data: {
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
      await handleDeleteContent(moduleId);
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
    });
    handleClearOpen();
  };

  useEffect(() => {
    hookFormLesson.reset(activity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

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
          {type === 'LESSON' && (
            <AddSubSectionForm
              hookForm={hookFormLesson}
              onSubmit={handleUpdateModule}
              onDelete={handleClearOpen}
            />
          )}
          <ConfirmDialog
            open={clearOpen}
            title="Xác nhận xóa "
            content="Bạn có chắc xóa học phần này ?"
            handleAccept={handleDeleteSection}
            handleClose={handleClearOpen}
          />
        </Stack>
      </Stack>
    </LoadingWrapper>
  );
}
