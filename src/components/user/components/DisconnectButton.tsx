import React from 'react'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'
import AppIcons from '~/elements/AppIcons.tsx'
import { useEnvApi } from '~/helper/useEnvApi.ts'
import { useAuth } from '~/helper/useAuth.tsx'
import { writeEnvAuthToken } from '~/lib/authStorage.ts'

const DisconnectButton = () => {
  const { env } = useEnvApi()
  const envId = env.id
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleDisconnectClick = () => {
    logout().finally(() => {
      console.log('Disconnected')
      writeEnvAuthToken(envId, null)
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
