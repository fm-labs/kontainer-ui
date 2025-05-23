import { useErrorHandler } from '~/helper/useErrorHandler.ts'
import { useAgentDockerApi } from '~/helper/useAgentDockerApi.ts'

export const useStackHelper = () => {
  const api = useAgentDockerApi()
  const { defaultErrorHandler } = useErrorHandler()

  const handleStackStartClick = (id: string) => () => {
    console.log('Starting stack', id)
    // return toast
    //   .promise(api.startStack(id), {
    //     success: 'Starting stack',
    //     pending: 'Submitting request',
    //     error: 'Failed to start stack',
    //   })
    return api.startStack(id).catch(defaultErrorHandler)
  }

  const handleStackRestartClick = (id: string) => () => {
    console.log('Restarting stack', id)
    // return toast
    //   .promise(api.startStack(id), {
    //     success: 'Starting stack',
    //     pending: 'Submitting request',
    //     error: 'Failed to start stack',
    //   })
    return api.startStack(id).catch(defaultErrorHandler)
  }

  const handleStackStopClick = (id: string) => () => {
    console.log('Stopping stack', id)
    // return toast
    //   .promise(api.stopStack(id), {
    //     success: 'Stopping stack',
    //     pending: 'Submitting request',
    //     error: 'Failed to stop stack',
    //   })
    return api.stopStack(id).catch(defaultErrorHandler)
  }

  const handleStackDeleteClick = (id: string) => () => {
    console.log('Deleting stack', id)
    // return toast
    //   .promise(api.deleteStack(id), {
    //     success: 'Deleting stack',
    //     pending: 'Submitting request',
    //     error: 'Failed to delete stack',
    //   })
    return api.deleteStack(id).catch(defaultErrorHandler)
  }

  const handleStackDestroyClick = (id: string) => () => {
    console.log('Destroying stack', id)
    // return toast
    //   .promise(api.destroyStack(id), {
    //     success: 'Destroying stack',
    //     pending: 'Submitting request',
    //     error: 'Failed to destroy stack',
    //   })
    return api.destroyStack(id).catch(defaultErrorHandler)
  }

  const handleStackSyncClick = (id: string) => () => {
    console.log('Syncing stack', id)
    // return toast
    //   .promise(api.syncStack(id), {
    //     success: 'Syncing stack',
    //     pending: 'Submitting request',
    //     error: 'Failed to sync stack',
    //   })
    return api.syncStack(id).catch(defaultErrorHandler)
  }

  return {
    handleStackStartClick,
    handleStackRestartClick,
    handleStackStopClick,
    handleStackDeleteClick,
    handleStackDestroyClick,
    handleStackSyncClick,
  }
}
