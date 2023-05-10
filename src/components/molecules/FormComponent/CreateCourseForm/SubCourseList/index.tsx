import { FormHelperText, Grid, Stack } from '@mui/material';
import { SubCoursePayload } from '~/models/subCourse';
import SubCourseItem from '../SubCourseItem';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { Color } from '~/assets/variables';

interface SubCourseListProps {
  subCourses: SubCoursePayload[];
  onOpenUpdateModal: (index: number) => void;
  onOpenAddModal: () => void;
}
export default function SubCourseList({
  subCourses,
  onOpenAddModal,
  onOpenUpdateModal,
}: SubCourseListProps) {
  return (
    <Grid container spacing={2}>
      {subCourses.map((item, index) => (
        <SubCourseItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          id={index}
          onDelete={() => onOpenUpdateModal(index)}
          subCourse={item}
        />
      ))}
      <Grid item xs={12}>
        <Stack
          sx={{
            height: '100px',
            border:
              subCourses.length !== 0 ? '1px dotted grey' : '1px solid #ff0000',
            borderRadius: '10px',
            '&>hover': {
              background: 'grey',
            },
          }}
        >
          <Button onClick={onOpenAddModal} sx={{ flex: 1, flexGrow: 1 }}>
            <Icon name="add" size="medium" color="black" />
          </Button>
        </Stack>
        <Stack>
          {subCourses.length === 0 && (
            <FormHelperText sx={{ color: Color.red }}>
              Phải có ít nhất một khóa học phụ{' '}
            </FormHelperText>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
