import classApi from '~/api/class';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetMemberMarkReport = (classId: number) => {
  return useCustomQuery(['get_student_mark_report'], () =>
    classApi.getStudentMarkReport(classId)
  );
};
