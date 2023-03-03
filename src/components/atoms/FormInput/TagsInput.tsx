import { UseControllerReturn } from 'react-hook-form';
import { TextField, Chip } from '@mui/material';
import { useState } from 'react';
import { SX_TEXT_INPUT_FORM } from './styles';

interface TagsInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function TagsInput({ controller, placeholder }: TagsInputProps) {
  const [tags, setTags] = useState<string[]>([]);
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = controller;

  const handleTagAdd = (e: any) => {
    const inputValue: string = e.target.value.trim();
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      onChange([...tags, inputValue]);
    }
    e.target.value = '';
  };

  const handleTagDelete = (tagToDelete: any) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    onChange(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div>
      <TextField
        fullWidth
        placeholder={placeholder}
        onBlur={onBlur}
        onKeyDown={(e) => e.key === 'Enter' && handleTagAdd(e)}
        error={invalid}
        helperText={error?.message}
      />
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => handleTagDelete(tag)}
          style={{ margin: '0.5rem' }}
        />
      ))}
    </div>
  );
}
export default TagsInput;
