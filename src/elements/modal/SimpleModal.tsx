import { PropsWithChildren, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'

interface SimpleModalProps extends PropsWithChildren<any> {
  title: string
  buttonLabel: string
  buttonProps?: any
  closeButtonLabel?: string
  closeButtonProps?: any
  submitButtonLabel?: string
  submitButtonProps?: any
  onSubmit?: () => Promise<void>
  onClose?: () => void
  onShow?: () => void
}

function SimpleModal({ children, ...props }: SimpleModalProps) {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    props?.onClose?.()
  }
  const handleShow = () => {
    setShow(true)
    props?.onShow?.()
  }

  const handleSubmit = () => {
    props
      ?.onSubmit?.()
      .then(() => {
        handleClose()
      })
      .catch((err) => {
        console.error(err)
        toast.error(`Error: ${err?.message}`)
      })
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow} {...props.buttonProps}>
        {props?.buttonLabel}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose} {...props.closeButtonProps}>
            {props?.closeButtonLabel || 'Close'}
          </Button>
          <Button variant='primary' onClick={handleSubmit} {...props.submitButtonProps}>
            {props?.submitButtonLabel || 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SimpleModal
