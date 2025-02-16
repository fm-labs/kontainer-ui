import { toast } from 'react-toastify'

export const useErrorHandler = () => {
  const printError = (error: Error) => {
    console.error(error)
  }

  const toastError = (error: any) => {
    //console.error(error)
    let message = 'An Error occurred'
    if (error?.message) {
      message = error.message
    }
    if (error?.response?.data?.message) {
      message = error.response.data.message
    }
    if (error?.response?.data?.error) {
      message = error.response.data.error
    }

    toast.error(message)
  }

  const defaultErrorHandler = toastError

  return { printError, toastError, defaultErrorHandler }
}
