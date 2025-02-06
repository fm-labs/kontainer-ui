import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { MUI_DRAWER_WIDTH, MUI_DRAWER_WIDTH_DOCKED } from './layout.constants.ts'
import NavListItems from './NavListItems.tsx'
import { navItemsDocker } from './navigation.tsx'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Typography from '@mui/material/Typography'

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: MUI_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      //width: theme.spacing(5),
      width: MUI_DRAWER_WIDTH_DOCKED,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7),
      },
    }),
  },
}))

interface DeveloperLayoutDrawerProps {
  open?: boolean
  toggleDrawer?: () => void
}

const LayoutDrawer = (props: DeveloperLayoutDrawerProps) => {
  return (
    <Drawer variant='permanent' open={props?.open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: [1],
        }}
      >
        {props?.open && <Typography variant={'subtitle1'}>k:stack</Typography>}
        <IconButton onClick={props?.toggleDrawer}>{props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </Toolbar>
      <Divider />
      <List component='nav'>
        <NavListItems items={navItemsDocker} />
        {/*<Divider sx={{ my: 1 }} />*/}
        {/*<NavListItems items={navItemsKube} />*/}
        {/*<Divider sx={{ my: 1 }} />*/}
        {/*<DeveloperNavListItems items={navItemsGsTools} />*/}
      </List>
    </Drawer>
  )
}

export default LayoutDrawer
