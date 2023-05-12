import { useState } from 'react';
import { Stack, Typography, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { addIntroduceCode } from '~/redux/user/slice';
import { selectIntroduceCode } from '~/redux/user/selector';

export default function IntroduceCodeInput() {
  const dispatch = useDispatch();

  const slIntroduceCode = useSelector(selectIntroduceCode);
  const [text, setText] = useState<string>('');
  const [code, setCode] = useState<string>(slIntroduceCode);

  const handleChangeText = (e: any) => {
    setText(e.target.value);
  };

  const handleChangeIntroduceCode = () => {
    setText('');
    setCode(text);
    dispatch(addIntroduceCode(text));
  };

  const handleCodeDelete = () => {
    setCode('');
    dispatch(addIntroduceCode(text));
  };

  return code ? (
    <Stack
      marginTop={2}
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          marginTop: MetricSize.small_10,
          fontFamily: FontFamily.bold,
          fontSize: FontSize.small_18,
        }}
      >
        Mã giới thiệu
      </Typography>
      <Chip label={code} onDelete={handleCodeDelete} />
    </Stack>
  ) : (
    <>
      <Typography
        sx={{
          marginTop: MetricSize.small_10,
          fontFamily: FontFamily.bold,
          fontSize: FontSize.small_18,
        }}
      >
        Mã giới thiệu
      </Typography>
      <Stack
        sx={{
          borderRadius: '5px',
          marginTop: MetricSize.medium_15,
          flexDirection: 'row',
        }}
      >
        <input
          style={{
            flexGrow: 1,
            borderColor: Color.grey,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderLeftWidth: 0.5,
            borderRightWidth: 0,
            paddingLeft: MetricSize.small_5,
          }}
          type="text"
          value={text}
          onChange={handleChangeText}
        />
        <input
          style={{
            backgroundColor: Color.orange,
            borderWidth: 0,
            padding: MetricSize.small_10,
            width: '20%',
            color: Color.white,
            fontFamily: FontFamily.bold,
            fontSize: FontSize.small_18,
          }}
          onClick={handleChangeIntroduceCode}
          type="button"
          value="Thêm"
        />
      </Stack>
    </>
  );
}
