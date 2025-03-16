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
  HiMap,
  HiArrowPath,
  HiMiniPuzzlePiece,
  HiPuzzlePiece,
  HiWrench,
  HiOutlineSquare3Stack3D,
  HiSquare3Stack3D,
  HiOutlineStop,
  HiXMark,
  HiTag,
  HiSquaresPlus,
  HiOutlinePause,
  HiOutlineMegaphone,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineShare,
  HiOutlinePuzzlePiece,
  HiOutlineCog,
  HiCog,
  HiOutlineSquares2X2,
  HiOutlineTrash,
} from 'react-icons/hi2'
import { FaDocker, FaGauge, FaLayerGroup, FaNetworkWired, FaTag, FaTags, FaGear } from 'react-icons/fa6'
import { FaHistory, FaHome, FaTimes, FaSyncAlt } from 'react-icons/fa'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import GitHubIcon from '@mui/icons-material/GitHub'
import SourceIcon from '@mui/icons-material/Source'
import BugReportIcon from '@mui/icons-material/BugReport'

const AppIcons = {
  DockerIcon: FaDocker,
  EnvironmentIcon: FaGauge,
  HomeIcon: FaHome,
  DashboardIcon: HiOutlineSquares2X2,

  // Container
  ContainerIcon: HiOutlineCube,

  // Stack
  StackIcon: HiOutlineSquare3Stack3D,
  StackUpIcon: HiOutlinePlay,
  StackDownIcon: HiXMark,

  // Image
  ImageIcon: HiOutlineCubeTransparent,

  // Volume
  VolumeIcon: HiOutlineServer,

  // Network
  NetworkIcon: HiOutlineShare,

  // Event
  EventIcon: HiOutlineMegaphone,

  // Template
  TemplateIcon: HiOutlinePuzzlePiece,

  // Actions
  StartIcon: HiOutlinePlay,
  PauseIcon: HiOutlinePause,
  StopIcon: HiOutlineStop,
  DeleteIcon: HiOutlineTrash,
  SyncIcon: HiArrowPath,

  // Misc
  BugIcon: BugReportIcon,
  GitHubIcon: GitHubIcon,
  LabelIcon: HiTag,
  LabelsIcon: FaTags,
  LikeIcon: HiOutlineHeart,
  LikedIcon: HiHeart,
  SettingsIcon: HiCog,
}

export default AppIcons
