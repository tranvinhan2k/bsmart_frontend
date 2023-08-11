import classApi from '~/api/class';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetMentorMarkReport = (classId: number) => {
  return useCustomQuery(['Get_class_mark_report'], () =>
    classApi.getClassMarkReport(classId)
  );
};
