'use client';

import { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { transform } from '@babel/standalone';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Preview } from './Preview';
import { useAIConvert } from '~/hooks/useAIConvert';
import FormInput from '~/components/atoms/FormInput';
import { useTryCatch } from '~/hooks';

const createPrompt = (description: string) => {
  return `I want you to act like a code generator and only return JSX code, nothing else. Can you please provide me with a React function component? It is also very important that you don't import or export anything, otherwise the code will not work. This is because "React" is globally registered in the environment. The component should be named 'MyComponent'. What this component should do is: "${description}". Remember, I'm specifically interested in the actual code implementation (a React function component), no description. For styling you can use TailwindCSS as you can assume that the styles are present.\n\n\`\`\`jsx\n\n\`\`\`\n\n`;
};

const disallowed = ['```', '```jsx', '```js', 'import', 'export'];

const removeDisallowedLines = (input: string) => {
  return input
    .split('\n')
    .filter(
      (line) =>
        !disallowed.some((disallowedLine) =>
          line.trim().startsWith(disallowedLine)
        )
    )
    .join('\n');
};

const formatResponse = (input: string) => {
  return removeDisallowedLines(input);
};

const initCode = `const MyComponent = () => {
  return <div>Hello World</div>
}
`;

function App() {
  const { control, handleSubmit } = useForm();
  const [code, setCode] = useState<string>(initCode);
  const [preview, setPreview] = useState<string | null>(null);
  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? 'Something went wrong');
  };
  const { handleTryCatch } = useTryCatch('xây hình ảnh');

  const handleRun = () => {
    try {
      const transformed = transform(code, { presets: ['react'] }).code;
      setPreview(transformed);
    } catch (err) {
      setPreview(`Error: ${err}`);
    }
  };

  const onSubmit = async (data: any) => {
    const response = await handleTryCatch(async () =>
      mutateAsync(createPrompt(data.text))
    );
    if (response) {
      handleEditorChange(formatResponse(response?.choices?.[0]?.text));
    }
  };

  return (
    <Stack sx={{ height: '90vh' }}>
      <Stack paddingY={1} sx={{ flexDirection: 'row' }}>
        <FormInput name="text" variant="text" control={control} />
        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{
            marginLeft: 1,
          }}
          variant="contained"
        >
          Tạo code
        </Button>
      </Stack>
      <Stack sx={{ flex: 1, height: '80%' }}>
        <div className="flex h-full bg-gray-200">
          <div className="w-1/2 flex flex-col">
            <div className="flex-grow p-4 bg-[#1e1e1e] overflow-auto">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                theme="vs-dark"
                onChange={handleEditorChange}
              />
            </div>
            <Button
              sx={{
                marginTop: 1,
              }}
              variant="contained"
              onClick={handleRun}
            >
              Chạy code
            </Button>
          </div>
          <div className="w-1/2">
            <Preview code={preview} />
          </div>
        </div>
      </Stack>
    </Stack>
  );
}

export default App;
