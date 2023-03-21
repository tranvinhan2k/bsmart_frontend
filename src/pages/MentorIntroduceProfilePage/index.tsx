import { Stack, Typography, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CourseItem from '~/components/molecules/CourseItem';
import { MentorCourses } from '~/constants';
import { scrollToTop } from '~/utils/common';

export default function MentorIntroduceProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
          accusamus libero veniam reprehenderit ut, repellat illum quasi aut
          amet perferendis explicabo assumenda neque, temporibus earum
          consectetur, dolor omnis alias dolores?
        </Typography>
      </Stack>
      <Stack marginTop={2}>
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Skill
        </Typography>
        <Stack marginTop={1}>
          <Stack flexDirection="row">
            <Stack flexGrow={1}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  PHP
                </Typography>
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  97%
                </Typography>
              </Stack>
              <LinearProgress color="info" variant="determinate" value={50} />
            </Stack>
            <Stack margin={1} />
            <Stack flexGrow={1}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  PHP
                </Typography>
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  97%
                </Typography>
              </Stack>
              <LinearProgress color="info" variant="determinate" value={50} />
            </Stack>
          </Stack>
          <Stack flexDirection="row">
            <Stack flexGrow={1}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  PHP
                </Typography>
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  97%
                </Typography>
              </Stack>
              <LinearProgress color="info" variant="determinate" value={50} />
            </Stack>
            <Stack margin={1} />
            <Stack flexGrow={1}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  PHP
                </Typography>
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  97%
                </Typography>
              </Stack>
              <LinearProgress color="info" variant="determinate" value={50} />
            </Stack>
          </Stack>
        </Stack>
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
          Tôi có kinh nghiệm 10 năm với vai trò là một seniot web developer
          (2010 - Hiện tại) tại CodeMex. Ngoài ra, tôi còn là mentor của trung
          tâm lập trình WebCode trong hơn 5 năm (2005 -2010).
        </Typography>
        <Stack
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
        </Stack>
      </Stack>
      <Stack marginTop={2}>
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Khóa học tiêu biểu
        </Typography>
        <Stack flexDirection="row" justifyContent="space-between">
          {MentorCourses &&
            MentorCourses.map((item) => (
              <CourseItem onClick={() => {}} key={item.id} item={item} />
            ))}
        </Stack>
        <Stack marginTop={1}>
          <Button customVariant="outlined">Xem Thêm</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
