import React from 'react'
import { INavigationItem } from './navigation.types.ts'
import AppIcons from '../elements/AppIcons.tsx'

const navIconProps = {
  size: 24,
}

export const navItemsMain: INavigationItem[] = [
  {
    key: 'environments',
    icon: <AppIcons.HomeIcon {...navIconProps} />,
    label: 'Environments',
    to: '/',
  },
]

export const navItemsHost: INavigationItem[] = [
  {
    key: 'templates',
    icon: <AppIcons.TemplateIcon {...navIconProps} />,
    label: 'Templates',
    to: '/templates',
  },

  {
    key: 'settings',
    icon: <AppIcons.SettingsIcon {...navIconProps} />,
    label: 'Settings',
    to: '/settings',
  },

  {
    key: 'tasks',
    icon: <AppIcons.SettingsIcon {...navIconProps} />,
    label: 'Tasks',
    to: '/tasks',
  },
]

export const navItemsDocker: INavigationItem[] = [
  {
    key: 'dashboard',
    icon: <AppIcons.DashboardIcon {...navIconProps} />,
    label: 'Dashboard',
    to: '/docker/',
  },
  {
    key: 'containers',
    icon: <AppIcons.ContainerIcon {...navIconProps} />,
    label: 'Containers',
    to: '/docker/containers',
  },
  {
    key: 'stacks',
    icon: <AppIcons.StackIcon {...navIconProps} />,
    label: 'Stacks',
    to: '/docker/stacks',
  },
  {
    key: 'images',
    icon: <AppIcons.ImageIcon {...navIconProps} />,
    label: 'Images',
    to: '/docker/images',
  },
  {
    key: 'volumes',
    icon: <AppIcons.VolumeIcon {...navIconProps} />,
    label: 'Volumes',
    to: '/docker/volumes',
  },
  {
    key: 'networks',
    icon: <AppIcons.NetworkIcon {...navIconProps} />,
    label: 'Networks',
    to: '/docker/networks',
  },
  {
    key: 'events',
    icon: <AppIcons.EventIcon {...navIconProps} />,
    label: 'Events',
    to: '/docker/events',
  },
]
