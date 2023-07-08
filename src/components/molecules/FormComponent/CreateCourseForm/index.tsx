import { useState } from 'react';

import { Box, Stack } from '@mui/material';
import Button from '~/components/atoms/Button';

import CustomTab from '~/components/atoms/CustomTab';
import PublicCourseTab from './PublicCourseTab';
import PrivateCourseTab from './PrivateCourseTab';
import { useCreateCourseForm } from '~/hooks';
import { Color, MetricSize } from '~/assets/variables';
import { PostCoursePayload } from '~/models/request';

export interface CreateCourseFormProps {
  // selectedCourse: any;
  onChangeSelectedCourse: (param: PostCoursePayload) => void;
  // onNextStep: () => void;
}

export default function CreateCourseForm({
  // selectedCourse,
  onChangeSelectedCourse,
}: // onNextStep,
CreateCourseFormProps) {
  const {
    publicCourses,
    categories,
    filterSubjects,
    createCourseHookForm,
    handleCreateCourse,
  } = useCreateCourseForm(onChangeSelectedCourse);

  // TODO: Khóa học riêng tư chưa làm được tạm thời comment lại, đừng xóa

  // const [isUseCustomCourse, setUseCustomCourse] = useState<boolean>(false);

  // const handleAddPublicCourse = () => {
  //   onNextStep();
  // };

  // return (
  //   <Stack>
  //     <Box marginTop={2}>
  //       <CustomTab
  //         tabContentList={[
  //           {
  //             label: 'Khóa học cộng đồng',
  //             data: (
  //               <PublicCourseTab
  //                 publicCourses={publicCourses}
  //                 selectedCourse={selectedCourse}
  //                 onChangeCourse={onChangeSelectedCourse}
  //               />
  //             ),
  //             onClick: () => setUseCustomCourse(false),
  //           },
  //           {
  //             label: 'Khóa học tự tạo',
  //             data: (
  //               <PrivateCourseTab
  //                 categories={categories}
  //                 subjects={filterSubjects}
  //                 createCourseHookForm={createCourseHookForm}
  //               />
  //             ),
  //             onClick: () => setUseCustomCourse(true),
  //           },
  //         ]}
  //       />
  //     </Box>
  //     <Stack marginTop={2}>
  //       <Button
  //         onClick={
  //           isUseCustomCourse
  //             ? createCourseHookForm.handleSubmit(handleCreateCourse)
  //             : handleAddPublicCourse
  //         }
  //         customVariant="form"
  //       >
  //         tạo khóa học và sang bước kế tiếp
  //       </Button>
  //     </Stack>
  //   </Stack>
  // );
  return (
    <Stack>
      <Stack
        sx={{
          background: Color.white,
          padding: 5,
          marginTop: 1,
          borderRadius: MetricSize.small_5,
        }}
      >
        <PrivateCourseTab
          categories={categories}
          subjects={filterSubjects}
          createCourseHookForm={createCourseHookForm}
        />
      </Stack>
      <Stack marginTop={2}>
        <Button
          color="secondary"
          sx={{ color: Color.white }}
          onClick={createCourseHookForm.handleSubmit(handleCreateCourse)}
          variant="contained"
        >
          tạo khóa học
        </Button>
      </Stack>
    </Stack>
  );
}
