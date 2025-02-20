import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'

interface TaskIconButtonProps extends IconButtonProps {
  promise: () => Promise<any>
  onSuccess?: (result: any) => void
  onFailure?: (error: Error) => void
}

const TaskIconButton = ({ promise, onSuccess, onFailure, children, ...iconButtonProps }: TaskIconButtonProps) => {
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

  return (
    <IconButton {...iconButtonProps} onClick={handleClick}>
      {!loading ? (
        children
      ) : (
        <>
          <CircularProgress size={18} />
        </>
      )}
    </IconButton>
  )
}

export default TaskIconButton
