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
import ProjectsPage from './components/Projects.page.tsx'
import ProjectPage from './components/Project.page.tsx'
import ContainerPage from './components/Container.page.tsx'

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
      { path: "/container/:id", element: <ContainerPage />, loader: async ({params}) => {
          return api.getContainer()(params.id!)
        }},
      { path: "/images", element: <ImagesPage />, loader: async () => {
          return api.getImages()()
        }},
      { path: "/volumes", element: <VolumesPage />, loader: async () => {
          return api.getVolumes()()
        }},
      { path: "/networks", element: <NetworksPage />, loader: async () => {
          return api.getNetworks()()
        }},
      { path: "/projects", element: <ProjectsPage />, loader: async () => {
          return api.getProjects()()
        }},
      { path: "/projects/:id",
        element: <ProjectPage />,
        loader: async ({params}) => {
          return api.getProject()(params.id!)
        }},
      { path: '*', element: <PageNotFound/> },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
