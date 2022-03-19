import { createTheme } from '@mui/material'
import { grey, purple } from '@mui/material/colors'

const defaultFonts = ['sans-serif']

const {
  shadows: [none, _1st, ...defaultShadows],
} = createTheme()

export const theme = createTheme({
  palette: {
    grey: {
      ...grey,
      '200': '#9197B3',
    },
    primary: {
      ...purple,
      main: '#5932EA',
    },
    background: {
      default: '#FAFBFF',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: ["'Poppins'", ...defaultFonts].join(', '),
  },
  shadows: [
    'none',
    '0px 10px 60px rgba(226, 236, 249, 0.5)',
    ...defaultShadows,
  ],
})
