import { appendFile } from 'fs/promises';
import { formatISODateDateToDisplayDateTime } from './date';

const filePath = './log.txt';

export const appendLogFile = async (text: string) => {
  await appendFile(filePath, text);
};
