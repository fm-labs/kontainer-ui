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

export const navItemsDocker: INavigationItem[] = [
  {
    key: 'dashboard',
    icon: <AppIcons.DockerIcon {...navIconProps} />,
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
  {
    key: 'templates',
    icon: <AppIcons.TemplateIcon {...navIconProps} />,
    label: 'Templates',
    to: '/templates',
  },
]
