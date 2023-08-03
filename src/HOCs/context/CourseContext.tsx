import React, { ReactNode, createContext, useMemo, useState } from 'react';
import { useGetIdFromUrl } from '~/hooks';
import LoadingWrapper from '../loading/LoadingWrapper';
import useQueryMentorCourse from '~/hooks/course/useQueryMentorCourse';
import { MentorDetailCoursePayload } from '~/pages/MentorCourseDetailPage';

interface Props {
  children: ReactNode;
}

interface CourseContextProps {
  sectionId: number | 0;
  course: MentorDetailCoursePayload;
  onChangeSection: (id: number) => void;
}

export const CourseContext = createContext<CourseContextProps>({
  course: {
    categoryId: {
      id: 0,
      label: '',
      value: '',
    },
    code: '',
    description: '',
    level: 'ADVANCED',
    name: '',
    status: 'ALL',
    subjectId: {
      id: 0,
      label: '',
      value: '',
    },
  },
  sectionId: 0,
  onChangeSection: () => {},
});

export default function CourseContextProvider({ children }: Props) {
  const [sectionId, setSectionId] = useState(0);
  const courseId = useGetIdFromUrl('id');
  const { course, error, isLoading } = useQueryMentorCourse(courseId);

  const handleSetScrollSection = (id: number) => {
    setSectionId(id);
  };

  const value: CourseContextProps = useMemo(
    () => ({
      course,
      sectionId,
      onChangeSection: handleSetScrollSection,
    }),
    [course, sectionId]
  );

  return (
    <CourseContext.Provider value={value}>
      <LoadingWrapper isLoading={isLoading} error={error}>
        {children}
      </LoadingWrapper>
    </CourseContext.Provider>
  );
}
