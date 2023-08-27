import axios from 'axios';
import { AiConvertResponse } from '~/models/response';
import localEnvironment from '~/utils/localEnvironment';

export const AIconvert = async (image: any) => {
  const requestData = new FormData();
  requestData.append('image', image);
  const response: { data: { data: AiConvertResponse[] } } = await axios.post(
    'https://api.fpt.ai/vision/idr/vnm',
    requestData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'api-key': localEnvironment.FPT_AI_KEY,
      },
    }
  );
  return response.data.data[0];
};
