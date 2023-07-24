import { Divider, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { LoadingWrapper } from '~/HOCs';
import ReturnLink from '~/components/atoms/ReturnLink';
import { ActivityData } from '~/constants';
import { useGetDetailActivity, useGetIdFromUrl } from '~/hooks';
import globalStyles from '~/styles';
import ModuleLessonPage from './ModuleLessonPage';
import ModuleQuizPage from './ModuleQuizPage';
import ModuleResourcePage from './ModuleResourcePage';
import ModuleAssignmentPage from './ModuleAssignmentPage';
import {
  ActivityAssignmentPayload,
  ActivityDetailPayload,
  ActivityLessonPayload,
  ActivityQuizPayload,
  ActivityResourcePayload,
} from '~/models/type';

export default function MemberClassModulesPage() {
  const moduleId = useGetIdFromUrl('moduleId');
  const { error, isLoading } = useGetDetailActivity(moduleId);
  // const { activity, error, isLoading } = useGetDetailActivity(moduleId);
  // const detail = activity?.detail;

  const detailQuiz: ActivityQuizPayload = {
    allowReviewAfterMin: 100,
    code: '123',
    defaultPoint: 10,
    endDate: new Date().toISOString(),
    isAllowReview: true,
    isSuffleQuestion: true,
    password: '123456',
    startDate: new Date().toISOString(),
    time: 100,
  };

  const detailLesson: ActivityLessonPayload = {
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, reiciendis numquam obcaecati saepe tempora officiis delectus esse. Exercitationem aperiam, magnam, laboriosam ipsum mollitia tempora nesciunt voluptates voluptate quae iusto accusamus. ',
  };

  const detailResource: ActivityResourcePayload = {
    file: {
      name: 'tai_lieu_lap_trinh.pdf',
      url: 'http://dulieu.tailieuhoctap.vn/books/cong-nghe-thong-tin/lap-trinh-ung-dung/file_goc_778233.pdf',
      size: 100,
    },
  };

  const detailAssignment: ActivityAssignmentPayload = {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos culpa porro quaerat nisi libero minus velit recusandae, minima amet explicabo totam quod. Dignissimos, nam corrupti aliquid nostrum pariatur amet labore. ',
    attachFiles: [
      {
        name: 'tai_lieu_lap_trinh.pdf',
        url: 'http://dulieu.tailieuhoctap.vn/books/cong-nghe-thong-tin/lap-trinh-ung-dung/file_goc_778233.pdf',
        size: 100,
      },
    ],
    editBeForSubmitMin: 100, // phút, submit r, thời gian giới hạn chỉnh sửa lại
    endDate: '',
    isOverWriteAttachFile: true, // có cho update file không ?
    maxFileSize: 10, // số MB trong 1 lần nộp
    maxFileSubmit: 2, // số lượng file submit
    passPoint: 10,
    startDate: '',
  };

  const detail = detailQuiz;

  const activity: ActivityDetailPayload = {
    id: 0,
    name: 'Khóa học kiểm thử',
    detail,
    authorizeClasses: [],
    created: '',
    createdBy: '',
    lastModified: '',
    lastModifiedBy: '',
    parentActivityId: 0,
    type: 'QUIZ',
    visible: true,
  };

  const activityData = ActivityData.find(
    (item) => item.type === activity?.type
  );

  let data: ReactNode = null;

  data = <ModuleAssignmentPage name={activity.name} item={detailAssignment} />;

  // switch (detail?.type) {
  //   case 'LESSON':
  //     data = <ModuleLessonPage name={activity.name} item={detail} />;
  //     break;
  //   case 'ASSIGNMENT':
  //     data = <ModuleAssignmentPage item={detail} />;
  //     break;
  //   case 'QUIZ':
  //     data = <ModuleQuizPage item={detail} />;
  //     break;
  //   case 'RESOURCE':
  //     data = <ModuleResourcePage name={activity.name} item={detail} />;
  //     break;
  //   default:
  //     data = null;
  // }

  return (
    <Stack>
      <ReturnLink />
      <LoadingWrapper>
        <Typography sx={globalStyles.textSmallLabel}>
          {activityData?.label}
        </Typography>
        <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
          {data}
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
