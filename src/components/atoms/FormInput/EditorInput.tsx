import { UseControllerReturn } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import localEnvironment from '~/utils/localEnvironment';

interface EditorInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function EditorInput({ controller, placeholder }: EditorInputProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;

  const editorRef = useRef<any>(null);
  const handleChangeText = () => {
    if (editorRef.current) {
      onChange(editorRef.current.getContent());
    }
  };

  return (
    // <TextField
    //   placeholder={placeholder}
    //   fullWidth
    //   size="small"
    //   value={value}
    //   onChange={onChange}
    //   onBlur={onBlur}
    //   inputRef={ref}
    //   error={invalid}
    //   helperText={error?.message}
    //   multiline
    // />
    <TinyMCEEditor
      apiKey={localEnvironment.TINYMCE_KEY}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      onChange={handleChangeText}
      initialValue={value}
      init={{
        height: 200,
        menubar: false,
        toolbar:
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent ',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
}
export default EditorInput;
