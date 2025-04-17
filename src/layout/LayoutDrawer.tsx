import React from 'react'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import MuiDrawer from '@mui/material/Drawer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import DropdownNav from '~/layout/DropdownNav.tsx'
import DropdownTriggerButton from '~/layout/DropdownTriggerButton.tsx'
import NavListItems from './NavListItems.tsx'
import { navItemsDocker, navItemsHost } from './navigation.tsx'
import { MUI_DRAWER_WIDTH, MUI_DRAWER_WIDTH_DOCKED } from './layout.constants.ts'

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
  const { buildUrl } = useEnvironment()
  const dockerContext = useDockerContext()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const dropdownOpen = Boolean(anchorEl)

  const envRouted = (items) => {
    return items.map((item) => {
      return {
        ...item,
        to: buildUrl(item.to),
      }
    })
  }

  const dockerContextRouted = (items) => {
    if (!dockerContext) {
      console.error('Docker context not found')
      return items
    }
    return items.map((item) => {
      return {
        ...item,
        to: dockerContext.buildUrl(`${item.to}`),
      }
    })
  }

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
            <>
              <DropdownTriggerButton onClick={(event) => setAnchorEl(event.currentTarget)} />
              <DropdownNav anchorEl={anchorEl} open={dropdownOpen} onClose={() => setAnchorEl(null)} />
            </>

            {/*<div>{selectedHost}</div>
            <select value={selectedHost} onChange={handleDockerHostChange}>
              {dockerHosts.map((host) => (
                <option key={host.id} value={host.id}>
                  {host.id}
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
        {dockerContext && <NavListItems items={dockerContextRouted(navItemsDocker)} />}
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
