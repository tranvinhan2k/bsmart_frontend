import { Stack } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import Content from '~/components/molecules/Content';

export default function MentorClassContentPage() {
  return (
    <Stack
      sx={{
        background: '#ddd',
        borderRadius: MetricSize.small_5,
        paddingY: 1,
        paddingX: 2,
      }}
    >
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
