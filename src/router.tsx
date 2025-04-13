import React from 'react'
import { createHashRouter, LoaderFunctionArgs, RouteObject, Navigate } from 'react-router-dom'
import ContainersPage from '~/components/docker/Container/Containers.page.tsx'
import ContainerPage from '~/components/docker/Container/Container.page.tsx'
import ContainerLaunchPage from '~/components/docker/Container/ContainerLaunch.page.tsx'
import DashboardPage from './components/docker/Dashboard/Dashboard.page.tsx'
import ImagesPage from './components/docker/Images/Images.page.tsx'
import NetworksPage from './components/docker/Networks/Networks.page.tsx'
import StacksPage from './components/docker/Stacks/Stacks.page.tsx'
import StackPage from './components/docker/Stacks/StackPage.tsx'
import EventsPage from './components/docker/Engine/Events.page.tsx'
import LoginPage from '~/components/user/Login.page.tsx'
import PortainerTemplatesPage from './components/templates/PortainerTemplates.page.tsx'
import StackTemplatesPage from '~/components/templates/StackTemplates.page.tsx'
import SettingsPage from '~/components/admin/Settings.page.tsx'
import VolumesPage from './components/docker/Volumes/Volumes.page.tsx'
import AuthenticatedRouteWrapper from '~/components/pages/AuthenticatedRouteWrapper.tsx'
import EnvironmentRouteWrapper from '~/components/pages/EnvironmentRouteWrapper.tsx'
import RoutingErrorBoundary from '~/components/pages/RoutingErrorBoundary.tsx'
import PageNotFound from '~/components/pages/PageNotFound.tsx'
import appRepo from './lib/appRepo.ts'
import LogoutPage from '~/components/user/Logout.page.tsx'
import TaskManagerPage from '~/components/tasks/TaskManagerPage.tsx'
import DockerContextRouteWrapper from '~/components/pages/DockerContextRouteWrapper.tsx'
import LayoutRouteWrapper from '~/components/pages/LayoutRouteWrapper.tsx'
import { agentInternalApiForEnv } from '~/lib/agentInternalApi.ts'
import { DEFAULT_ENVIRONMENT } from '~/constants.ts'
import EnvironmentDockerHostsPage from '~/components/pages/EnvironmentDockerHosts.page.tsx'

const getInternalApiFromLoaderArgs = (args: LoaderFunctionArgs) => {
  return agentInternalApiForEnv(DEFAULT_ENVIRONMENT)
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <EnvironmentRouteWrapper />,
    errorElement: <RoutingErrorBoundary />,

    children: [
      // {
      //   index: true,
      //   //path: 'environments',
      //   element: <EnvironmentsPage />,
      //   // loader: async (args) => {
      //   //   return api(AGENT_API_BASEURL).getEnvironments()
      //   // },
      // },
      {
        index: true,
        element: <EnvironmentDockerHostsPage />,
      },
      {
        path: 'connect',
        element: <LoginPage />,
      },
      {
        path: 'disconnect',
        element: <LogoutPage />,
      },

      {
        element: <AuthenticatedRouteWrapper />,
        children: [
          {
            path: 'docker',
            element: <DockerContextRouteWrapper />,
            children: [
              {
                path: ':contextId',
                //element: <LayoutRouteWrapper />,
                children: [
                  { index: true, element: <DashboardPage /> },
                  {
                    path: 'containers',
                    element: <ContainersPage />,
                    loader: async (args) => {
                      //const api = getDockerApiFromLoaderArgs(args)
                      //return api.getContainers()
                      return appRepo(args.params.envId!).listContainers()
                    },
                  },
                  {
                    path: 'containers/create',
                    element: <ContainerLaunchPage />,
                  },
                  {
                    path: 'containers/:containerId',
                    element: <ContainerPage />,
                    // loader: async (args) => {
                    //   //console.log('Loading container', args)
                    //   if (!args.params.id) {
                    //     throw new Error('Container id not provided')
                    //   }
                    //   return getDockerApiFromLoaderArgs(args).getContainer(args.params.id)
                    // },
                  },
                  {
                    path: 'images',
                    element: <ImagesPage />,
                    // loader: async (args) => {
                    //   return getDockerApiFromLoaderArgs(args).getImages()
                    // },
                  },
                  {
                    path: 'volumes',
                    element: <VolumesPage />,
                    // loader: async (args) => {
                    //   return getDockerApiFromLoaderArgs(args).getVolumes()
                    // },
                  },
                  {
                    path: 'networks',
                    element: <NetworksPage />,
                    // loader: async (args) => {
                    //   return getDockerApiFromLoaderArgs(args).getNetworks()
                    // },
                  },
                  {
                    path: 'events',
                    element: <EventsPage />,
                    // loader: async (args) => {
                    //   const since = Math.floor(Date.now() / 1000) - 5 * 60 // last 5 minutes
                    //   return getDockerApiFromLoaderArgs(args).getEngineEvents({ since: since })
                    // },
                  },
                  {
                    path: 'stacks',
                    element: <StacksPage />,
                    // loader: async (args) => {
                    //   //return getHostApiFromLoaderArgs(args).getStacks()
                    //   //const api = getDockerApiFromLoaderArgs(args)
                    //   return appRepo(args.params.envId!).listStacks()
                    // },
                  },
                  {
                    path: 'stacks/:stackId',
                    element: <StackPage />,
                    // loader: async (args) => {
                    //   if (!args.params.id) {
                    //     throw new Error('Stack id not provided')
                    //   }
                    //   return getDockerApiFromLoaderArgs(args).getStack(args.params.id)
                    // },
                  },
                  // {
                  //   path: 'run',
                  //   element: <ContainerRunPage />,
                  // },
                ],
              },
            ],
          }, // # docker

          {
            path: 'templates',
            element: <StackTemplatesPage />,
            loader: async (args) => {
              return getInternalApiFromLoaderArgs(args).listTemplates()
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
            path: 'settings',
            element: <SettingsPage />,
          },

          {
            path: 'tasks',
            element: <TaskManagerPage />,
          },
        ],
      },

      { path: '*', element: <PageNotFound /> },
    ],
  },
]

const router = createHashRouter(routes)

export default router
