import React from 'react'
import SignIn from '../../components/sign-in/SignIn.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider.tsx'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  const onSubmit = (data) => {
    console.log('Login form submitted', data)
    login(data)
      .then(() => {
        toast.success('Login successful')
      })
      .catch((error) => {
        const msg = error?.response?.data?.error || error?.message || 'Login failed'
        toast.error(msg)
        //throw error
      })

    return false
  }

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      {isAuthenticated && <>You are already logged in</>}
      <SignIn onSubmit={onSubmit} />
    </>
  )
}

export default LoginPage
