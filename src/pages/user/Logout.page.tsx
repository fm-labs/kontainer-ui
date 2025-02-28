import React from 'react'
import Button from '@mui/material/Button'
import { useAuth } from '../../context/AuthProvider.tsx'
import { useNavigate } from 'react-router'
import Container from '@mui/material/Container'

const LogoutPage = () => {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    logout().then(() => {
      console.log('Logged out')
      navigate('/')
    })
  }

  if (!isAuthenticated) {
    return <div>You are not logged in</div>
  }

  return (
    <Container maxWidth={'md'} sx={{ mt: 3 }}>
      <h1>Disconnect from Environment</h1>
      <Button variant={'contained'} onClick={handleLogoutClick}>
        Disconnect now
      </Button>
    </Container>
  )
}

export default LogoutPage
