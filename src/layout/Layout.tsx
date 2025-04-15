import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'
import LayoutDrawer from './LayoutDrawer.tsx'
import AppTheme from './AppTheme.tsx'

export default function Layout({ children }: PropsWithChildren<any>) {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <AppTheme>
      <Helmet>
        <title>kontainer</title>
      </Helmet>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <LayoutDrawer open={open} toggleDrawer={toggleDrawer} />
          <Box
            component='main'
            sx={{
              // backgroundColor: (theme) =>
              //   theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              paddingTop: '0.5rem',
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
    </AppTheme>
  )
}
