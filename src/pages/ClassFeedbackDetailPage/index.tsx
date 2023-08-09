import { Stack, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Color } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import FeedbackTable from '~/components/molecules/FeedbackTable';
import { ClassStatusType } from '~/constants/class';
import { useQueryMentorFeedback } from '~/hooks';
import { useSearchManagedClass } from '~/hooks/class/UseSearchManagedClass';
import { useCRUDTemplate } from '~/hooks/useCRUDTemplate';
import globalStyles from '~/styles';
import { formatStringToNumber } from '~/utils/number';

export default function ClassFeedbackDetailPage({
  isAdmin = false,
}: {
  isAdmin?: boolean;
}) {
  const { control, handleSubmit, watch } = useForm();

  const classId = watch('classId');

  const { managedClassList } = useSearchManagedClass({
    status: ClassStatusType.NOTSTART,
  });

  const { data, error, isLoading, refetch } = useQueryMentorFeedback(
    classId?.id || 0
  );
  const {
    handleChangeTemplateForClass,
    handleTryCatchChangeTemplateForClass,
    templates,
  } = useCRUDTemplate();

  const onSubmit = async (params: any) => {
    await handleTryCatchChangeTemplateForClass(async () =>
      handleChangeTemplateForClass({
        classId: params?.classId?.id || 0,
        templateId: params?.templateId?.id || 0,
      })
    );
    await refetch();
  };

  return (
    <Stack padding={3}>
      <Typography sx={globalStyles.textSubTitle}>Đánh giá của lớp</Typography>

      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <Typography textAlign="center" sx={globalStyles.textSubTitle}>
          Chọn bản mẫu cho lớp học
        </Typography>
        <Stack marginTop={1} />
        <Stack>
          {isAdmin && (
            <FormInput
              control={control}
              name="classId"
              variant="dropdown"
              placeholder="Danh sách lớp học"
              data={
                managedClassList?.items?.map((item) => ({
                  id: item.id,
                  label: `${item.id}`,
                  value: `${item.id}`,
                })) || []
              }
            />
          )}
          <Stack marginTop={1} />
          <FormInput
            control={control}
            name="templateId"
            variant="dropdown"
            placeholder="Danh sách bản mẫu"
            data={
              templates?.items?.map((item) => ({
                id: item.id,
                label: `${item.name}`,
                value: `${item.id}`,
              })) || []
            }
          />
          <Stack marginTop={1} />
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Thêm bản mẫu cho lớp học
          </Button>
        </Stack>
      </Stack>
      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <FeedbackTable data={data || []} error={error} isLoading={isLoading} />
      </Stack>
    </Stack>
  );
}
