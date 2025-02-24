import { toast } from 'react-toastify'
import { useErrorHandler } from '../../../helper/useErrorHandler.ts'
import { useEnvApi } from '../../../helper/useEnvApi.ts'

export const useStackHelper = () => {
  const api = useEnvApi()
  const { defaultErrorHandler } = useErrorHandler()

  const handleStackStartClick = (id: string) => () => {
    console.log('Starting stack', id)
    return toast
      .promise(api.startStack(id), {
        pending: 'Starting stack',
        success: 'Stack started',
        error: 'Failed to start stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackStopClick = (id: string) => () => {
    console.log('Stopping stack', id)
    return toast
      .promise(api.stopStack(id), {
        pending: 'Stopping stack',
        success: 'Stack stopped',
        error: 'Failed to stop stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackDeleteClick = (id: string) => () => {
    console.log('Deleting stack', id)
    return toast
      .promise(api.deleteStack(id), {
        pending: 'Deleting stack',
        success: 'Stack deleted',
        error: 'Failed to delete stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackDestroyClick = (id: string) => () => {
    console.log('Destroying stack', id)
    return toast
      .promise(api.destroyStack(id), {
        pending: 'Destroying stack',
        success: 'Stack destroyed',
        error: 'Failed to destroy stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackSyncClick = (id: string) => () => {
    console.log('Syncing stack', id)
    return toast
      .promise(api.syncStack(id), {
        pending: 'Syncing stack',
        success: 'Stack synced',
        error: 'Failed to sync stack',
      })
      .catch(defaultErrorHandler)
  }

  return {
    handleStackStartClick,
    handleStackStopClick,
    handleStackDeleteClick,
    handleStackDestroyClick,
    handleStackSyncClick,
  }
}
