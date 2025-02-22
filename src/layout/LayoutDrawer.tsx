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
import { navItemsDocker, navItemsHost, navItemsMain } from './navigation.tsx'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
// import Typography from '@mui/material/Typography'
// import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
// import { FaServer } from 'react-icons/fa6'
// import { useLocation, useNavigate } from 'react-router'
// import { useMatches } from 'react-router-dom'
// import Box from '@mui/material/Box'
import { useEnvRoute } from '../helper/useEnvRoute.ts'

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
  //const availableHosts = getHosts()
  //const [selectedHost, setSelectedHost] = React.useState<string>(availableHosts[0].hostname) // host id
  //const navigate = useNavigate()
  const envRoute = useEnvRoute()

  const envRouted = (items) => {
    return items.map((item) => {
      return {
        ...item,
        to: envRoute.buildEnvUrl(item.to),
      }
    })
  }

  // const handleHostChange = (e: SelectChangeEvent) => {
  //   setSelectedHost(e.target.value)
  //   console.log('HOST CHANGED', e.target.value)
  //
  //   const host = availableHosts.find((h) => h.hostname === e.target.value)
  //   if (!host) {
  //     console.error('Host not found', e.target.value)
  //     return
  //   }
  //
  //   // set in session storage
  //   //const baseUrl = `http://${host.ip}:5000/api/`
  //   //sessionStorage.setItem('AGENT_API_BASEURL', baseUrl)
  //   const redirectUrl = `/${host.hostname}/`
  //   navigate(redirectUrl)
  // }

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
        {/*props?.open && <Typography variant={'subtitle1'}>k:stack</Typography>*/}
        {/*<span style={{ display: 'inline-block', marginLeft: '0.5em' }}>
          <FaServer />
        </span>*/}
        {props?.open && (
          <>
            {/*<select value={selectedHost} onChange={handleHostChange}>
              {availableHosts.map((host) => (
                <option key={host.id} value={host.id}>
                  {host.name}
                </option>
              ))}
            </select>*/}
          </>
        )}
        <IconButton onClick={props?.toggleDrawer}>{props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </Toolbar>
      <Divider />
      {/*<Box sx={{ p: 1, width: '100%' }}>
        <Select fullWidth={true} variant={'standard'} value={selectedHost?.toString()} onChange={handleHostChange}>
          {availableHosts.map((host) => (
            <MenuItem key={host.hostname} value={host.hostname}>
              {host.hostname}
            </MenuItem>
          ))}
        </Select>
      </Box>*/}
      <List component='nav'>
        {/*<NavListItems items={navItemsMain} />*/}
        {/*<Divider sx={{ my: 1 }} />*/}
        <NavListItems items={envRouted(navItemsDocker)} />
        <Divider sx={{ my: 1 }} />
        <NavListItems items={envRouted(navItemsHost)} />
        <Divider sx={{ my: 1 }} />
        {/*<NavListItems items={navItemsKube} />*/}
        {/*<Divider sx={{ my: 1 }} />*/}
        {/*<DeveloperNavListItems items={navItemsGsTools} />*/}
      </List>
    </Drawer>
  )
}

export default LayoutDrawer
