export const handleDefinedTextReturnComp = (
  text: string | number | undefined
) => {
  // console.log('text', text);
  if (text) {
    // console.log('text', text);
    return text;
  }
  if (text === undefined) {
    // console.log('Thông tin không tồn tại');
    return <b style={{ color: 'red' }}>Không tồn tại</b>;
  }
  // console.log('Đã xảy ra lỗ1');
  return <b style={{ color: 'red' }}>Xảy ra lỗi</b>;
};
