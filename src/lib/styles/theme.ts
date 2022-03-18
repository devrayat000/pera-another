import { createTheme } from '@mui/material'

const defaultFonts = ['sans-serif']

export const theme = createTheme({
  typography: {
    fontFamily: ["'Poppins'", ...defaultFonts].join(', '),
  },
})
