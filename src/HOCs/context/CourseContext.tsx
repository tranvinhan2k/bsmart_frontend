import { ReactNode, createContext, useMemo } from 'react';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useGetIdFromUrl } from '~/hooks';
import { CourseMenuItemPayload } from '~/models/type';
import LoadingWrapper from '../loading/LoadingWrapper';
import useQueryMentorCourse from '~/hooks/course/useQueryMentorCourse';
import { MentorDetailCoursePayload } from '~/pages/MentorCourseDetailPage';

interface Props {
  children: ReactNode;
}

interface CourseContextProps {
  course: MentorDetailCoursePayload | undefined;
}

export const CourseContext = createContext<CourseContextProps>({
  course: undefined,
});

export default function CourseContextProvider({ children }: Props) {
  const CourseId = useGetIdFromUrl('id');
  const { course, error, isLoading } = useQueryMentorCourse(CourseId);

  const value: CourseContextProps = useMemo(
    () => ({
      course,
    }),
    [course]
  );

  return (
    <CourseContext.Provider value={value}>
      <LoadingWrapper isLoading={isLoading} error={error}>
        {children}
      </LoadingWrapper>
    </CourseContext.Provider>
  );
}
