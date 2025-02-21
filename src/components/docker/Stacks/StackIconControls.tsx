import React from 'react'
import { IconButtonProps } from '@mui/material/IconButton'
import { useStackHelper } from './useStackHelper.ts'
import AppIcons from '../../../elements/AppIcons.tsx'
import TaskIconButton from '../../tasks/TaskIconButton.tsx'
import { IBackgroundTaskResponse } from '../../../types.ts'
import { toast } from 'react-toastify'

type IconControlProps = {
  label: string
  icon: React.FC
  hidden?: boolean
  onClick?: (stackId: string) => () => Promise<void | IBackgroundTaskResponse>
}

interface StackIconControlsProps {
  stackId: string
  stackStatus?: string
  showStart?: boolean
  showStop?: boolean
  showDelete?: boolean
  showDestroy?: boolean
  showLogs?: boolean
  showSync?: boolean
  buttonProps?: IconButtonProps
}

const StackIconControls = ({ stackId, stackStatus, ...props }: StackIconControlsProps) => {
  const {
    handleStackStartClick,
    handleStackStopClick,
    handleStackDeleteClick,
    handleStackDestroyClick,
    handleStackSyncClick,
  } = useStackHelper()

  const iconButtonProps: IconButtonProps = { size: 'small', sx: { p: '0.1em' }, ...props.buttonProps }

  const controls = React.useMemo(() => {
    const _controls: IconControlProps[] = []
    if (props.showSync !== false) {
      _controls.push({
        label: 'Sync',
        icon: AppIcons.SyncIcon,
        onClick: handleStackSyncClick,
      })
    }
    if (props.showStart !== false) {
      _controls.push({
        label: 'Start',
        icon: AppIcons.StartIcon,
        onClick: handleStackStartClick,
      })
    }
    if (props.showStop !== false) {
      _controls.push({
        label: 'Stop',
        icon: AppIcons.StopIcon,
        onClick: handleStackStopClick,
      })
    }
    if (props.showDelete !== false) {
      _controls.push({
        label: 'Delete',
        icon: AppIcons.StackDownIcon,
        onClick: handleStackDeleteClick,
      })
    }
    if (props.showDestroy !== false) {
      _controls.push({
        label: 'Destroy',
        icon: AppIcons.DeleteIcon,
        onClick: handleStackDestroyClick,
      })
    }
    return _controls
  }, [stackId, stackStatus, props])

  return (
    <span>
      {controls.map((control, idx) => {
        if (!control?.onClick) {
          return null
        }

        const taskPromise = control.onClick(stackId)
        return (
          <TaskIconButton
            key={idx}
            {...iconButtonProps}
            title={control.label}
            promise={taskPromise}
            onSuccess={(result) => {
              console.log('Task completed', result)
              toast.success(result || 'Task completed')
            }}
            onFailure={(error) => {
              console.error('Task failed', error)
              toast.error(error?.message || 'Task failed')
            }}
          >
            <control.icon />
          </TaskIconButton>
        )
      })}
    </span>
  )
}

export default StackIconControls
