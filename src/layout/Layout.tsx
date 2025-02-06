import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'
import LayoutDrawer from './LayoutDrawer.tsx'

// const defaultTheme = createTheme({
//   components: {
//     MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h1: 'h1',
//           h2: 'h2',
//           h3: 'h3',
//           h4: 'h4',
//           h5: 'h5',
//           h6: 'h6',
//           subtitle1: 'h6',
//           subtitle2: 'h6',
//           body1: 'p',
//           body2: 'span',
//         },
//       },
//     },
//   },
// })

const defaultTheme = createTheme({})

export default function Layout({ children }: PropsWithChildren<any>) {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>kstack</title>
      </Helmet>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          {/*<GsLayoutAppBar open={open} toggleDrawer={toggleDrawer} />*/}
          <LayoutDrawer open={open} toggleDrawer={toggleDrawer} />
          <Box
            component='main'
            sx={{
              // backgroundColor: (theme) =>
              //   theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            {/*<Toolbar />*/}
            <div>
              {children}

              {/*<Copyright sx={{ pt: 4 }} />*/}
            </div>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
