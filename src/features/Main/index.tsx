import { Typography } from '@mui/material'
import { Stack } from '@mui/system'

export default function Main() {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
      }}
    >
      <Typography fontFamily={'Roboto-Regular'} variant="h1" textAlign={'center'}>
        BSMART
      </Typography>
    </Stack>
  )
}
