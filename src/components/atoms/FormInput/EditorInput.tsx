import { UseControllerReturn } from 'react-hook-form';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import localEnvironment from '~/utils/localEnvironment';
import { Color, FontFamily, FontSize } from '~/assets/variables';

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
    <TinyMCEEditor
      onBlur={onBlur}
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
        content_style: `body { font-family:'Roboto', sans-serif; font-size:${FontSize.small_14} }`,
      }}
    />
  );
}
export default EditorInput;
