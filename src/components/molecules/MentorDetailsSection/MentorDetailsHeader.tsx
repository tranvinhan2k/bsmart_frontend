import { Box, Chip, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import sx from './style';

import { useGetMentorDetails } from '~/hooks/mentorProfile/useGetMentorDetails';

export default function MentorDetailsHeader() {
  const { id } = useParams();
  const { mentorDetails } = useGetMentorDetails(Number(id));

  const mentorName = mentorDetails?.user.fullName;
  const teachingInfo = mentorDetails
    ? [
        {
          id: 0,
          label: 'Khóa học',
          value: mentorDetails.user.teachInformation?.numberOfCourse ?? 0,
        },
        {
          id: 1,
          label: 'Lớp học',
          value: mentorDetails.user.teachInformation?.numberOfClass ?? 0,
        },
        {
          id: 3,
          label: 'Đánh giá',
          value: `${
            mentorDetails.user.teachInformation?.numberOfFeedBack ?? 0
          }/5`,
        },
        {
          id: 4,
          label: 'Lượt đánh giá',
          value: mentorDetails.user.teachInformation?.scoreFeedback ?? 0,
        },
      ]
    : [];

  // const skills = [];

  const skills = mentorDetails?.mentorSkills.map((skill) => {
    return {
      id: skill.skillId,
      label: skill.name,
      yoe: skill.yearOfExperiences,
    };
  });

  // console.log('parsedSkills', parsedSkills);

  const tmpIntroduce =
    'Tôi là Angela, tôi là một nhà phát triển với niềm đam mê giảng dạy. Tôi là người hướng dẫn chính tại London App Brewery, Bootcamp lập trình hàng đầu của London. Tôi đã giúp hàng trăm nghìn sinh viên học cách viết mã và thay đổi cuộc sống của họ bằng cách trở thành nhà phát triển. Tôi đã được các công ty như Twitter, Facebook và Google mời dạy cho nhân viên của họ. Bước đột phá đầu tiên của tôi vào lập trình là khi tôi mới 12 tuổi, muốn xây dựng trò chơi Space Invader của riêng mình. Kể từ đó, tôi đã tạo ra hàng trăm trang web, ứng dụng và trò chơi. Nhưng quan trọng nhất, tôi nhận ra rằng niềm đam mê lớn nhất của tôi là giảng dạy. Tôi dành phần lớn thời gian của mình để nghiên cứu cách làm cho việc học viết mã trở nên thú vị và làm cho các khái niệm khó hiểu trở nên dễ hiểu. Tôi áp dụng mọi thứ tôi khám phá được vào các khóa học bootcamp của mình. Trong các khóa học của tôi, bạn sẽ tìm thấy rất nhiều điều hài hước táo bạo nhưng cũng có rất nhiều lời giải thích và hình ảnh động để đảm bảo mọi thứ đều dễ hiểu. Tôi sẽ ở đó cho bạn mỗi bước của con đường.';
  const isLoading = false;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleIsDescriptionExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonList = [
    { id: 0, iconName: 'languageIcon', label: 'Website riêng' },
    { id: 1, iconName: 'facebook', label: 'Facebook' },
    { id: 2, iconName: 'twitter', label: 'Twitter' },
  ];
  return (
    <Box sx={sx.mainWrapper}>
      <Box>
        <Typography sx={sx.titleMentorRole}>Giáo viên</Typography>
        <Typography sx={sx.titleMentorName}>{mentorName}</Typography>
      </Box>
      <Grid container spacing={2} mb={4}>
        {skills &&
          skills.map((skill) => (
            <Grid item key={skill.id}>
              <Tooltip
                title={`Có ${skill.yoe} năm kinh nghiệm ${skill.label}`}
                arrow
                placement="bottom"
              >
                <Chip
                  size="small"
                  color="default"
                  label={`${skill.label} - ${skill.yoe} năm`}
                  // title={`Có ${skill.yoe} năm kinh nghiệm ${skill.label}`}
                />
              </Tooltip>
            </Grid>
          ))}
      </Grid>
      <Grid container>
        {teachingInfo &&
          teachingInfo.map((item) => (
            <Grid item xs={3} key={item.id}>
              <Stack>
                <Typography sx={sx.itemTitle}>{item.label}</Typography>
                <Typography sx={sx.itemValue}>{item.value}</Typography>
              </Stack>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
