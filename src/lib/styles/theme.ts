import { createTheme } from '@mui/material'

const defaultFonts = ['cursive']

export const theme = createTheme({
  typography: {
    fontFamily: ['Shizuru', ...defaultFonts].join(''),
  },
})
