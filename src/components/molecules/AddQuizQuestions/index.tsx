import { Stack, Typography, Box, Button, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color } from '~/assets/variables';
import CustomModal from '~/components/atoms/CustomModal';
import CustomTab from '~/components/atoms/CustomTab';
import FormInput from '~/components/atoms/FormInput';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';
import CRUDTable from '../CRUDTable';
import {
  useGetBanksQuizQuestions,
  useReadFile,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import Icon from '~/components/atoms/Icon';
import { validationQuizInput, validationSchemaFile } from '~/form/validation';
import { QuizQuestionPayload } from '~/components/atoms/FormInput/QuizInput';
import toast from '~/utils/toast';

interface Props {
  questionList: QuizQuestionPayload[];
  open: boolean;
  onClose: () => void;
  onChange: (value: QuizQuestionPayload[]) => void;
}

export default function AddQuizQuestions({
  open,
  questionList,
  onChange,
  onClose,
}: Props) {
  const {
    data: bankQuestions,
    error: errorBankQuestions,
    isLoading: isBankQuestionsLoading,
  } = useGetBanksQuizQuestions();
  const { mutateAsync } = useReadFile();

  const { handleTryCatch } = useTryCatch('thêm câu hỏi từ tệp');

  // form
  const fileResolver = useYupValidationResolver(validationSchemaFile);
  const fileHookForm = useForm({ resolver: fileResolver });

  const addQuestionResolver = useYupValidationResolver(validationQuizInput);
  const addQuestionHookForm = useForm({
    resolver: addQuestionResolver,
  });

  const questionTypeWatch = addQuestionHookForm.watch('questionType');

  // functions
  const handleAddQuestionFromBank = (paramRow: any) => {
    onChange([...questionList, paramRow]);
  };
  const handleAddQuestionFromFile = async (data: any) => {
    const quizQuestions = await handleTryCatch(async () =>
      mutateAsync(data.file[0])
    );

    if (quizQuestions && quizQuestions?.length !== 0) {
      onChange([...questionList, ...quizQuestions]);
      fileHookForm.reset();
    } else {
      toast.notifyErrorToast(
        'Không thể đọc được tệp. Vui lòng kiểm tra lại định dạng tệp đính kèm.'
      );
    }
  };
  const handleAddQuestion = (data: any) => {
    const tmpValue = [...questionList, data].map((item, index) => ({
      id: index,
      ...item,
    }));
    addQuestionHookForm.reset();

    onChange(tmpValue);
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <Stack
        sx={{
          minWidth: '60vw',
          height: '90vh',
        }}
      >
        <CustomTab
          tabContentList={[
            {
              label: 'Thêm thủ công',
              data: (
                <Stack
                  padding={2}
                  sx={{
                    width: '60vw',
                  }}
                >
                  <Typography textAlign="center" sx={globalStyles.textSubTitle}>
                    Thêm câu hỏi
                  </Typography>
                  <FormInput
                    control={addQuestionHookForm.control}
                    name="question"
                    placeholder="Tên câu hỏi"
                    label="Tên câu hỏi"
                  />
                  <Stack sx={{ paddingY: 2 }}>
                    <FormInput
                      label="Loại câu hỏi"
                      control={addQuestionHookForm.control}
                      variant="radioGroup"
                      name="questionType"
                      placeholder="Nhập loại câu hỏi"
                      data={[
                        {
                          id: 0,
                          label: 'Câu hỏi một lựa chọn',
                          value: 'SINGLE',
                        },
                        {
                          id: 1,
                          label: 'Câu hỏi nhiều lựa chọn',
                          value: 'MULTIPLE',
                        },
                      ]}
                    />
                  </Stack>
                  <FormInput
                    control={addQuestionHookForm.control}
                    name="answers"
                    variant="answerPicker"
                    answerType={questionTypeWatch}
                    label="Danh sách câu trả lời"
                  />

                  <Box>
                    <Button
                      sx={{
                        marginTop: 2,
                        color: Color.white,
                      }}
                      color="secondary"
                      variant="contained"
                      onClick={addQuestionHookForm.handleSubmit(
                        handleAddQuestion,
                        handleConsoleError
                      )}
                    >
                      Thêm câu hỏi
                    </Button>
                  </Box>
                </Stack>
              ),
            },
            {
              label: 'Thêm từ tệp Aiken',
              data: (
                <Stack padding={2}>
                  <Typography textAlign="center" sx={globalStyles.textSubTitle}>
                    Thêm câu hỏi từ file
                  </Typography>
                  <Stack marginTop={1}>
                    <FormInput
                      variant="file"
                      control={fileHookForm.control}
                      name="file.0"
                    />
                    <Button
                      sx={{
                        marginTop: 1,
                      }}
                      color="success"
                      variant="contained"
                      onClick={fileHookForm.handleSubmit(
                        handleAddQuestionFromFile,
                        handleConsoleError
                      )}
                    >
                      Thêm file
                    </Button>

                    <Stack marginTop={1}>
                      <FormHelperText>
                        Bạn chưa biết định dạng cần thêm? Tải xuống tệp định
                        dạng mẫu ở đây
                      </FormHelperText>
                      <Box>
                        <Button
                          onClick={() => {
                            window.open(
                              'https://docs.google.com/spreadsheets/d/1en5Xz2s7RtASEOYhraJKtyivcSsxvINC5kkGyp8aJ9Q/edit?usp=sharing'
                            );
                          }}
                          variant="contained"
                          startIcon={
                            <Icon name="download" color="white" size="small" />
                          }
                        >
                          Xem tệp mẫu
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              ),
            },
            {
              label: 'Ngân hàng câu hỏi',
              data: (
                <Stack padding={2}>
                  <Typography textAlign="center" sx={globalStyles.textSubTitle}>
                    Thêm câu hỏi từ ngân hàng câu hỏi
                  </Typography>
                  <Stack marginTop={1}>
                    <CRUDTable
                      error={errorBankQuestions}
                      isLoading={isBankQuestionsLoading}
                      rows={bankQuestions || []}
                      columns={[
                        {
                          field: 'question',
                          headerName: 'Tên câu hỏi',
                          flex: 5,
                        },
                        {
                          field: 'questionType',
                          headerName: 'Loại câu hỏi',
                          flex: 1,
                        },
                        {
                          field: 'answers',
                          headerName: 'Số lượng câu trả lời',
                          flex: 2,
                          renderCell(params) {
                            return params.row?.answers?.length || 0;
                          },
                        },
                        {
                          field: 'action',
                          headerName: 'Thêm câu hỏi',
                          flex: 2,
                          renderCell(params) {
                            return (
                              <Button
                                disabled={
                                  !!questionList.find(
                                    (item: any) => item.id === params.row.id
                                  )
                                }
                                onClick={() =>
                                  handleAddQuestionFromBank(params.row)
                                }
                                startIcon={
                                  <Icon
                                    name="add"
                                    size="small_20"
                                    color="white"
                                  />
                                }
                                variant="contained"
                                color="info"
                              >
                                Thêm câu hỏi
                              </Button>
                            );
                          },
                        },
                      ]}
                    />
                  </Stack>
                </Stack>
              ),
            },
          ]}
        />
      </Stack>
    </CustomModal>
  );
}
