import {
  Box,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProcessUpdateMentorProfileRequestFormDefault } from '~/models/form';
import { useYupValidationResolver } from '~/hooks';
import {
  useMutationProcessUpdateMentorProfileRequest,
  UseMutationProcessUpdateMentorProfileRequestPayload,
} from '~/hooks/user/useMutationProcessUpdateMentorProfileRequest';
import { validationSchemaProcessUpdateMentorProfileRequest } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import TabPanel from '~/components/atoms/TabPanel/index';
import toast from '~/utils/toast';
import { SX_BOX_ITEM_WRAPPER_NO_PADDING, SX_FORM_LABEL } from './style';

interface RequestUpdateProcessProps {
  idMentorProfile: number;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function RequestUpdateProcess({
  idMentorProfile,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: RequestUpdateProcessProps) {
  const enum Text {
    mainTitle = 'Thao tác',
    labelMail = 'Mail',
    labelName = 'Họ tên',
    labelPhone = 'Số điện thoại',
    //
    labelBirthDate = 'Ngày sinh',
    labelAddress = 'Địa chỉ',
    labelGender = 'Giới tính',
    labelWebsite = 'Website riêng',
    labelLinkedIn = 'LinkedIn',
    labelFacebook = 'Facebook',
    //
    labelCoursePossess = 'Khóa học',
    labelClassPossess = 'Lớp học',
    labelRating = 'Đánh giá',
    labelNoOfRating = 'Số đánh giá',
  }

  const { processUpdateMentorProfileRequest } =
    useMutationProcessUpdateMentorProfileRequest();

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Phê duyệt',
      component: (
        <Button
          color="success"
          fullWidth
          size="medium"
          type="submit"
          variant="outlined"
        >
          Phê duyệt
        </Button>
      ),
    },
    {
      id: 1,
      text: 'Từ chối',
      component: (
        <Button
          color="error"
          fullWidth
          size="medium"
          type="submit"
          variant="outlined"
        >
          Từ chối
        </Button>
      ),
    },
  ];
  return (
    <Box sx={SX_BOX_ITEM_WRAPPER_NO_PADDING}>
      <Tabs
        variant="fullWidth"
        scrollButtons="auto"
        value={tabValue}
        onChange={handleSetTabValue}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {tabEl.map((tab) => (
          <Tab label={tab.text} key={tab.id} />
        ))}
      </Tabs>
      {tabEl.map((tab) => (
        <TabPanel value={tabValue} index={tab.id} key={tab.id}>
          <Box p={2}>{tab.component}</Box>
        </TabPanel>
      ))}
    </Box>
  );
}
