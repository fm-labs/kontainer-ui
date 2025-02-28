import React from 'react'
import { createBrowserRouter, LoaderFunctionArgs, RouteObject } from 'react-router-dom'
import ContainersPage from './pages/docker/Containers.page.tsx'
import ContainerPage from './pages/docker/Container.page.tsx'
import ContainerLaunchPage from './pages/docker/ContainerLaunch.page.tsx'
import DashboardPage from './pages/docker/Dashboard.page.tsx'
import ImagesPage from './pages/docker/Images.page.tsx'
import NetworksPage from './pages/docker/Networks.page.tsx'
import StacksPage from './pages/docker/Stacks.page.tsx'
import StackPage from './pages/docker/StackPage.tsx'
import EventsPage from './pages/docker/Events.page.tsx'
import EnvironmentsPage from './pages/Environments.page.tsx'
import LoginPage from './pages/user/Login.page.tsx'
import PortainerTemplatesPage from './pages/portainer/PortainerTemplates.page.tsx'
import StackTemplatesPage from './pages/admin/StackTemplates.page.tsx'
import SettingsPage from './pages/admin/Settings.page.tsx'
import VolumesPage from './pages/docker/Volumes.page.tsx'
import AuthenticatedRouteWrapper from './pages/AuthenticatedRouteWrapper.tsx'
import EnvironmentRouteWrapper from './pages/EnvironmentRouteWrapper.tsx'
import RoutingErrorBoundary from './pages/RoutingErrorBoundary.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import api from './lib/api2.ts'
import appRepo from './lib/repo.ts'
import { restoreEnvsFromLocalStorage } from './helper/useEnvironments.ts'
import AuthProviderRouteWrapper from './pages/AuthProviderRouteWrapper.tsx'
import { DEFAULT_ENVIRONMENTS, MASTER_AGENT_PORT } from './constants.ts'

const getEnvApiFromLoaderArgs = (args: LoaderFunctionArgs) => {
  //const { envs } = useEnvironments()
  if (!args?.params?.envId) {
    throw new Error('Not in an environment')
  }

  const envId = args.params.envId
  let envs = restoreEnvsFromLocalStorage()
  if (!envs) {
    envs = DEFAULT_ENVIRONMENTS
  }
  const env = envs.find((env) => env.id === envId)
  if (!env) {
    throw new Error(`Environment ${envId} not found`)
  }

  const urlSchema = env.useSSL ? 'https' : 'http'
  const hostname = env.hostname || 'localhost'
  const agentPort = env.agentPort || MASTER_AGENT_PORT
  const apiBaseUrl = `${urlSchema}://${hostname}:${agentPort}/api`
  const authToken = localStorage.getItem('authToken') || undefined
  return api(apiBaseUrl, authToken)
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthProviderRouteWrapper />,
    errorElement: <RoutingErrorBoundary />,

    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <AuthenticatedRouteWrapper />,
        children: [
          {
            index: true,
            //path: 'environments',
            element: <EnvironmentsPage />,
            // loader: async (args) => {
            //   return api(AGENT_API_BASEURL).getEnvironments()
            // },
          },
          {
            path: ':envId',
            element: <EnvironmentRouteWrapper />,
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

          { path: '*', element: <PageNotFound /> },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
