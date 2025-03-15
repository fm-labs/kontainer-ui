import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../layout/Layout.tsx'

const LayoutRouteWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default LayoutRouteWrapper
