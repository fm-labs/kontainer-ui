import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Home from './components/Home'
import ContainersPage from './components/Containers.page.tsx'
import ImagesPage from './components/Images.page.tsx'
import VolumesPage from './components/Volumes.page.tsx'
import RoutingLayoutWrapper from './components/RoutingLayoutWrapper.tsx'
import api from './api.ts'
import RoutingErrorBoundary from './components/RoutingErrorBoundary.tsx'
import PageNotFound from './components/PageNotFound.tsx'
import NetworksPage from './components/Networks.page.tsx'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RoutingLayoutWrapper />,
    errorElement: <RoutingErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "/containers", element: <ContainersPage />, loader: async () => {
          return api.getContainers()()
        }},
      { path: "/images", element: <ImagesPage />, loader: async () => {
          return api.getImages()()
        }},
      { path: "/volumes", element: <VolumesPage />, loader: async () => {
          //return api.getVolumes()()
          return []
        }},
      { path: "/networks", element: <NetworksPage />, loader: async () => {
          //return api.getVolumes()()
          return []
        }},
      { path: '*', element: <PageNotFound/> },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
