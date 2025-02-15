import { toast } from 'react-toastify'

export const useErrorHandler = () => {
  const printError = (error: Error) => {
    console.error(error)
  }

  const toastError = (error: Error) => {
    //console.error(error)
    toast.error(error?.message || 'An Error occurred')
  }

  return { printError, toastError }
}
