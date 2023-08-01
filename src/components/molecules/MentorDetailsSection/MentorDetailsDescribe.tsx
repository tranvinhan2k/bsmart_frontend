import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMentorDetails } from '~/hooks/mentorProfile/useGetMentorDetails';
import Icon from '~/components/atoms/Icon';
import globalStyles from '~/styles';
import sx from './style';

export default function MentorDetailsDescribe() {
  const { id } = useParams();
  const { mentorDetails, isLoading } = useGetMentorDetails(Number(id));

  const introduce = mentorDetails?.introduce ?? '';
  const workingExperience = mentorDetails?.workingExperience ?? '';

  const [isExpanded1, setIsExpanded1] = useState<boolean>(false);
  const [isExpanded2, setIsExpanded2] = useState<boolean>(false);
  const handleExpand1 = () => setIsExpanded1(!isExpanded1);
  const handleExpand2 = () => setIsExpanded2(!isExpanded2);

  return (
    <Box sx={sx.mainWrapper}>
      <Stack direction="column" justifyContent="flex-start" alignItems="start">
        <Typography sx={globalStyles.textSmallLabel}>Giới thiệu</Typography>
        {isLoading && <Skeleton />}
        {!isLoading && introduce.length > 200 ? (
          <>
            <Typography
              sx={
                isExpanded1
                  ? globalStyles.displayEditorTextShowMore
                  : globalStyles.displayEditorTextShowLess
              }
              dangerouslySetInnerHTML={{
                __html: `${
                  isExpanded1 ? introduce : `${introduce.slice(0, 200)}...`
                }`,
              }}
            />
            <Button
              color="miSmartOrange"
              size="small"
              disableRipple
              endIcon={
                isExpanded1 ? (
                  <Icon name="expandLessIcon" size="small" color="tertiary" />
                ) : (
                  <Icon name="expandMoreIcon" size="small" color="tertiary" />
                )
              }
              sx={globalStyles.displayEditorExpandButton}
              onClick={handleExpand1}
            >
              {isExpanded1 ? 'Thu gọn' : 'Mở rộng'}
            </Button>
          </>
        ) : (
          <Typography
            sx={globalStyles.displayEditorTextShowMore}
            dangerouslySetInnerHTML={{
              __html: `${introduce}`,
            }}
          />
        )}
      </Stack>
      <Box mt={4}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="start"
        >
          <Typography sx={globalStyles.textSmallLabel}>Kinh nghiệm</Typography>
          {isLoading && <Skeleton />}
          {!isLoading && workingExperience.length > 200 ? (
            <>
              <Typography
                sx={
                  isExpanded2
                    ? globalStyles.displayEditorTextShowMore
                    : globalStyles.displayEditorTextShowLess
                }
                dangerouslySetInnerHTML={{
                  __html: `${
                    isExpanded2
                      ? workingExperience
                      : `${workingExperience.slice(0, 200)}...`
                  }`,
                }}
              />
              <Button
                color="miSmartOrange"
                size="small"
                disableRipple
                endIcon={
                  isExpanded2 ? (
                    <Icon name="expandLessIcon" size="small" color="tertiary" />
                  ) : (
                    <Icon name="expandMoreIcon" size="small" color="tertiary" />
                  )
                }
                sx={globalStyles.displayEditorExpandButton}
                onClick={handleExpand2}
              >
                {isExpanded2 ? 'Thu gọn' : 'Mở rộng'}
              </Button>
            </>
          ) : (
            <Typography
              sx={globalStyles.displayEditorTextShowMore}
              dangerouslySetInnerHTML={{
                __html: `${workingExperience}`,
              }}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
}
