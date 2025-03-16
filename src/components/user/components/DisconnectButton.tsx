import React from 'react'
import { useEnvApi } from '~/helper/useEnvApi.ts'
import { useAuth } from '~/helper/useAuth.tsx'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'
import AppIcons from '~/elements/AppIcons.tsx'

const DisconnectButton = () => {
  const { env } = useEnvApi()
  const envId = env.id
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleDisconnectClick = () => {
    logout().then(() => {
      console.log('Disconnected')
      localStorage.removeItem(envId + '.authToken')
      navigate('/')
    })
  }

  return (
    <React.Fragment>
      <Button variant={'outlined'} onClick={handleDisconnectClick} startIcon={<AppIcons.DisconnectIcon />}>
        Disconnect
      </Button>
      {/*<AutoreloadButton autoloader={autoloader} />*/}
    </React.Fragment>
  )
}

export default DisconnectButton
