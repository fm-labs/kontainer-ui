import React, { ChangeEvent } from 'react'
import {
  Menu,
  MenuItem,
  ListSubheader,
  Divider,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Link,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import BusinessIcon from '@mui/icons-material/Business'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import { SiDocker } from 'react-icons/si'
import { useNavigate } from 'react-router'
import { DockerHost } from '~/types.ts'

const DropdownNav = ({ anchorEl, open, onClose }) => {
  const { dockerHosts, buildUrl } = useEnvironment()
  const { dockerHost: activeDockerHost } = useDockerContext()
  const navigate = useNavigate()

  const handleDockerHostChange = (dockerHost: DockerHost) => {
    //setSelectedHost(e.target.value)
    // console.log('HOST CHANGED', dockerHostId)
    //
    // const host = dockerHosts.find((h) => h.id === dockerHostId)
    // if (!host) {
    //   console.error('Host not found for', dockerHostId)
    //   return
    // }

    // set in session storage
    //const baseUrl = `http://${host.ip}:5000/api/`
    //sessionStorage.setItem('AGENT_API_BASEURL', baseUrl)
    //const redirectUrl = buildUrl(`/docker/${dockerHost.id}/`)
    const redirectUrl = `/docker/${dockerHost.id}/`
    navigate(redirectUrl)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      slotProps={{
        list: {
          'aria-labelledby': 'dropdown-button',
          role: 'menu',
        },
        paper: {
          elevation: 4,
          sx: {
            borderRadius: 2,
            mt: 1.5,
            minWidth: 280,
          },
        },
      }}
    >
      <ListSubheader>Docker Hosts</ListSubheader>

      {dockerHosts.map((dockerHost) => (
        <MenuItem
          //component='a'
          //href='#'
          selected
          sx={{ alignItems: 'flex-start' }}
          key={dockerHost.id}
          onClick={() => handleDockerHostChange(dockerHost)}
        >
          <ListItemIcon>
            <Avatar variant='rounded'>
              <SiDocker />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={dockerHost.id}
            secondary={dockerHost.host}
            slotProps={{
              primary: { sx: { fontWeight: 500 } },
            }}
            sx={{
              px: 1,
            }}
          />
          {activeDockerHost.id === dockerHost.id && (
            <ListItemIcon sx={{ justifyContent: 'flex-end', pt: 1.5 }}>
              <CheckIcon color='primary' fontSize='small' />
            </ListItemIcon>
          )}
        </MenuItem>
      ))}

      {/*<Divider />*/}

      {/*<ListSubheader>Organizations</ListSubheader>*/}

      {/*<MenuItem component={Link} href='#' underline='always'>
        <ListItemIcon>
          <Avatar variant='rounded'>
            <AddIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary='Create organization' slotProps={{ primary: { fontWeight: 500 } }} />
      </MenuItem>*/}

      {/*<Divider />*/}
    </Menu>
  )
}

export default DropdownNav
