import * as React from 'react'
import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'
import LayoutDrawer from './LayoutDrawer.tsx'
import LayoutFooter from '~/layout/LayoutFooter.tsx'

export default function Layout({ children }: PropsWithChildren<any>) {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
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
          <LayoutFooter />
        </Box>
      </Box>
    </>
  )
}
