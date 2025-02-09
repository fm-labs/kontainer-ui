import React from 'react'
import { INavigationItem } from './navigation.types.ts'
import AppIcons from '../elements/AppIcons.tsx'

const navIconProps = {
  size: 24,
}

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
  // {
  //   key: 'run',
  //   icon: <FaTerminal {...navIconProps} />,
  //   label: 'Run',
  //   to: '/run',
  // },
  {
    key: 'events',
    icon: <AppIcons.EventIcon {...navIconProps} />,
    label: 'Events',
    to: '/events',
  },
]
