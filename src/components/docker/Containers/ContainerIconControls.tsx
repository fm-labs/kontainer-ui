import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { useContainer } from './useContainer.ts'
import AppIcons from '../../../elements/AppIcons.tsx'
import TaskIconButton from '../../tasks/TaskIconButton.tsx'
import { IBackgroundTaskResponse } from '../../../types.ts'
import { AxiosResponse } from 'axios'
import TaskFabButton from '../../tasks/TaskFabButton.tsx'

type IconControlProps = {
  label: string
  icon: React.FC
  hidden?: boolean
  onClick?: (containerId: string) => () => Promise<void | AxiosResponse<IBackgroundTaskResponse>>
}

interface ContainerIconControlsProps {
  containerId: string
  containerStatus: string
  showStart?: boolean
  showPause?: boolean
  showStop?: boolean
  showRemove?: boolean
  showLogs?: boolean
  showExec?: boolean
  // onStartClick?: (containerId: string) => () => void
  // onPauseClick?: (containerId: string) => () => void
  // onStopClick?: (containerId: string) => () => void
  // onRemoveClick?: (containerId: string) => () => void
  // onLogsClick?: (containerId: string) => () => void
  // onExecClick?: (containerId: string) => () => void
  buttonProps?: IconButtonProps
}

const ContainerIconControls = ({ containerId, containerStatus, ...props }: ContainerIconControlsProps) => {
  const {
    handleContainerStartClick,
    handleContainerPauseClick,
    handleContainerStopClick,
    handleContainerRemoveClick,
    handleContainerLogsClick,
    handleContainerExecClick,
  } = useContainer()

  const iconButtonProps: IconButtonProps = { size: 'small', ...props.buttonProps }

  const controls = React.useMemo(() => {
    const _controls: IconControlProps[] = []
    if (containerStatus !== 'running' && props.showStart !== false) {
      _controls.push({
        label: 'Start',
        icon: AppIcons.ContainerStartIcon,
        onClick: handleContainerStartClick,
      })
    }
    if (containerStatus === 'running' && props.showPause !== false) {
      _controls.push({
        label: 'Pause',
        icon: AppIcons.ContainerPauseIcon,
        onClick: handleContainerPauseClick,
      })
    }
    if (containerStatus === 'running' && props.showStop !== false) {
      _controls.push({
        label: 'Stop',
        icon: AppIcons.ContainerStopIcon,
        onClick: handleContainerStopClick,
      })
    }
    if (props.showRemove !== false) {
      _controls.push({
        label: 'Delete',
        icon: AppIcons.ContainerDeleteIcon,
        onClick: handleContainerRemoveClick,
      })
    }

    return _controls
  }, [containerId, containerStatus, props])

  return (
    <span>
      {controls.map((control, idx) => {
        if (!control?.onClick) {
          return null
        }

        const promise = control.onClick(containerId)
        // return (
        //   <IconButton key={idx} {...iconButtonProps} title={control.label} onClick={onClick}>
        //     <control.icon />
        //   </IconButton>
        // )
        return (
          <TaskIconButton
            key={idx}
            {...iconButtonProps}
            title={control.label}
            promise={promise}
            onSuccess={() => {
              console.log('Task completed')
            }}
          >
            <control.icon />
          </TaskIconButton>
        )
        // return (
        //   <TaskFabButton
        //     {...iconButtonProps}
        //     key={idx}
        //     size={'small'}
        //     title={control.label}
        //     icon={<control.icon />}
        //     promise={promise}
        //     onSuccess={() => {
        //       console.log('Task completed')
        //     }}
        //     loading={false}
        //   ></TaskFabButton>
        //)
      })}

      {/*<IconButton {...iconButtonProps} title={'Start'} onClick={handleContainerStartClick(containerId)}>
        <AppIcons.ContainerStartIcon />
      </IconButton>
      <IconButton {...iconButtonProps} title={'Pause'} onClick={handleContainerPauseClick(containerId)}>
        <AppIcons.ContainerPauseIcon />
      </IconButton>
      <IconButton {...iconButtonProps} title={'Stop'} onClick={handleContainerStopClick(containerId)}>
        <AppIcons.ContainerStopIcon />
      </IconButton>
      <IconButton {...iconButtonProps} title={'Delete'} onClick={handleContainerRemoveClick(containerId)}>
        <AppIcons.ContainerDeleteIcon />
      </IconButton>*/}
    </span>
  )
}

export default ContainerIconControls
