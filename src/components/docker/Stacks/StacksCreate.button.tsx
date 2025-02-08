import React from 'react'
import Button from '@mui/material/Button'
import StackCreateDialog from './StacksCreate.dialog'

const StackCreateButton = () => {
  const [showDialog, setShowDialog] = React.useState(false)

  const handleClick = () => {
    setShowDialog(true)
  }

  return (
    <>
      <Button variant={'contained'} onClick={handleClick}>
        Launch Stack
      </Button>
      <StackCreateDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </>
  )
}

export default StackCreateButton
