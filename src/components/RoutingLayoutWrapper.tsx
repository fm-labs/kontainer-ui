import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from './Layout.tsx'

const RoutingLayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default RoutingLayoutWrapper
