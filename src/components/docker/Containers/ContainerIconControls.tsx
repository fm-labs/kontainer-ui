import React from 'react'
import { IconButtonProps } from '@mui/material/IconButton'
import { useContainerHelper } from './useContainerHelper.ts'
import AppIcons from '../../../elements/AppIcons.tsx'
import TaskIconButton from '../../tasks/TaskIconButton.tsx'
import { IBackgroundTaskResponse } from '../../../types.ts'

type IconControlProps = {
  label: string
  icon: React.FC
  hidden?: boolean
  onClick?: (containerId: string) => () => Promise<void | IBackgroundTaskResponse>
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
  const { handleContainerStartClick, handleContainerPauseClick, handleContainerStopClick, handleContainerRemoveClick } =
    useContainerHelper()

  const iconButtonProps: IconButtonProps = { size: 'small', sx: { p: '0.1em' }, ...props.buttonProps }

  const controls = React.useMemo(() => {
    const _controls: IconControlProps[] = []
    if (containerStatus !== 'running' && props.showStart !== false) {
      _controls.push({
        label: 'Start',
        icon: AppIcons.StartIcon,
        onClick: handleContainerStartClick,
      })
    }
    if (containerStatus === 'running' && props.showPause !== false) {
      _controls.push({
        label: 'Pause',
        icon: AppIcons.PauseIcon,
        onClick: handleContainerPauseClick,
      })
    }
    if (containerStatus === 'running' && props.showStop !== false) {
      _controls.push({
        label: 'Stop',
        icon: AppIcons.StopIcon,
        onClick: handleContainerStopClick,
      })
    }
    if (props.showRemove !== false) {
      _controls.push({
        label: 'Delete',
        icon: AppIcons.DeleteIcon,
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
        <AppIcons.StartIcon />
      </IconButton>
      <IconButton {...iconButtonProps} title={'Pause'} onClick={handleContainerPauseClick(containerId)}>
        <AppIcons.PauseIcon />
      </IconButton>
      <IconButton {...iconButtonProps} title={'Stop'} onClick={handleContainerStopClick(containerId)}>
        <AppIcons.StopIcon />
      </IconButton>
      <IconButton {...iconButtonProps} title={'Delete'} onClick={handleContainerRemoveClick(containerId)}>
        <AppIcons.DeleteIcon />
      </IconButton>*/}
    </span>
  )
}

export default ContainerIconControls
