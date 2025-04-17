import React from 'react'
import { INavigationItem } from './navigation.types.ts'
import AppIcons from '../elements/AppIcons.tsx'
import { KONTAINER_FEATURE_SETTINGS, KONTAINER_FEATURE_TASKMANAGER, KONTAINER_FEATURE_TEMPLATES } from '~/constants.ts'

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
    visible: () => KONTAINER_FEATURE_TEMPLATES,
  },

  {
    key: 'settings',
    icon: <AppIcons.SettingsIcon {...navIconProps} />,
    label: 'Settings',
    to: '/settings',
    visible: () => KONTAINER_FEATURE_SETTINGS,
  },

  {
    key: 'tasks',
    icon: <AppIcons.SettingsIcon {...navIconProps} />,
    label: 'Tasks',
    to: '/tasks',
    visible: () => KONTAINER_FEATURE_TASKMANAGER,
  },
]

export const navItemsDocker: INavigationItem[] = [
  {
    key: 'dashboard',
    icon: <AppIcons.DashboardIcon {...navIconProps} />,
    label: 'Dashboard',
    to: '/',
  },
  {
    key: 'containers',
    icon: <AppIcons.ContainerIcon {...navIconProps} />,
    label: 'Containers',
    to: '/containers',
  },
  {
    key: 'stacks',
    icon: <AppIcons.StackIcon {...navIconProps} />,
    label: 'Stacks',
    to: '/stacks',
  },
  {
    key: 'images',
    icon: <AppIcons.ImageIcon {...navIconProps} />,
    label: 'Images',
    to: '/images',
  },
  {
    key: 'volumes',
    icon: <AppIcons.VolumeIcon {...navIconProps} />,
    label: 'Volumes',
    to: '/volumes',
  },
  {
    key: 'networks',
    icon: <AppIcons.NetworkIcon {...navIconProps} />,
    label: 'Networks',
    to: '/networks',
  },
  {
    key: 'events',
    icon: <AppIcons.EventIcon {...navIconProps} />,
    label: 'Events',
    to: '/events',
  },
]
