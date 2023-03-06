import { Stack, Typography, TextField, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '~/components/atoms/Button';
import CollapseStack from '~/components/atoms/CollapseStack';
import FormInput from '~/components/atoms/FormInput';
import { OptionPayload } from '~/models';
import { CourseModulePayload } from '~/models/courses';
import Icon from '~/components/atoms/Icon';
// TODO : Not implement useHookForm yet !! waiting for API to start
const mockLevelData: OptionPayload[] = [
  {
    id: 0,
    label: 'Beginner',
    value: 'BEGINNER',
  },
  {
    id: 1,
    label: 'Intermediate',
    value: 'Intermediate',
  },
  {
    id: 2,
    label: 'Advanced',
    value: 'Advanced',
  },
  {
    id: 3,
    label: 'Expert',
    value: 'Expert',
  },
];
const mockSubjectTypeData: OptionPayload[] = [
  {
    id: 0,
    label: 'Front End',
    value: 'Front End',
  },
  {
    id: 1,
    label: 'Back End',
    value: 'Back End',
  },
];
const mockSlotNumber: OptionPayload[] = [
  {
    id: 0,
    label: 'Slot 1',
    value: '1',
  },
  {
    id: 1,
    label: 'Slot 2',
    value: '2',
  },
];
const mockDayOfWeek: OptionPayload[] = [
  {
    id: 0,
    label: 'Thu 2',
    value: '2',
  },
  {
    id: 1,
    label: 'Thu 3',
    value: '3',
  },
];

export default function CreateCourseForm() {
  const [modules, setModules] = useState<CourseModulePayload[]>([]);
  const [moduleName, setModuleName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const createCourseHookForm = useForm();

  const handleCreateNewModule = () => {
    if (moduleName !== '') {
      setModules([
        ...modules,
        {
          id: modules?.[modules.length - 1]?.id
            ? modules[modules.length - 1].id + 1
            : 0,
          label: moduleName,
          topic: [],
        },
      ]);
      setModuleName('');
    }
  };

  const handleDeleteModule = (id: number) => {
    setModules(modules.filter((item) => item.id !== id));
  };
  const handleCreateNewTopic = (moduleId: number) => {
    const updateModule = modules.map((item) => {
      if (item.id === moduleId) {
        return {
          id: item.id,
          label: item.label,
          topic: [
            ...item.topic,
            {
              id: item?.topic?.[item.topic.length - 1]?.id
                ? item.topic[item.topic.length - 1].id
                : 0,
              label: topicName,
            },
          ],
        };
      }
      return item;
    });
    if (topicName !== '') {
      setModules(updateModule);
      setTopicName('');
    }
  };

  const handleDeleteTopic = (moduleId: number, topicModule: number) => {
    const updateModule = modules.map((item) => {
      if (item.id === moduleId) {
        return {
          id: item.id,
          label: item.label,
          topic: item.topic.filter((topic) => topic.id !== topicModule),
        };
      }
      return item;
    });
    setModules(updateModule);
  };

  function onSubmitSuccess(data: any) {
    console.log(data);
    // TODO: add create course api
  }
  return (
    <Stack>
      <form onSubmit={createCourseHookForm.handleSubmit(onSubmitSuccess)}>
        <CollapseStack label="Thông tin khóa học">
          <Stack padding={1}>
            <FormInput
              name=""
              control={createCourseHookForm.control}
              label="Tên Khóa Học"
            />
            <FormInput
              data={mockLevelData}
              variant="radioGroup"
              name=""
              control={createCourseHookForm.control}
              label="Trình độ"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="image"
              name=""
              control={createCourseHookForm.control}
              label="Hình ảnh"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="dropdown"
              name=""
              control={createCourseHookForm.control}
              label="Lĩnh Vực"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="dropdown"
              name=""
              control={createCourseHookForm.control}
              label="Ngôn ngữ lập trình"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="dropdown"
              name=""
              control={createCourseHookForm.control}
              label="Hình thức khóa học"
            />
            <FormInput
              data={mockSubjectTypeData}
              name=""
              control={createCourseHookForm.control}
              label="Link Google Meet"
            />
            <Stack
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <FormInput
                data={mockSubjectTypeData}
                name=""
                variant="number"
                control={createCourseHookForm.control}
                label="Số lượng học viên tối thiểu"
              />
              <Stack marginLeft={1} />
              <FormInput
                data={mockSubjectTypeData}
                name=""
                variant="number"
                control={createCourseHookForm.control}
                label="Số lượng học viên tối đa"
              />
            </Stack>
            <FormInput
              data={mockSubjectTypeData}
              name=""
              variant="tags"
              control={createCourseHookForm.control}
              label="Tags"
            />
            <FormInput
              name=""
              variant="multiline"
              control={createCourseHookForm.control}
              label="Mô tả khóa học"
            />
          </Stack>
        </CollapseStack>
        <Stack marginTop={2}>
          <CollapseStack label="Lộ Trình khóa học">
            {modules.length > 0 && (
              <Stack>
                {modules.map((item) => (
                  <Stack marginTop={1} key={item.id} flexDirection="row">
                    <CollapseStack label={item.label}>
                      <Stack>
                        {item.topic.map((topic) => (
                          <Stack key={topic.id} flexDirection="row">
                            <Stack
                              sx={{
                                border: '1px solid black',
                                padding: 1,
                                flexGrow: 1,
                                marginY: 1,
                              }}
                            >
                              {topic.label}
                            </Stack>
                            <Stack
                              paddingX={1}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <IconButton
                                onClick={() =>
                                  handleDeleteTopic(item.id, topic.id)
                                }
                              >
                                <Icon name="close" size="small" color="red" />
                              </IconButton>
                            </Stack>
                          </Stack>
                        ))}
                        <Stack flexDirection="row">
                          <Stack flexGrow={1}>
                            <TextField
                              value={topicName}
                              onChange={(e) => {
                                setTopicName(e.target.value);
                              }}
                            />
                          </Stack>
                          <Stack padding={1}>
                            <IconButton
                              onClick={() => handleCreateNewTopic(item.id)}
                            >
                              <Icon name="add" size="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CollapseStack>
                    <Stack
                      paddingX={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton onClick={() => handleDeleteModule(item.id)}>
                        <Icon name="close" size="small" color="red" />
                      </IconButton>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            )}
            <Stack marginTop={1} flexDirection="row" alignItems="center">
              <Stack flexGrow={1} marginRight={2}>
                <TextField
                  placeholder="Nhập tên module"
                  value={moduleName}
                  onChange={(e) => {
                    setModuleName(e.target.value);
                  }}
                />
              </Stack>
              <Button onClick={handleCreateNewModule} customVariant="outlined">
                <Stack sx={{ alignItems: 'center', flexDirection: 'row' }}>
                  <Icon name="add" size="medium" />
                  <Typography>Thêm Module</Typography>
                </Stack>
              </Button>
            </Stack>
          </CollapseStack>
        </Stack>
        <Stack marginTop={2}>
          <CollapseStack label="Thời Gian Lớp Học">
            <FormInput
              control={createCourseHookForm.control}
              name=""
              variant="time"
              label="Giờ bắt đầu"
            />
            <Stack marginLeft={1} />
            <FormInput
              control={createCourseHookForm.control}
              name=""
              variant="time"
              label="Giờ kết thúc"
            />
            <FormInput
              data={mockSlotNumber}
              control={createCourseHookForm.control}
              name=""
              variant="dropdown"
              label="Slot học"
            />
            <Stack marginLeft={1} />
            <FormInput
              control={createCourseHookForm.control}
              name=""
              variant="date"
              label="Ngày dự kiến"
            />
            <FormInput
              data={mockDayOfWeek}
              control={createCourseHookForm.control}
              name="multiSelect"
              label="Chọn thứ cho lớp học"
              variant="multiSelect"
            />
            <Button customVariant="normal">Tạo lớp học</Button>
          </CollapseStack>
        </Stack>
        <Stack marginTop={2}>
          <Button customVariant="form">TẠO KHÓA HỌC</Button>
        </Stack>
      </form>
    </Stack>
  );
}
