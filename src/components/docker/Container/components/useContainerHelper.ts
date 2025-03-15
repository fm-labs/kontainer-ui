import { useErrorHandler } from '../../../../helper/useErrorHandler.ts'
import { useEnvApi } from '../../../../helper/useEnvApi.ts'

export const useContainerHelper = () => {
  const { api } = useEnvApi()
  const { defaultErrorHandler } = useErrorHandler()

  const handleContainerStartClick = (id: string) => () => {
    console.log('Starting container', id)
    // return toast
    //   .promise(api.startContainer(id), {
    //     pending: 'Starting container',
    //     success: 'Container started',
    //     error: 'Failed to start container',
    //   })
    return api.startContainer(id).catch(defaultErrorHandler)
  }

  const handleContainerPauseClick = (id: string) => () => {
    console.log('Pause container', id)
    // return toast
    //   .promise(api.pauseContainer(id), {
    //     pending: 'Pausing container',
    //     success: 'Container paused',
    //     error: 'Failed to pause container',
    //   })
    return api.pauseContainer(id).catch(defaultErrorHandler)
  }

  const handleContainerStopClick = (id: string) => () => {
    console.log('Stopping container', id)
    // return toast
    //   .promise(api.stopContainer(id), {
    //     pending: 'Stopping container',
    //     success: 'Container stopped',
    //     error: 'Failed to stop container',
    //   })
    return api.stopContainer(id).catch(defaultErrorHandler)
  }

  const handleContainerRemoveClick = (id: string) => () => {
    console.log('Removing container', id)
    // return toast
    //   .promise(api.removeContainer(id), {
    //     pending: 'Removing container',
    //     success: 'Container removed',
    //     error: 'Failed to remove container',
    //   })
    return api.removeContainer(id).catch(defaultErrorHandler)
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
    handleContainerLogsClick,
    handleContainerExecClick,
  }
}
