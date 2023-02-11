import { Box, Typography, Grid } from '@mui/material';
import React from 'react';

export default function Section3Lines() {
  const SX_BOX = {
    padding: '95px 0 150px',
  };

  const SX_THIRD_LAYER_TYPOGRAPHY_H2 = {
    fontSize: '45px',
    lineHeight: '55px',
    fontWeight: 700,
    color: '#0e0a38',
    marginBottom: '30px',

    textAlign: 'right',
  };

  const SX_FOURTH_LAYER_TYPOGRAPHY_H4 = {
    color: '#ff630e',
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.3,
    verticalAlign: 'middle',
  };

  const SX_QUOTE_CONTENT = {
    color: '#0e0a38',
    lineHeight: '30px',
    fontSize: '20px',
    textAlign: 'justify',
    padding: '10px 0',
  };

  const lines = [
    {
      title: 'Học theo lộ trình, có định hướng',
      content:
        'BSmart sẽ định hướng và đưa ra các lộ trình học lập trình nhằm phát triển năng lực và niềm đam mê lập trình của bạn để có việc ngay sau học.',
    },
    {
      title: 'Nền tảng cốt lõi trong lập trình',
      content:
        'BSmart cung cấp những nền tảng, giá trị tư duy cốt lõi nhất trong lập trình. Bạn sẽ tự tin trước sự thay đổi của công nghệ và môi trường làm việc.',
    },
    {
      title: 'Mài giũa bạn qua thực tế',
      content:
        'Đội ngũ Giảng viên và các Mentor là những người dày dạn kinh nghiệm qua các dự án thực tế tại các công ty lớn sẽ truyền đạt những kinh nghiệm "máu lửa" cho bạn.',
    },
    {
      title: 'Mentor tận tâm',
      content:
        'Bạn sẽ được giao dự án và làm theo Teamwork ngay từ ngày đầu tiên. Đóng vai trò một thành viên trong qui trình Scrum, Agile. Được Mentor hỗ trợ tân tâm, nhiệt tình.',
    },
    {
      title: 'Công nghệ mới, thực tế',
      content:
        'Bạn được học và trải nghiệm các công nghệ lập trình mới nhất, chuyên sâu, bám sát nhu cầu tuyển dụng thực tế từ doanh nghiệp.',
    },
    {
      title: 'Trao tay chìa khóa thành công',
      content:
        'Hướng dẫn viết CV, phỏng vấn. Kết nối doanh nghiệp, gặp gỡ doanh nghiệp, phỏng vấn cùng doanh nghiệp ngay sau khi tốt nghiệp.',
    },
  ];

  return (
    <Box sx={SX_BOX}>
      <Box sx={{ position: 'relative', textAlign: 'center' }} px={16}>
        <Typography component="h2" sx={SX_THIRD_LAYER_TYPOGRAPHY_H2}>
          Điểm ưu việt tại BSmart
        </Typography>
        <Grid container spacing={2}>
          {lines.map((line) => (
            <React.Fragment key={line.title}>
              <Grid item xs={12} md={4}>
                <Typography component="h4" sx={SX_FOURTH_LAYER_TYPOGRAPHY_H4}>
                  {line.title}
                </Typography>
                <Box sx={SX_QUOTE_CONTENT}>{line.content}</Box>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
