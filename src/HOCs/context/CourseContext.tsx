import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useGetIdFromUrl, useQueryGetCourseContent } from '~/hooks';
import { CourseMenuItemPayload } from '~/models/type';
import LoadingWrapper from '../loading/LoadingWrapper';
import useQueryMentorCourse from '~/hooks/course/useQueryMentorCourse';
import { MentorDetailCoursePayload } from '~/pages/MentorCourseDetailPage';

interface Props {
  children: ReactNode;
}

interface CourseContextProps {
  itemRefs:
    | React.MutableRefObject<React.RefObject<any>[] | undefined>
    | undefined;
  onScrollToComponent: ((id: number) => void) | undefined;
  course: MentorDetailCoursePayload | undefined;
}

export const CourseContext = createContext<CourseContextProps>({
  course: undefined,
  onScrollToComponent: undefined,
  itemRefs: undefined,
});

export default function CourseContextProvider({ children }: Props) {
  const [sectionId, setSectionId] = useState(0);
  const CourseId = useGetIdFromUrl('id');
  const { course, error, isLoading } = useQueryMentorCourse(CourseId);
  const { data: content } = useQueryGetCourseContent(CourseId);

  const itemRefs = useRef(content?.map(() => React.createRef<any>()));

  const handleSetScrollSection = (id: number) => {
    console.log('section set', id);

    setSectionId(id);
  };

  useEffect(() => {
    const scrollToComponent = () => {
      console.log('sectionId', sectionId);

      const index = content?.findIndex((item) => item.id === sectionId) || -1;

      if (itemRefs.current && index !== -1) {
        if (itemRefs.current[index] && itemRefs.current[index].current) {
          itemRefs.current[index].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start', // You can choose 'start', 'center', or 'end'
            inline: 'nearest', // You can choose 'start', 'center', or 'end'
          });
        }
      }
    };
    scrollToComponent();
  }, [content, sectionId]);

  const value: CourseContextProps = useMemo(
    () => ({
      course,
      itemRefs,
      onScrollToComponent: handleSetScrollSection,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
