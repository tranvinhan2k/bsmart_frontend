import { Box, Typography } from '@mui/material';
import { UseControllerReturn } from 'react-hook-form';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import localEnvironment from '~/utils/localEnvironment';
import { FontSize } from '~/assets/variables';

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

  function removeParagraphTag(text: string) {
    return text.replace(/^<p>/, '').replace(/<\/p>$/, '');
  }

  const handleChangeText = () => {
    if (editorRef.current) {
      onChange(removeParagraphTag(editorRef.current.getContent()));
    }
  };

  return (
    <>
      <TinyMCEEditor
        onBlur={onBlur}
        apiKey={localEnvironment.TINYMCE_KEY}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        onChange={handleChangeText}
        initialValue={value}
        init={{
          height: 300,
          menubar: false,
          elementpath: false,
          toolbar:
            'bold italic forecolor backcolor undo redo alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
          content_style: `body { font-family:'Roboto', sans-serif; font-size:${FontSize.small_14} }`,
        }}
      />
      <Box mt={1}>
        <Typography color="red">{error?.message}</Typography>
      </Box>
    </>
  );
}
export default EditorInput;
