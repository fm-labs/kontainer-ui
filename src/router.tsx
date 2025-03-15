import React from 'react'
import { createBrowserRouter, LoaderFunctionArgs, RouteObject } from 'react-router-dom'
import ContainersPage from '~/components/docker/Container/Containers.page.tsx'
import ContainerPage from '~/components/docker/Container/Container.page.tsx'
import ContainerLaunchPage from '~/components/docker/Container/ContainerLaunch.page.tsx'
import DashboardPage from './components/docker/Dashboard/Dashboard.page.tsx'
import ImagesPage from './components/docker/Images/Images.page.tsx'
import NetworksPage from './components/docker/Networks/Networks.page.tsx'
import StacksPage from './components/docker/Stacks/Stacks.page.tsx'
import StackPage from './components/docker/Stacks/StackPage.tsx'
import EventsPage from './components/docker/Engine/Events.page.tsx'
import EnvironmentsPage from '~/components/pages/Environments.page.tsx'
import LoginPage from '~/components/user/Login.page.tsx'
import PortainerTemplatesPage from './components/templates/PortainerTemplates.page.tsx'
import StackTemplatesPage from '~/components/templates/StackTemplates.page.tsx'
import SettingsPage from '~/components/admin/Settings.page.tsx'
import VolumesPage from './components/docker/Volumes/Volumes.page.tsx'
import AuthenticatedRouteWrapper from '~/components/pages/AuthenticatedRouteWrapper.tsx'
import EnvironmentRouteWrapper from '~/components/pages/EnvironmentRouteWrapper.tsx'
import RoutingErrorBoundary from '~/components/pages/RoutingErrorBoundary.tsx'
import PageNotFound from '~/components/pages/PageNotFound.tsx'
import api from './lib/api2.ts'
import appRepo from './lib/repo.ts'
import { restoreEnvsFromLocalStorage } from './helper/useEnvironments.ts'
import LogoutPage from '~/components/user/Logout.page.tsx'
import { DEFAULT_ENVIRONMENT } from './constants.ts'

const getEnvApiFromLoaderArgs = (args: LoaderFunctionArgs) => {
  //const { envs } = useEnvironments()
  if (!args?.params?.envId) {
    throw new Error('Not in an environment')
  }

  const envId = args.params.envId
  let envs = restoreEnvsFromLocalStorage()
  if (!envs) {
    envs = [DEFAULT_ENVIRONMENT]
  }
  const env = envs.find((env) => env.id === envId)
  if (!env) {
    throw new Error(`Environment ${envId} not found`)
  }
  return api(env)
}

const routes: RouteObject[] = [
  {
    path: '/',
    //element: <AuthProviderRouteWrapper />,
    errorElement: <RoutingErrorBoundary />,

    children: [
      {
        index: true,
        //path: 'environments',
        element: <EnvironmentsPage />,
        // loader: async (args) => {
        //   return api(AGENT_API_BASEURL).getEnvironments()
        // },
      },

      { path: '*', element: <PageNotFound /> },

      {
        path: ':envId',
        element: <EnvironmentRouteWrapper />,
        children: [
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
                      const api = getEnvApiFromLoaderArgs(args)
                      //return api.getContainers()
                      return appRepo(args.params.envId!, api).listContainers()
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
                      return getEnvApiFromLoaderArgs(args).getContainer(args.params.id)
                    },
                  },
                  {
                    path: 'images',
                    element: <ImagesPage />,
                    loader: async (args) => {
                      return getEnvApiFromLoaderArgs(args).getImages()
                    },
                  },
                  {
                    path: 'volumes',
                    element: <VolumesPage />,
                    loader: async (args) => {
                      return getEnvApiFromLoaderArgs(args).getVolumes()
                    },
                  },
                  {
                    path: 'networks',
                    element: <NetworksPage />,
                    loader: async (args) => {
                      return getEnvApiFromLoaderArgs(args).getNetworks()
                    },
                  },
                  {
                    path: 'events',
                    element: <EventsPage />,
                    loader: async (args) => {
                      const since = Math.floor(Date.now() / 1000) - 5 * 60 // last 5 minutes
                      return getEnvApiFromLoaderArgs(args).getEngineEvents({ since: since })
                    },
                  },
                  {
                    path: 'stacks',
                    element: <StacksPage />,
                    loader: async (args) => {
                      //return getHostApiFromLoaderArgs(args).getStacks()
                      const api = getEnvApiFromLoaderArgs(args)
                      return appRepo(args.params.envId!, api).listStacks()
                    },
                  },
                  {
                    path: 'stacks/:id',
                    element: <StackPage />,
                    loader: async (args) => {
                      if (!args.params.id) {
                        throw new Error('Stack id not provided')
                      }
                      return getEnvApiFromLoaderArgs(args).getStack(args.params.id)
                    },
                  },
                  // {
                  //   path: 'run',
                  //   element: <ContainerRunPage />,
                  // },
                ],
              }, // # docker

              {
                path: 'templates',
                element: <StackTemplatesPage />,
                loader: async (args) => {
                  return getEnvApiFromLoaderArgs(args).listTemplates()
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
            ],
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
