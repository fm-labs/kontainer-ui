import React from 'react'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'
import AppIcons from '~/elements/AppIcons.tsx'
import { useAuth } from '~/helper/useAuth.tsx'
import { storeAuthToken } from '~/lib/authStorage.ts'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

const DisconnectButton = () => {
  const { environment } = useEnvironment()
  const envId = environment.id
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleDisconnectClick = () => {
    logout().finally(() => {
      console.log('Disconnected')
      storeAuthToken(envId, null)
      navigate('/')
    })
  }

  return (
    <React.Fragment>
      <Button variant={'outlined'} onClick={handleDisconnectClick} startIcon={<AppIcons.DisconnectIcon />}>
        Disconnect
      </Button>
    </React.Fragment>
  )
}

export default DisconnectButton
