import { Stack, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoadingWrapper } from '~/HOCs';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import ReturnLink from '~/components/atoms/ReturnLink';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import AddAssignmentForm from '~/containers/MentorCourseDetailSection/AddAssignmentForm';
import AddResourceForm from '~/containers/MentorCourseDetailSection/AddResourceForm';
import AddSubSectionForm from '~/containers/MentorCourseDetailSection/AddSubSectionForm';
import {
  validationClassContentAssignment,
  validationClassContentModule,
  validationClassContentQuiz,
  validationClassContentResource,
} from '~/form/validation';
import {
  useGetDetailActivity,
  useGetIdFromUrl,
  useMutationDeleteContent,
  useMutationUpdateContent,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { QuizQuestionTypeKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { formatStringToNumber } from '~/utils/number';

export default function MentorCourseModulesPage() {
  const navigate = useNavigate();
  const courseId = useGetIdFromUrl('id');
  const sectionId = useGetIdFromUrl('sectionId');
  const moduleId = useGetIdFromUrl('moduleId');
  const [clearOpen, setClearOpen] = useState(false);

  const { activity, isLoading, error, refetch } =
    useGetDetailActivity(moduleId);

  const resolverQuiz = useYupValidationResolver(validationClassContentQuiz);
  const hookFormQuiz = useForm({
    defaultValues: {
      name: '',
      visible: false,
      parentActivityId: sectionId,
      authorizeClasses: [],
      courseId,
      code: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      time: 0,
      defaultPoint: 0,
      isSuffleQuestion: false,
      isAllowReview: false,
      allowReviewAfterMin: 0,
      password: '',
      quizQuestions: [],
    },
    resolver: resolverQuiz,
  });

  const resolverLesson = useYupValidationResolver(validationClassContentModule);
  const hookFormLesson = useForm({
    defaultValues: {
      name: '',
      visible: false,
      courseId,
      description: activity?.detail?.description,
      authorizeClasses: [],
    },
    resolver: resolverLesson,
  });

  const resolverAssignment = useYupValidationResolver(
    validationClassContentAssignment
  );
  const hookFormAssignment = useForm({
    resolver: resolverAssignment,
  });

  const resolverResource = useYupValidationResolver(
    validationClassContentResource
  );
  const hookFormResource = useForm({
    defaultValues: {
      name: '',
      visible: false,
      parentActivityId: sectionId,
      courseId,
      authorizeClasses: [],
      file: [],
    },
    resolver: resolverResource,
  });

  const type = activity?.type || 'LESSON';
  const { handleTryCatch } = useTryCatch('cập nhật nội dung');
  const deleteSection = useTryCatch('xóa học phần');

  const { mutateAsync: handleDeleteContent } = useMutationDeleteContent();
  const {
    handleMutationUpdateLesson,
    handleMutationUpdateAssignment,
    handleMutationUpdateQuiz,
    handleMutationUpdateResource,
  } = useMutationUpdateContent();

  const handleClearOpen = () => {
    setClearOpen(!clearOpen);
  };
  const handleUpdateModule = async (data: {
    id: number;
    name: string;
    visible: boolean;
    authorizeClasses: string[];
    description?: string;
  }) => {
    console.log('id', data);

    await handleTryCatch(async () =>
      handleMutationUpdateLesson({
        id: data.id,
        params: {
          name: data.name,
          visible: data.visible,
          parentActivityId: sectionId,
          authorizeClasses:
            data.authorizeClasses?.map((item) => formatStringToNumber(item)) ||
            [],
          courseId,
          description: data?.description,
        },
      })
    );
    await refetch();
  };

  const handleSubmitResource = async (data: {
    name: string;
    file: Blob[];
    visible: boolean;
    authorizeClasses: string[];
    parentActivityId: number;
    courseId: number;
    id: number;
  }) => {
    await handleTryCatch(async () => {
      await handleMutationUpdateResource({
        id: data.id,
        params: {
          name: data.name,
          visible: data.visible,
          parentActivityId: sectionId,
          courseId,
          authorizeClasses: data.authorizeClasses,
          file: data.file[0],
        },
      });
    });
    await refetch();
  };

  const handleSubmitQuiz = async (
    data: Partial<{
      id: number;
      name: string;
      visible: boolean;
      parentActivityId: number;
      authorizeClasses: number[];
      courseId: number;
      code: string;
      startDate: string;
      endDate: string;
      time: number;
      defaultPoint: number;
      isSuffleQuestion: boolean;
      isAllowReview: boolean;
      allowReviewAfterMin: number;
      password: string;
      quizQuestions: {
        id: number;
        question: string;
        questionType: QuizQuestionTypeKeys;
        answers: {
          answer: string;
          right: boolean;
        }[];
      }[];
    }>
  ) => {
    await handleTryCatch(async () => {
      await handleMutationUpdateQuiz({
        id: data.id,
        params: {
          name: data.name,
          visible: data.visible,
          parentActivityId: data.parentActivityId,
          courseId: data.courseId,
          authorizeClasses: data.authorizeClasses,
          code: data.code,
          startDate: data.startDate,
          endDate: data.endDate,
          time: data.time,
          defaultPoint: data.defaultPoint,
          isSuffleQuestion: !!data.isSuffleQuestion,
          isAllowReview: !!data.isAllowReview,
          allowReviewAfterMin: data.allowReviewAfterMin,
          password: data.password,
          quizQuestions: data.quizQuestions?.map((item) => {
            const { id, ...props } = item;
            return props;
          }),
        },
      });
      hookFormLesson.reset();
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
    });
    hookFormResource.reset();
  };

  const handleSubmitAssignment = async (data: any) => {
    await handleTryCatch(async () => {
      await handleMutationUpdateAssignment({
        id: data.id,
        params: {
          name: data.name,
          visible: data.visible,
          parentActivityId: sectionId,
          courseId,
          authorizeClasses: data.authorizeClasses,
          description: data.description,
          startDate: data.startDate.toISOString(),
          endDate: data.endDate.toISOString(),
          editBeForSubmitMin: data.editBeForSubmitMin,
          maxFileSubmit: data.maxFileSubmit,
          maxFileSize: data.maxFileSize,
          attachFiles: data.attachFiles,
          isOverWriteAttachFile: data.isOverWriteAttachFile,
          passPoint: data.passPoint,
          overWriteAttachFile: data.overWriteAttachFile,
        },
      });
    });
    await refetch();
  };

  const handleDeleteSection = async () => {
    await deleteSection.handleTryCatch(async () => {
      await handleDeleteContent(moduleId);
      navigate(-1);
    });
    handleClearOpen();
  };

  useEffect(() => {
    if (activity) {
      hookFormLesson.reset({
        ...activity,
        ...activity.detail,
        'file.0': {
          name: activity?.detail?.url?.replace(
            'http://103.173.155.221:9000/bsmart/',
            ''
          ),
          url: activity?.detail?.url,
          type: 'ATTACH',
        },
      });
      hookFormResource.reset({
        ...activity,
        'file.0': {
          name: activity?.detail?.url?.replace(
            'http://103.173.155.221:9000/bsmart/',
            ''
          ),
          url: activity?.detail?.url,
        },
      });
      hookFormAssignment.reset({
        ...activity,
        ...activity.detail,
        attachFiles: activity?.detail?.assignmentFiles?.map((item: any) => ({
          name: item.name,
          url: item.url,
        })),
      });
      hookFormQuiz.reset({
        ...activity,
        ...activity.detail,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

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
          {type === 'LESSON' && (
            <AddSubSectionForm
              hookForm={hookFormLesson}
              onSubmit={handleUpdateModule}
              onDelete={handleClearOpen}
            />
          )}
          {type === 'RESOURCE' && (
            <AddResourceForm
              hookForm={hookFormResource}
              onSubmit={handleSubmitResource}
              onDelete={handleClearOpen}
            />
          )}
          {type === 'QUIZ' && (
            <AddResourceForm
              hookForm={hookFormQuiz}
              onSubmit={handleSubmitQuiz}
              onDelete={handleClearOpen}
            />
          )}
          {type === 'ASSIGNMENT' && (
            <AddAssignmentForm
              hookForm={hookFormAssignment}
              onSubmit={handleSubmitAssignment}
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