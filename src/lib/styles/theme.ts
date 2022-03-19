import { createTheme } from '@mui/material'
import { grey, purple } from '@mui/material/colors'
import darkScrollbar from '@mui/material/darkScrollbar'

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
    text: {
      secondary: '#9197B3',
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar({
          active: grey[500],
          thumb: grey[400],
          track: grey[200],
        }),
      },
    },
  },
})
