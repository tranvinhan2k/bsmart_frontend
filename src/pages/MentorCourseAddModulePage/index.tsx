import { Stack } from '@mui/material';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseContext } from '~/HOCs/context/CourseContext';
import ReturnLink from '~/components/atoms/ReturnLink';
import {
  NavigationLink,
  MentorDashboardNavigationActionLink,
  MentorCourseActionLink,
} from '~/constants/routeLink';
import AddAssignmentForm from '~/containers/MentorCourseDetailSection/AddAssignmentForm';
import AddQuizForm from '~/containers/MentorCourseDetailSection/AddQuizForm';
import AddResourceForm from '~/containers/MentorCourseDetailSection/AddResourceForm';
import AddSubSectionForm from '~/containers/MentorCourseDetailSection/AddSubSectionForm';
import {
  validationClassContentAssignment,
  validationClassContentModule,
  validationClassContentQuiz,
  validationClassContentResource,
} from '~/form/validation';
import {
  useEffectScrollToTop,
  useGetDetailActivity,
  useGetIdFromUrl,
  useMutationAddSubSection,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { ActivityKeys, QuizQuestionTypeKeys } from '~/models/variables';
import { formatStringToNumber } from '~/utils/number';

export default function MentorCourseAddModulePage() {
  const navigate = useNavigate();
  const courseId = useGetIdFromUrl('id');
  const sectionId = useGetIdFromUrl('sectionId');

  const { refetchContent } = useContext(CourseContext);

  const { mutationLesson, mutationResource, mutationQuiz, mutationAssignment } =
    useMutationAddSubSection();
  const { handleTryCatch } = useTryCatch('thêm nội dung học phần');

  const { type } = useParams();
  const resolverLesson = useYupValidationResolver(validationClassContentModule);
  const hookFormLesson = useForm({
    defaultValues: {
      name: '',
      visible: true,
      parentActivityId: sectionId,
      courseId,
      description: '',
      authorizeClasses: [],
    },
    resolver: resolverLesson,
  });
  const resolverResource = useYupValidationResolver(
    validationClassContentResource
  );
  const hookFormResource = useForm({
    defaultValues: {
      name: '',
      visible: true,
      parentActivityId: sectionId,
      courseId,
      authorizeClasses: [],
      file: [],
    },
    resolver: resolverResource,
  });
  const resolverQuiz = useYupValidationResolver(validationClassContentQuiz);
  const hookFormQuiz = useForm({
    defaultValues: {
      name: '',
      visible: true,
      parentActivityId: sectionId,
      authorizeClasses: [],
      courseId,
      code: '',
      defaultPoint: 0,
      isSuffleQuestion: false,
      isAllowReview: false,
      allowReviewAfterMin: 0,
      password: '',
      quizQuestions: [],
    },
    resolver: resolverQuiz,
  });
  const resolverAssignment = useYupValidationResolver(
    validationClassContentAssignment
  );
  const hookFormAssignment = useForm({
    defaultValues: {
      name: '',
      visible: true,
      parentActivityId: sectionId,
      authorizeClasses: [],
      courseId,
      description: '',
      maxFileSubmit: 0,
      maxFileSize: 0,
      attachFiles: {
        files: [],
        deleteIndexes: [],
      },
      passPoint: 0,
    },
    resolver: resolverAssignment,
  });

  const handleSubmitLesson = async (data: {
    name: string;
    description: string;
    visible: boolean;
    authorizeClasses: string[];
    parentActivityId: number;
    courseId: number;
  }) => {
    await handleTryCatch(async () => {
      await mutationLesson.mutateAsync({
        name: data.name,
        visible: data.visible,
        parentActivityId: data.parentActivityId,
        courseId: data.courseId,
        description: data.description,
        authorizeClasses: data.authorizeClasses?.map((item) =>
          formatStringToNumber(item)
        ),
      });
      hookFormLesson.reset();
      await refetchContent();
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
    });
  };

  const handleSubmitResource = async (data: {
    name: string;
    file: Blob[];
    visible: boolean;
    authorizeClasses: string[];
    parentActivityId: number;
    courseId: number;
  }) => {
    await handleTryCatch(async () => {
      await mutationResource.mutateAsync({
        name: data.name,
        visible: data.visible,
        parentActivityId: data.parentActivityId,
        courseId: data.courseId,
        authorizeClasses: data.authorizeClasses,
        file: data.file[0],
      });
      hookFormResource.reset();
      await refetchContent();
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
    });
  };
  const handleSubmitAssignment = async (data: any) => {
    await handleTryCatch(async () => {
      await mutationAssignment.mutateAsync({
        name: data.name,
        visible: data.visible,
        parentActivityId: sectionId,
        courseId,
        authorizeClasses: data.authorizeClasses,
        password: data.password,
        description: data.description,
        editBeForSubmitMin: data.editBeForSubmitMin,
        maxFileSubmit: data.maxFileSubmit,
        maxFileSize: data.maxFileSize,
        attachFiles: data.attachFiles.files,
        passPoint: data.passPoint,
      });
      hookFormLesson.reset();
      await refetchContent();
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
    });
  };
  const handleSubmitQuiz = async (
    data: Partial<{
      name: string;
      visible: boolean;
      parentActivityId: number;
      authorizeClasses: number[];
      courseId: number;
      code: string;
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
      await mutationQuiz.mutateAsync({
        name: data.name,
        visible: data.visible,
        parentActivityId: data.parentActivityId,
        courseId: data.courseId,
        authorizeClasses: data.authorizeClasses,
        code: data.code,
        defaultPoint: data.defaultPoint,
        isSuffleQuestion: !!data.isSuffleQuestion,
        isAllowReview: !!data.isAllowReview,
        allowReviewAfterMin: data.allowReviewAfterMin,
        password: data.password,
        quizQuestions: data.quizQuestions?.map((item) => {
          const { id, ...props } = item;
          return props;
        }),
      });
      hookFormLesson.reset();
      hookFormResource.reset();
      await refetchContent();
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
      );
    });
    hookFormResource.reset();
  };

  useEffectScrollToTop();

  if (!type) return null;

  const moduleType: ActivityKeys = type?.toUpperCase() as ActivityKeys;

  return (
    <Stack>
      <ReturnLink
        to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`}
      />
      <Stack marginTop={1}>
        {moduleType === 'LESSON' && (
          <AddSubSectionForm
            hookForm={hookFormLesson}
            onSubmit={handleSubmitLesson}
          />
        )}

        {moduleType === 'RESOURCE' && (
          <AddResourceForm
            hookForm={hookFormResource}
            onSubmit={handleSubmitResource}
          />
        )}

        {moduleType === 'QUIZ' && (
          <AddQuizForm hookForm={hookFormQuiz} onSubmit={handleSubmitQuiz} />
        )}

        {moduleType === 'ASSIGNMENT' && (
          <AddAssignmentForm
            hookForm={hookFormAssignment}
            onSubmit={handleSubmitAssignment}
          />
        )}
      </Stack>
    </Stack>
  );
}
