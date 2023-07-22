import { useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import slotsApi from '~/api/slots';
import { globalSlots } from '~/redux/globalData/selector';
import { useTryCatch } from './useTryCatch';
import { updateSlots } from '~/redux/globalData/slice';
import { OptionPayload } from '~/models';
import { SlotPayload } from '~/models/slot';

const transformOptionData = (slots: SlotPayload[]) => {
  const transformData: OptionPayload[] = slots?.map((item) => ({
    id: item.id,
    label: `${item.startTime} - ${item.endTime}`,
    value: `${item.id}`,
  }));
  return transformData;
};

export const useDispatchGetAllSlots = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const slots = useSelector(globalSlots);

  const optionSlots = useMemo(() => transformOptionData(slots), [slots]);

  const handleUpdateSlots = useCallback(async () => {
    const response = await handleTryCatch(slotsApi.getAllSlots);
    dispatch(updateSlots(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    error,
    slots,
    optionSlots,
    handleUpdateSlots,
  };
};
