'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { transform } from '@babel/standalone';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Preview } from './Preview';
import FormInput from '~/components/atoms/FormInput';

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

  const handleRun = () => {
    try {
      const transformed = transform(code, { presets: ['react'] }).code;
      setPreview(transformed);
    } catch (err) {
      setPreview(`Error: ${err}`);
    }
  };

  const onSubmit = async (data: any) => {};

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
