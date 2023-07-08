import { Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { Color, MetricSize } from '~/assets/variables';

interface Props {
  slides: string[];
}

export default function ImageSlider({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChangeIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeIndex === slides.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useState, activeIndex]);

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {slides.map((item, index) => (
        <Box
          key={item}
          component="img"
          alt="anh nen"
          sx={{
            width: activeIndex === index ? '100%' : 0,
            height: '450px',
            objectFit: 'cover',
            opacity: activeIndex === index ? 1 : 0,
            transition: 'all 1s ease',
            borderRadius: MetricSize.small_10,
            background: Color.white,
          }}
          src={item}
        />
      ))}
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          borderRadius: MetricSize.small_10,
          background:
            'linear-gradient(0deg, rgba(28,25,50,0.6643907563025211) 10%, rgba(255,255,255,0) 100%)',
        }}
      />
      <Stack
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {slides.map((item, index) => (
          <Stack
            key={item}
            onClick={() => handleChangeIndex(index)}
            sx={{
              margin: 1,
              boxShadow: 3,
              width: '10px',
              borderRadius: 1000,
              height: undefined,
              aspectRatio: 1,
              background: activeIndex === index ? Color.white : Color.grey,
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
