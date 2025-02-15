import React from 'react'
import { createBrowserRouter, LoaderFunctionArgs, RouteObject } from 'react-router-dom'
import ContainersPage from './pages/docker/Containers.page.tsx'
import ImagesPage from './pages/docker/Images.page.tsx'
import VolumesPage from './pages/docker/Volumes.page.tsx'
import RoutingLayoutWrapper from './pages/RoutingLayoutWrapper.tsx'
import RoutingErrorBoundary from './pages/RoutingErrorBoundary.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import NetworksPage from './pages/docker/Networks.page.tsx'
import StacksPage from './pages/docker/Stacks.page.tsx'
import StackPage from './pages/docker/StackPage.tsx'
import ContainerPage from './pages/docker/Container.page.tsx'
import PortainerTemplatesPage from './pages/portainer/PortainerTemplates.page.tsx'
import ContainerRunPage from './pages/docker/ContainerRun.page.tsx'
import DashboardPage from './pages/docker/Dashboard.page.tsx'
import EventsPage from './pages/docker/Events.page.tsx'
import ContainerLaunchPage from './pages/docker/ContainerLaunch.page.tsx'
import EnvironmentsPage from './pages/admin/Environments.page.tsx'
import EnvironmentRoutingWrapper from './pages/EnvironmentRoutingWrapper.tsx'
import api from './lib/api2.ts'
import { AGENT_API_BASEURL } from './constants.ts'
import SettingsPage from './pages/admin/Settings.page.tsx'

const getHostApiFromLoaderArgs = (args: LoaderFunctionArgs) => {
  if (!args?.params?.environment) {
    throw new Error('Hostname not provided')
  }

  const apiBaseUrl = `http://${args.params.environment}:5000/api`
  return api(apiBaseUrl)
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RoutingLayoutWrapper />,
    errorElement: <RoutingErrorBoundary />,

    children: [
      {
        index: true,
        //path: 'environments',
        element: <EnvironmentsPage />,
        // loader: async (args) => {
        //   return api(AGENT_API_BASEURL).getEnvironments()()
        // },
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },

      {
        path: ':environment',
        element: <EnvironmentRoutingWrapper />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
            // loader: async (args) => {
            //   return null
            // },
          },
          {
            path: 'docker',
            //element: <DockerWrapper />,
            children: [
              { index: true, element: <DashboardPage /> },
              {
                path: 'containers',
                element: <ContainersPage />,
                loader: async (args) => {
                  return getHostApiFromLoaderArgs(args).getContainers()()
                },
              },
              {
                path: 'containers/create',
                element: <ContainerLaunchPage />,
              },
              {
                path: 'containers/:id',
                element: <ContainerPage />,
                loader: async (args) => {
                  //console.log('Loading container', args)
                  if (!args.params.id) {
                    throw new Error('Container id not provided')
                  }
                  return getHostApiFromLoaderArgs(args).getContainer()(args.params.id)
                },
              },
              {
                path: 'images',
                element: <ImagesPage />,
                loader: async (args) => {
                  return getHostApiFromLoaderArgs(args).getImages()()
                },
              },
              {
                path: 'volumes',
                element: <VolumesPage />,
                loader: async (args) => {
                  return getHostApiFromLoaderArgs(args).getVolumes()()
                },
              },
              {
                path: 'networks',
                element: <NetworksPage />,
                loader: async (args) => {
                  return getHostApiFromLoaderArgs(args).getNetworks()()
                },
              },
              {
                path: 'events',
                element: <EventsPage />,
                loader: async (args) => {
                  return getHostApiFromLoaderArgs(args).getEngineEvents()({})
                },
              },
              {
                path: 'stacks',
                element: <StacksPage />,
                loader: async (args) => {
                  return getHostApiFromLoaderArgs(args).getStacks()()
                },
              },
              {
                path: 'stacks/:id',
                element: <StackPage />,
                loader: async (args) => {
                  if (!args.params.id) {
                    throw new Error('Stack id not provided')
                  }
                  return getHostApiFromLoaderArgs(args).getStack()(args.params.id)
                },
              },
              {
                path: 'templates/portainer',
                element: <PortainerTemplatesPage />,
                // loader: async ({ params }) => {
                //   return getHostApiFromLoaderArgs(args).getProject()(params.id!)
                // },
              },
              {
                path: 'run',
                element: <ContainerRunPage />,
                // loader: async ({ params }) => {
                //   return getHostApiFromLoaderArgs(args).getProject()(params.id!)
                // },
              },
            ],
          },
        ],
      },

      { path: '*', element: <PageNotFound /> },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
