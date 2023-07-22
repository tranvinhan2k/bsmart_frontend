import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useMutationAddSection,
  useQueryGetCourseContent,
  useTryCatch,
} from '~/hooks';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { formatStringToNumber } from '~/utils/number';
import AddSection from '~/containers/MentorCourseDetailSection/AddSection';
import Sections from '~/containers/MentorCourseDetailSection/Sections';

interface Props {
  refetchGetPercent: any;
}

export default function MentorCourseContentPage({ refetchGetPercent }: Props) {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);
  const addCourseSection = useMutationAddSection();

  const {
    data: content,
    error,
    isLoading,
    refetch,
  } = useQueryGetCourseContent(courseId);
  const addContentSection = useTryCatch('thêm học phần');

  const handleRefetch = async () => {
    await refetchGetPercent();
    await refetch();
  };

  const handleAddNewSection = async (name: string) => {
    await addContentSection.handleTryCatch(async () => {
      await addCourseSection.mutateAsync({
        courseId,
        name,
        visible: true,
        parentActivityId: undefined,
        authorizeClasses: [],
      });
      await handleRefetch();
    });
  };

  return (
    <Stack>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Sections content={content} />
      </LoadingWrapper>
      <AddSection onAdd={handleAddNewSection} />
    </Stack>
  );
}
