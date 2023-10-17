import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Home from './components/Home'
import ContainersPage from './components/Containers.page.tsx'
import ImagesPage from './components/Images.page.tsx'
import VolumesPage from './components/Volumes.page.tsx'
import LayoutRouteWrapper from './components/LayoutRouteWrapper.tsx'
import api from './api.ts'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutRouteWrapper />,
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
      { path: '*', element: <>PAGE NOT FOUND</> },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
