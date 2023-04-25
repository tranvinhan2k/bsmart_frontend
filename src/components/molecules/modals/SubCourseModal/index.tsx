import { Grid, Stack, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { Color, FontFamily, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { SubCoursePayload } from '~/models/subCourse';
import cousreImage from '~/assets/images/front-end-course.png';
import { formatMoney } from '~/utils/money';
import { formatDate } from '~/utils/date';
import Icon from '~/components/atoms/Icon';
import SubCourseTimetable from '../../SubCourseTimetable';
import { selectRole } from '~/redux/user/selector';

interface SubCourseModalProps {
  visible: boolean;
  item: SubCoursePayload | undefined;
  onClose: any;
  onAddToCart: any;
  onPayQuick: any;
}

export default function SubCourseModal({
  visible,
  item,
  onClose,
  onAddToCart,
  onPayQuick,
}: SubCourseModalProps) {
  const role = useSelector(selectRole);
  if (!item) return null;
  return (
    <Modal
      open={visible}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Stack
          sx={{
            width: '96vw',
            height: '90vh',
            justifyItems: 'center',
            marginTop: '3vh',
            background: Color.whiteSmoke,
            padding: MetricSize.medium_15,
            boxShadow: 3,
            borderRadius: '5px',
            overflowY: 'scroll',
          }}
          key={item.id}
        >
          <Stack padding={1}>
            <IconButton sx={{ alignSelf: 'flex-end' }} onClick={onClose}>
              <Icon name="close" size="small" color="black" />
            </IconButton>
          </Stack>
          <Stack>
            <Grid container>
              <Grid item md={8}>
                <Stack>
                  <Typography>Tên lớp học</Typography>
                  <Typography
                    sx={{
                      fontSize: MetricSize.large_30,
                      fontFamily: FontFamily.bold,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Stack>
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <Typography
                      sx={{
                        fontSize: MetricSize.medium_15,
                        fontFamily: FontFamily.regular,
                        color: Color.black,
                      }}
                    >
                      Độ khó khóa học
                      <Typography
                        sx={{
                          fontSize: MetricSize.medium_15,
                          fontFamily: FontFamily.bold,
                          color: Color.orange,
                        }}
                      >
                        Cơ bản
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      sx={{
                        fontSize: MetricSize.medium_15,
                        fontFamily: FontFamily.regular,
                        color: Color.black,
                      }}
                    >
                      Số lượng học sinh tối thiểu
                      <Typography
                        sx={{
                          fontSize: MetricSize.medium_15,
                          fontFamily: FontFamily.bold,
                          color: Color.orange,
                        }}
                      >
                        {item.minStudent}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      sx={{
                        fontSize: MetricSize.medium_15,
                        fontFamily: FontFamily.regular,
                        color: Color.black,
                      }}
                    >
                      Số lượng học sinh tối đa
                      <Typography
                        sx={{
                          fontSize: MetricSize.medium_15,
                          fontFamily: FontFamily.bold,
                          color: Color.orange,
                        }}
                      >
                        {item.maxStudent}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      sx={{
                        fontSize: MetricSize.medium_15,
                        fontFamily: FontFamily.regular,
                        color: Color.black,
                      }}
                    >
                      Hình thức giảng dạy
                      <Typography
                        sx={{
                          fontSize: MetricSize.medium_15,
                          fontFamily: FontFamily.bold,
                          color: Color.orange,
                        }}
                      >
                        {item.typeLearn}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ marginTop: 2 }} />
                <SubCourseTimetable data={item.timeInWeeks} />
              </Grid>
              <Grid item md={4}>
                <Box>
                  <Stack sx={{ paddingX: MetricSize.medium_15 }}>
                    <Box
                      component="img"
                      src={cousreImage}
                      sx={{
                        width: '100%',
                        borderRadius: '5px',
                        paddingBottom: '5px',
                      }}
                    />
                    {[
                      {
                        id: 1,
                        label: 'Giá tiền',
                        variable: formatMoney(item.price),
                      },
                      {
                        id: 2,
                        label: ' Ngày khai giảng ',
                        variable: formatDate(item.startDateExpected),
                      },
                      {
                        id: 3,
                        label: 'Ngày bế giảng',
                        variable: formatDate(item.endDateExpected),
                      },
                    ].map((subCourseItem) => (
                      <Stack
                        key={subCourseItem.id}
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Typography
                          sx={{
                            fontSize: MetricSize.medium_15,
                            fontFamily: FontFamily.bold,
                          }}
                        >
                          {subCourseItem.label}
                        </Typography>
                        <Typography
                          sx={{
                            paddingLeft: MetricSize.small_10,
                            fontSize: MetricSize.medium_15,
                            fontFamily: FontFamily.regular,
                          }}
                        >
                          {subCourseItem.variable}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
                {role !== 'TEACHER' && item.purchase === null && (
                  <Stack padding={2}>
                    <Button
                      onClick={() => onPayQuick(item.id)}
                      customVariant="normal"
                    >
                      Đăng kí ngay
                    </Button>
                    <Button
                      onClick={() => onAddToCart(item.id)}
                      marginTop="small_10"
                      customVariant="outlined"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Stack>
                )}
                {item.purchase && (
                  <Stack padding={2}>
                    <Button
                      disabled
                      onClick={() => onPayQuick(item.id)}
                      customVariant="normal"
                    >
                      Đã đăng kí
                    </Button>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}
