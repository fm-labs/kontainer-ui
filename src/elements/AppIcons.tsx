import {
  HiHeart,
  HiOutlineCube,
  HiOutlineCubeTransparent,
  HiOutlineHeart,
  HiOutlinePlay,
  HiOutlineServer,
  HiPause,
  HiStop,
  HiTrash,
} from 'react-icons/hi2'
import { FaDocker, FaGauge, FaLayerGroup, FaNetworkWired, FaTag, FaTags } from 'react-icons/fa6'
import { FaHistory, FaHome } from 'react-icons/fa'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import GitHubIcon from '@mui/icons-material/GitHub'
import SourceIcon from '@mui/icons-material/Source'
import BugReportIcon from '@mui/icons-material/BugReport'

const AppIcons = {
  DockerIcon: FaDocker,
  EnvironmentIcon: FaGauge,
  HomeIcon: FaHome,

  // Container
  ContainerIcon: HiOutlineCube,
  ContainerStartIcon: HiOutlinePlay,
  ContainerPauseIcon: HiPause,
  ContainerStopIcon: HiStop,
  ContainerDeleteIcon: HiTrash,

  // Stack
  StackIcon: FaLayerGroup,

  // Image
  ImageIcon: HiOutlineCubeTransparent,

  // Volume
  VolumeIcon: HiOutlineServer,

  // Network
  NetworkIcon: FaNetworkWired,

  // Event
  EventIcon: FaHistory,

  // Misc
  BugIcon: BugReportIcon,
  GitHubIcon: GitHubIcon,
  LabelIcon: FaTag,
  LabelsIcon: FaTags,
  LikeIcon: HiOutlineHeart,
  LikedIcon: HiHeart,
}

export default AppIcons
