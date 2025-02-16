import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'
import AppTheme from './AppTheme.tsx'

export default function ConnectLayout({ children }: PropsWithChildren<any>) {
  return (
    <AppTheme>
      <Helmet>
        <title>kstack</title>
      </Helmet>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
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
            <div>{children}</div>
          </Box>
        </Box>
      </LocalizationProvider>
    </AppTheme>
  )
}
