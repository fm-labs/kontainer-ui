import React from 'react'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import Home from './pages/docker/Home.tsx'
import ContainersPage from './pages/docker/Containers.page.tsx'
import ImagesPage from './pages/docker/Images.page.tsx'
import VolumesPage from './pages/docker/Volumes.page.tsx'
import RoutingLayoutWrapper from './pages/RoutingLayoutWrapper.tsx'
import api from './api.ts'
import RoutingErrorBoundary from './pages/RoutingErrorBoundary.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import NetworksPage from './pages/docker/Networks.page.tsx'
import ProjectsPage from './pages/docker/Projects.page.tsx'
import ProjectPage from './pages/docker/Project.page.tsx'
import ContainerPage from './pages/docker/Container.page.tsx'
import PortainerTemplatesPage from './pages/portainer/PortainerTemplates.page.tsx'
import ContainerRunPage from './pages/docker/ContainerRun.page.tsx'
import DashboardPage from './pages/docker/Dashboard.page.tsx'
import EventsPage from './pages/docker/Events.page.tsx'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RoutingLayoutWrapper />,
    errorElement: <RoutingErrorBoundary />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: '/containers',
        element: <ContainersPage />,
        loader: async () => {
          return api.getContainers()()
        },
      },
      {
        path: '/container/:id',
        element: <ContainerPage />,
        loader: async ({ params }) => {
          return api.getContainer()(params.id!)
        },
      },
      {
        path: '/images',
        element: <ImagesPage />,
        loader: async () => {
          return api.getImages()()
        },
      },
      {
        path: '/volumes',
        element: <VolumesPage />,
        loader: async () => {
          return api.getVolumes()()
        },
      },
      {
        path: '/networks',
        element: <NetworksPage />,
        loader: async () => {
          return api.getNetworks()()
        },
      },
      {
        path: '/events',
        element: <EventsPage />,
        loader: async () => {
          return api.getEngineEvents()({})
        },
      },
      {
        path: '/projects',
        element: <ProjectsPage />,
        loader: async () => {
          return api.getProjects()()
        },
      },
      {
        path: '/projects/:id',
        element: <ProjectPage />,
        loader: async ({ params }) => {
          return api.getProject()(params.id!)
        },
      },
      {
        path: '/templates/portainer',
        element: <PortainerTemplatesPage />,
        // loader: async ({ params }) => {
        //   return api.getProject()(params.id!)
        // },
      },
      {
        path: '/run',
        element: <ContainerRunPage />,
        // loader: async ({ params }) => {
        //   return api.getProject()(params.id!)
        // },
      },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
