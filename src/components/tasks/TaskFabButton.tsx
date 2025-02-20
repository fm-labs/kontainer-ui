import React from 'react'
import ProgressFabButton, { ProgressFabButtonProps } from '../../elements/ProgressButton/ProgressFabButton.tsx'
import { FabProps } from '@mui/material/Fab'

interface TaskFabButtonProps extends FabProps, ProgressFabButtonProps {
  promise: () => Promise<any>
  onSuccess?: (result: any) => void
  onFailure?: (error: Error) => void
}

const TaskFabButton = ({ promise, onSuccess, onFailure, ...fabProps }: TaskFabButtonProps) => {
  const [loading, setLoading] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [result, setResult] = React.useState<any | null>(null)

  const handleClick = () => {
    setLoading(true)
    setTimeout(executePromise, 1000)
  }

  const executePromise = React.useCallback(() => {
    setLoading(true)
    setLoaded(false)
    setError(null)
    setResult(null)

    promise()
      .then((result) => {
        if (onSuccess) {
          onSuccess(result)
        }
        setResult(result)
        setLoaded(true)

        // reset loaded state after 2 seconds
        setTimeout(() => setLoaded(false), 2000)

        return result
      })
      .catch((error) => {
        if (onFailure) {
          onFailure(error)
        }
        setError(error)
        setResult(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [promise, onSuccess, onFailure])

  React.useEffect(() => {
    if (loading) {
      return
    }
    if (loaded) {
      return
    }
  }, [loading, loaded])

  // return (
  //   <Button onClick={handleClick} {...buttonProps}>
  //     {buttonProps.children} {loading ? 'Loading ...' : ''} {loaded ? 'Loaded!' : ''}
  //   </Button>
  // )

  return <ProgressFabButton {...fabProps} onClick={handleClick} loading={loading} success={loaded} />
}

export default TaskFabButton
