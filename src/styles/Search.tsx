import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',

  width: '100%',
  border: '2px solid',
  borderColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,

  backgroundColor: alpha(theme.palette.common.white, 0.15),

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  pointerEvents: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: theme.spacing(0, 2),
  height: '100%',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',

  '& .MuiInputBase-input': {
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
  },
}))
