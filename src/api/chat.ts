import axios from 'axios';

export const callChat = async (text: string) => {
  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: 'text-davinci-003',
    prompt: text,
    max_tokens: 200,
    temperature: 0.2,
  });
  return response.data;
};
