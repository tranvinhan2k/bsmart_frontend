import ManageTableRegisterRequest from '~/components/molecules/ManageTableRegisterRequest';
import ManageTableRegisterRequestInterviewing from '~/components/molecules/ManageTableRegisterRequest/ManageTableRegisterRequestInterviewing';
import { MentorProfileStatusType } from '~/constants/profile';

interface ManageTableRegisterRequestFilterProps {
  status: MentorProfileStatusType;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableRegisterRequestFilter({
  status,
  refetchGetNoOfRequest,
}: ManageTableRegisterRequestFilterProps) {
  let render;
  switch (status) {
    case MentorProfileStatusType.WAITING:
      render = <ManageTableRegisterRequestInterviewing />;
      break;

    default:
      render = (
        <ManageTableRegisterRequest
          status={status}
          interviewed
          refetchGetNoOfRequest={refetchGetNoOfRequest}
        />
      );
      break;
  }

  return render;
}
