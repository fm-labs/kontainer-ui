import { toast } from 'react-toastify'
import { useErrorHandler } from '../../../helper/useErrorHandler.ts'
import { useEnvApi } from '../../../helper/useEnvApi.ts'

export const useContainer = () => {
  const api = useEnvApi()
  const { defaultErrorHandler } = useErrorHandler()

  const handleContainerStartClick = (id: string) => () => {
    console.log('Starting container', id)
    return toast
      .promise(api.startContainer()(id), {
        pending: 'Starting container',
        success: 'Container started',
        error: 'Failed to start container',
      })
      .catch(defaultErrorHandler)
  }

  const handleContainerPauseClick = (id: string) => () => {
    console.log('Pause container', id)
    return toast
      .promise(api.pauseContainer()(id), {
        pending: 'Pausing container',
        success: 'Container paused',
        error: 'Failed to pause container',
      })
      .catch(defaultErrorHandler)
  }

  const handleContainerStopClick = (id: string) => () => {
    console.log('Stopping container', id)
    return toast
      .promise(api.stopContainer()(id), {
        pending: 'Stopping container',
        success: 'Container stopped',
        error: 'Failed to stop container',
      })
      .catch(defaultErrorHandler)
  }

  const handleContainerRemoveClick = (id: string) => () => {
    console.log('Removing container', id)
    return toast
      .promise(api.removeContainer()(id), {
        pending: 'Removing container',
        success: 'Container removed',
        error: 'Failed to remove container',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackStartClick = (id: string) => () => {
    console.log('Starting stack', id)
    return toast
      .promise(api.startStack()(id), {
        pending: 'Starting stack',
        success: 'Stack started',
        error: 'Failed to start stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackStopClick = (id: string) => () => {
    console.log('Stopping stack', id)
    return toast
      .promise(api.stopStack()(id), {
        pending: 'Stopping stack',
        success: 'Stack stopped',
        error: 'Failed to stop stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackDeleteClick = (id: string) => () => {
    console.log('Deleting stack', id)
    return toast
      .promise(api.removeStack()(id), {
        pending: 'Deleting stack',
        success: 'Stack deleted',
        error: 'Failed to delete stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleContainerLogsClick = (id: string) => () => {
    // open a new window with the logs
    window.open(`/logstream.html?container=${id}`, '_blank')
  }

  const handleContainerExecClick = (id: string) => () => {
    // open a new window with the logs
    window.open(`/exec.html?container=${id}`, '_blank')
  }

  return {
    handleContainerStartClick,
    handleContainerPauseClick,
    handleContainerStopClick,
    handleContainerRemoveClick,
    handleStackStartClick,
    handleStackStopClick,
    handleStackDeleteClick,
    handleContainerLogsClick,
    handleContainerExecClick,
  }
}
