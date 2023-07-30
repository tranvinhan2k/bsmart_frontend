import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
  Skeleton,
} from '@mui/material';
import { useState } from 'react';
import Icon, { IconName } from '~/components/atoms/Icon';
import { useEffectScrollToTop } from '~/hooks';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
// import mentor_details_bg from '~/assets/images/mentor-details-bg.jpg;
import overlay_bg2 from '~/assets/images/overlay-bg2.jpg';
import sx from './style';
import globalStyles from '~/styles';

import { Color, FontFamily, MetricSize } from '~/assets/variables';

export default function MentorDetailsPage() {
  useEffectScrollToTop();

  const teachingInfo = [
    { id: 0, label: 'Khóa học', value: 4 },
    { id: 1, label: 'Lớp học', value: 143 },
    { id: 3, label: 'Đánh giá', value: '4.5/5' },
    { id: 3, label: 'Lượt đánh giá', value: '394' },
  ];

  const skills = [
    { id: 0, label: 'Java' },
    { id: 1, label: 'C#' },
  ];

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
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <LoadingWrapper error={false} isLoading={false}>
        <Stack>
          <Grid
            container
            sx={{
              gridAutoFlow: 'dense',
              paddingX: 10,
              paddingY: 10,
            }}
          >
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={8}>
                <Box sx={sx.mainWrapper}>
                  <Box>
                    <Typography sx={sx.titleMentorRole}>Giáo viên</Typography>
                    <Typography sx={sx.titleMentorName}>
                      Trần Duy Thanh
                    </Typography>
                  </Box>
                  <Grid container spacing={2} mb={4}>
                    {skills.map((skill) => (
                      <Grid item key={skill.id}>
                        <Chip
                          color="default"
                          label={skill.label}
                          title={skill.label}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container>
                    {teachingInfo.map((item) => (
                      <Grid item xs={3} key={item.id}>
                        <Stack>
                          <Typography sx={sx.itemTitle}>
                            {item.label}
                          </Typography>
                          <Typography sx={sx.itemValue}>
                            {item.value}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box sx={sx.mainWrapper}>
                  <Box>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="start"
                    >
                      <Typography sx={globalStyles.textSmallLabel}>
                        Giới thiệu
                      </Typography>
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        <>
                          {tmpIntroduce.length > 200 ? (
                            <Typography
                              sx={
                                isExpanded
                                  ? globalStyles.displayEditorTextShowMore
                                  : globalStyles.displayEditorTextShowLess
                              }
                              dangerouslySetInnerHTML={{
                                __html: `${
                                  isExpanded
                                    ? tmpIntroduce
                                    : `${tmpIntroduce.slice(0, 200)}...`
                                }`,
                              }}
                            />
                          ) : (
                            <Typography
                              sx={globalStyles.displayEditorTextShowLess}
                              dangerouslySetInnerHTML={{
                                __html: `${tmpIntroduce}`,
                              }}
                            />
                          )}

                          <Button
                            color="miSmartOrange"
                            size="small"
                            disableRipple
                            endIcon={
                              isExpanded ? (
                                <Icon
                                  name="expandLessIcon"
                                  size="small"
                                  color="tertiary"
                                />
                              ) : (
                                <Icon
                                  name="expandMoreIcon"
                                  size="small"
                                  color="tertiary"
                                />
                              )
                            }
                            sx={globalStyles.displayEditorExpandButton}
                            onClick={handleIsDescriptionExpanded}
                          >
                            {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Box>
                  <Box mt={4}>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="start"
                    >
                      <Typography sx={globalStyles.textSmallLabel}>
                        Kinh nghiệm
                      </Typography>
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        <>
                          {tmpIntroduce.length > 200 ? (
                            <Typography
                              sx={
                                isExpanded
                                  ? globalStyles.displayEditorTextShowMore
                                  : globalStyles.displayEditorTextShowLess
                              }
                              dangerouslySetInnerHTML={{
                                __html: `${
                                  isExpanded
                                    ? tmpIntroduce
                                    : `${tmpIntroduce.slice(0, 200)}...`
                                }`,
                              }}
                            />
                          ) : (
                            <Typography
                              sx={globalStyles.displayEditorTextShowLess}
                              dangerouslySetInnerHTML={{
                                __html: `${tmpIntroduce}`,
                              }}
                            />
                          )}

                          <Button
                            color="miSmartOrange"
                            size="small"
                            disableRipple
                            endIcon={
                              isExpanded ? (
                                <Icon
                                  name="expandLessIcon"
                                  size="small"
                                  color="tertiary"
                                />
                              ) : (
                                <Icon
                                  name="expandMoreIcon"
                                  size="small"
                                  color="tertiary"
                                />
                              )
                            }
                            sx={globalStyles.displayEditorExpandButton}
                            onClick={handleIsDescriptionExpanded}
                          >
                            {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Box>
                </Box>
                <Box sx={sx.mainWrapper}>
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="start"
                  >
                    <Typography sx={globalStyles.textSmallLabel}>
                      Khóa học tiêu biểu
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  sx={sx.mainWrapper}
                >
                  <Avatar
                    src={undefined}
                    variant="circular"
                    sx={{
                      width: 150,
                      height: 150,
                      boxShadow: 3,
                    }}
                  />
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                  >
                    {buttonList.map((item) => (
                      <Button
                        variant="outlined"
                        color="miSmartOrange"
                        startIcon={
                          <Icon name={item.iconName as IconName} size="small" />
                        }
                        key={item.id}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <Box
                sx={{
                  backgroundImage: `url(${overlay_bg2})`,
                  // backgroundColor: '#79988d',
                  // backgroundBlendMode: 'multiply',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  width: '100%',
                  height: '300px',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    display: 'inline-block',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    color: '#fff',
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-end"
                    rowSpacing={2}
                  >
                    <Grid item sm={12} md={6}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        mb={2}
                      >
                        <Avatar
                          src={undefined}
                          variant="circular"
                          sx={{
                            width: 150,
                            height: 150,
                            boxShadow: 3,
                          }}
                        />
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          alignItems="stretch"
                          spacing={1}
                        >
                          <Typography sx={sx.labelMentorName}>
                            Trần Duy Thanh
                          </Typography>
                          <Typography sx={sx.labelMentorRole}>
                            Giảng viên
                          </Typography>
                          <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                          >
                            <Button
                              variant="outlined"
                              color="miSmartWhite"
                              startIcon={
                                <Icon name="languageIcon" size="small" />
                              }
                            >
                              Website riêng
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                        mb={2}
                      >
                        {teachingInfo.map((item) => (
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            key={item.id}
                          >
                            <Typography sx={sx.labelValue}>
                              {item.value}
                            </Typography>
                            <Typography sx={sx.labelItem}>
                              {item.label}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid> */}
          </Grid>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
