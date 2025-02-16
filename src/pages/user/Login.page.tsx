import React from 'react'
import SignIn from '../../components/sign-in/SignIn.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import useAuth from '../../helper/useAuth.ts'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  const onSubmit = (data) => {
    console.log('Login form submitted', data)
    login(data)
      .then(() => {
        toast.success('Login successful')
      })
      .then(() => navigate('/0/'))
  }

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <SignIn onSubmit={onSubmit} />
    </>
  )
}

export default LoginPage
