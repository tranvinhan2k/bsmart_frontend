import { Checkbox, Divider, Grid, Stack, Typography } from '@mui/material';
import { LoadingWrapper } from '~/HOCs';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import {
  useAssignFeedbackTemplateForClass,
  useGetManagerClasses,
  useTryCatch,
} from '~/hooks';
import { FeedbackManagerPayload } from '~/pages/FeedbackManagerPage';
import globalStyles from '~/styles';

interface ReadOneTemplateFormProps {
  row: FeedbackManagerPayload;
}

export interface FeedbackClassPayload {
  id: number;
  code: string;
}

export default function ReadOneTemplateForm({ row }: ReadOneTemplateFormProps) {
  const {
    data: feedbackClassList,
    error,
    isLoading,
    refetch,
  } = useGetManagerClasses(row.id);
  const { mutateAsync: handleAssignTemplate } =
    useAssignFeedbackTemplateForClass();

  const { handleTryCatch } = useTryCatch('thêm lớp vào bản mẫu đánh giá');

  const handleCheckedClass = async (id: number) => {
    const tmpClassIds = [id];
    await handleTryCatch(async () => {
      await handleAssignTemplate({
        id: row.id,
        ids: tmpClassIds,
      });
      await refetch();
    });
  };

  return (
    <Stack
      sx={{
        width: '90vw',
        height: '90vh',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={7} lg={8}>
          <Stack sx={globalStyles.viewRoundedBorderBody}>
            <Typography sx={globalStyles.textSubTitle}>
              Thông tin chung
            </Typography>

            <TextPropLine
              icon="feedback"
              label="Tên đánh giá"
              value={row.name}
            />
            <TextPropLine
              icon="feedback"
              label="Đánh giá mặc định"
              value={row.isDefault ? 'Mặc định' : 'Không'}
            />
            <TextPropLine
              icon="feedback"
              label="Trạng thái chỉnh sửa"
              value={row.isFixed ? 'Đã khóa' : 'Cho phép chỉnh sửa'}
            />
          </Stack>
          <Stack marginTop={1} sx={globalStyles.viewRoundedBorderBody}>
            <Typography sx={globalStyles.textSubTitle}>
              Thông tin câu hỏi
            </Typography>
            <Stack
              marginTop={1}
              sx={{
                overflow: 'auto',
                height: '230px',
                paddingRight: 1,
              }}
            >
              {row?.questions?.map((item, index) => (
                <Stack key={index}>
                  <TextPropLine
                    icon="question"
                    label=""
                    value={item?.question}
                  />
                  <Stack paddingLeft={3}>
                    {item.answers.map((subItem, idx) => {
                      return (
                        <TextPropLine
                          key={idx}
                          icon="answer"
                          label=""
                          value={subItem.answer}
                        />
                      );
                    })}
                  </Stack>
                  <Divider
                    sx={{
                      marginY: 1,
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Stack sx={globalStyles.viewRoundedBorderBody}>
            <Stack
              sx={{
                height: '460px',
                overflow: 'auto',
              }}
            >
              <Typography sx={globalStyles.textSubTitle}>
                Danh sách lớp học chưa chọn
              </Typography>
              <LoadingWrapper error={error} isLoading={isLoading}>
                <Stack
                  marginTop={1}
                  sx={{
                    marginLeft: -1,
                  }}
                >
                  {feedbackClassList?.map((item) => {
                    const isChecked = false;
                    return (
                      <Stack
                        sx={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        key={item.id}
                      >
                        <Checkbox
                          color="secondary"
                          disableRipple
                          checked={isChecked}
                          onChange={() => handleCheckedClass(item.id)}
                        />
                        <Typography marginLeft={1}>{item.code}</Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </LoadingWrapper>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
