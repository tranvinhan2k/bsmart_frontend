import { Stack, Typography, LinearProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CourseItem from '~/components/molecules/CourseItem';
import { image } from '~/constants/image';
import { useQueryGetAllMentorCourses, useQueryGetAllSubjects } from '~/hooks';
import { MentorPayload } from '~/models/mentor';
import { scrollToTop } from '~/utils/common';

interface MentorIntroduceProfilePageProps {
  mentor: MentorPayload;
}

export default function MentorIntroduceProfilePage({
  mentor,
}: MentorIntroduceProfilePageProps) {
  const navigation = useNavigate();
  const { subjects } = useQueryGetAllSubjects();
  const { courses } = useQueryGetAllMentorCourses({
    page: 0,
    size: 4,
    sort: undefined,
    status: 'REQUESTING',
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleNavigateLink = () => {
    // window.open('/course_menu');
    navigation('/course_menu');
  };

  return (
    <Stack>
      <Stack marginTop={2}>
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Giới thiệu
        </Typography>
        <Typography
          sx={{
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
            color: Color.grey,
          }}
        >
          {mentor.introduce}
        </Typography>
      </Stack>
      <Stack marginTop={2}>
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Skill
        </Typography>
        <Grid container marginTop={1}>
          {mentor?.mentorSkills?.map((skill) => {
            const subjectLabel = subjects?.find(
              (item) => item.id === skill.skillId
            );
            return (
              <Grid key={skill.skillId} item xs={12} md={6}>
                <Stack
                  sx={{
                    padding: MetricSize.medium_15,
                    background: Color.whiteSmoke,
                    borderRadius: MetricSize.small_5,
                  }}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      fontSize: FontSize.small_18,
                      fontFamily: FontFamily.bold,
                    }}
                  >
                    {subjectLabel?.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: FontSize.small_18,
                      fontFamily: FontFamily.light,
                    }}
                  >
                    {`${skill.yearOfExperiences} years of experiences`}
                  </Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      <Stack marginTop={2}>
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Kinh nghiệm thực tế
        </Typography>
        <Typography
          sx={{
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
            color: Color.grey,
          }}
        >
          {mentor.workingExperience}
        </Typography>
        {/* <Stack
          sx={{
            marginTop: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Stack
            sx={{
              width: '48%',

              alignItems: 'center',
              borderRadius: '5px',
              background: Color.whiteSmoke,
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.large_45,
                color: Color.orange,
                fontFamily: FontFamily.bold,
              }}
            >
              20+
            </Typography>
            <Typography
              sx={{
                fontSize: FontSize.small_18,
                color: Color.grey,
                fontFamily: FontFamily.regular,
              }}
            >
              Khoá học
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: '48%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              background: Color.whiteSmoke,
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.large_45,
                color: Color.orange,
                fontFamily: FontFamily.bold,
              }}
            >
              10,000+
            </Typography>
            <Typography
              sx={{
                fontSize: FontSize.small_18,
                color: Color.grey,
                fontFamily: FontFamily.regular,
              }}
            >
              Học viên
            </Typography>
          </Stack>
        </Stack> */}
      </Stack>
      <Stack marginTop={2}>
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Khóa học tiêu biểu
        </Typography>
        <Stack flexDirection="row" justifyContent="space-between">
          {courses &&
            courses.items.map((item: any) => {
              const params: any = {
                content: item.courseDescription,
                feedback: 5,
                id: item?.id,
                image: item?.image?.url || image.noCourse,
                mentor: item?.mentorName,
                title: item.courseName,
                typeLearn: [],
                mentorImage: item?.imageUrl,
              };
              return (
                <CourseItem onClick={() => {}} key={item.id} item={params} />
              );
            })}
        </Stack>
        <Stack marginTop={1}>
          <Button onClick={handleNavigateLink} customVariant="outlined">
            Xem Thêm
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
