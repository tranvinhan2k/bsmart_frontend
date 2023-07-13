import { Stack } from '@mui/material';
import Button from '~/components/atoms/Button';

import PrivateCourseTab from './PrivateCourseTab';
import { useCreateCourseForm } from '~/hooks';
import { Color, MetricSize } from '~/assets/variables';
import { PostCourseRequest } from '~/models/request';

export interface CreateCourseFormProps {
  // selectedCourse: any;
  onChangeSelectedCourse: (param: PostCourseRequest) => void;
  // onNextStep: () => void;
}

export default function CreateCourseForm({
  // selectedCourse,
  onChangeSelectedCourse,
}: // onNextStep,
CreateCourseFormProps) {
  const {
    // publicCourses,
    categories,
    filterSubjects,
    createCourseHookForm,
    handleCreateCourse,
    levels,
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
          levels={levels}
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
