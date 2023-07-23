import { useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import dayOfWeeksApi from '~/api/dayOfWeeks';
import { globalDayOfWeeks } from '~/redux/globalData/selector';
import { useTryCatch } from './useTryCatch';
import { updateDayOfWeeks } from '~/redux/globalData/slice';
import { OptionPayload } from '~/models';
import { RequestOptionPayload } from '~/models/type';
import { DayOfWeekPayload } from '~/models/dayOfWeek';

const transformOptionData = (dayOfWeeks: DayOfWeekPayload[]) => {
  const transformData: OptionPayload[] = dayOfWeeks?.map((item) => ({
    id: item.id,
    label: item.name,
    value: `${item.id}`,
  }));
  return transformData;
};

export const useDispatchGetAllDayOfWeeks = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const dayOfWeeks = useSelector(globalDayOfWeeks);

  const optionDayOfWeeks = useMemo(
    () => transformOptionData(dayOfWeeks),
    [dayOfWeeks]
  );

  const handleUpdateDayOfWeeks = useCallback(async () => {
    const response = await handleTryCatch(dayOfWeeksApi.getAllDayOfWeeks);
    dispatch(updateDayOfWeeks(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    error,
    dayOfWeeks,
    optionDayOfWeeks,
    handleUpdateDayOfWeeks,
  };
};
