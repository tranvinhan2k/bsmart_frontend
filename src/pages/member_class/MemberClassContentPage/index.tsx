import { Stack } from '@mui/material';
import TextTitle from '~/components/atoms/texts/TextTitle';
import Content from '~/components/molecules/Content';

export default function MentorClassContentPage() {
  return (
    <Stack>
      <TextTitle title="Nội dung lớp học" />
      <Content
        sections={[
          {
            id: 0,
            name: 'Giới thiệu',
            authorizeClasses: [],
            created: '',
            createdBy: '',
            lastModified: '',
            lastModifiedBy: '',
            parentActivityId: 1,
            subActivities: [
              {
                id: 0,
                name: 'Giới thiệu',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'LESSON',
                visible: true,
              },
              {
                id: 1,
                name: 'Kiểm tra 15 phút',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'QUIZ',
                visible: true,
              },
              {
                id: 2,
                name: 'Tài liệu về pointer trong C#',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'RESOURCE',
                visible: true,
              },
              {
                id: 3,
                name: 'Tính số nguyên bằng ngôn ngữ C#',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'ASSIGNMENT',
                visible: true,
              },
            ],
            type: 'LESSON',
            visible: true,
          },
          {
            id: 0,
            name: 'Giới thiệu',
            authorizeClasses: [],
            created: '',
            createdBy: '',
            lastModified: '',
            lastModifiedBy: '',
            parentActivityId: 1,
            subActivities: [
              {
                id: 0,
                name: 'Giới thiệu',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'LESSON',
                visible: true,
              },
            ],
            type: 'LESSON',
            visible: true,
          },
          {
            id: 0,
            name: 'Giới thiệu',
            authorizeClasses: [],
            created: '',
            createdBy: '',
            lastModified: '',
            lastModifiedBy: '',
            parentActivityId: 1,
            subActivities: [
              {
                id: 0,
                name: 'Giới thiệu',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'LESSON',
                visible: true,
              },
            ],
            type: 'LESSON',
            visible: true,
          },
        ]}
      />
    </Stack>
  );
}
