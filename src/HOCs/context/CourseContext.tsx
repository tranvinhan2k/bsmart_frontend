import React, { ReactNode, createContext, useMemo, useState } from 'react';
import {
  useGetIdFromUrl,
  useQueryGetCourseContent,
  useQueryGetCoursePercent,
  useQueryGetMentorCourseClasses,
} from '~/hooks';
import LoadingWrapper from '../loading/LoadingWrapper';
import useQueryMentorCourse from '~/hooks/course/useQueryMentorCourse';
import {
  DetailCourseClassPayload,
  MentorDetailCoursePayload,
} from '~/pages/MentorCourseDetailPage';
import { ActivityPayload } from '~/models/type';
import { GetCoursePercentResponse } from '~/models/response';

interface Props {
  children: ReactNode;
}

interface CourseContextProps {
  courseId: number;
  sectionId: number | 0;
  course: MentorDetailCoursePayload;
  classes: DetailCourseClassPayload[];
  content: ActivityPayload[];
  percent: GetCoursePercentResponse;
  onChangeSection: (id: number) => void;
  refetchContent: any;
  refetchPercent: any;
}

export const CourseContext = createContext<CourseContextProps>({
  courseId: 0,
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
  percent: {
    allowSendingApproval: false,
    percentComplete: 0,
  },
  classes: [],
  content: [],
  sectionId: 0,
  onChangeSection: () => {},
  refetchContent: () => {},
  refetchPercent: () => {},
});

export default function CourseContextProvider({ children }: Props) {
  const courseId = useGetIdFromUrl('id');

  const [sectionId, setSectionId] = useState(0);

  const { course, error, isLoading } = useQueryMentorCourse(courseId);
  const classQuery = useQueryGetMentorCourseClasses(courseId);
  const { data: content, refetch: refetchContent } =
    useQueryGetCourseContent(courseId);
  const { data: percent, refetch: refetchPercent } =
    useQueryGetCoursePercent(courseId);
  const handleSetScrollSection = (id: number) => {
    setSectionId(id);
  };

  const value: CourseContextProps = useMemo(
    () => ({
      courseId,
      course,
      classes: classQuery?.classes || [],
      content: content || [],
      sectionId,
      percent: percent || {
        allowSendingApproval: false,
        percentComplete: 0,
      },
      onChangeSection: handleSetScrollSection,
      refetchContent,
      refetchPercent,
    }),
    [
      courseId,
      course,
      classQuery?.classes,
      content,
      sectionId,
      percent,
      refetchContent,
      refetchPercent,
    ]
  );

  return (
    <CourseContext.Provider value={value}>
      <LoadingWrapper isLoading={isLoading} error={error}>
        {children}
      </LoadingWrapper>
    </CourseContext.Provider>
  );
}
