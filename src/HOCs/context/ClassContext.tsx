import { ReactNode, createContext, useMemo } from 'react';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useGetIdFromUrl, useQueryGetDetailUserClass } from '~/hooks';
import { ClassDetailPayload, ClassMenuItemPayload } from '~/models/type';
import LoadingWrapper from '../loading/LoadingWrapper';
import { selectProfile } from '~/redux/user/selector';

interface Props {
  children: ReactNode;
}

interface ClassContextProps {
  detailClass: ClassDetailPayload | undefined;
  refetch:
    | (<TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
      ) => Promise<QueryObserverResult<ClassDetailPayload, unknown>>)
    | undefined;
}

export const ClassContext = createContext<ClassContextProps>({
  detailClass: undefined,
  refetch: undefined,
});

export default function ClassContextProvider({ children }: Props) {
  const profile = useSelector(selectProfile);
  const role = profile.roles?.[0]?.code;
  const classId = useGetIdFromUrl('id');

  const { detailClass, error, isLoading, refetch } = useQueryGetDetailUserClass(
    classId,
    role
  );

  const value: ClassContextProps = useMemo(
    () => ({
      detailClass,
      refetch,
    }),
    [detailClass, refetch]
  );

  return (
    <ClassContext.Provider value={value}>
      <LoadingWrapper isLoading={isLoading} error={error}>
        {children}
      </LoadingWrapper>
    </ClassContext.Provider>
  );
}
