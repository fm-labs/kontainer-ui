import React from 'react'
import Button from '@mui/material/Button'
import ContainerCreateDialog from './ContainerCreate.dialog.tsx'

const ContainerCreateButton = () => {
  const [showDialog, setShowDialog] = React.useState(false)

  const handleClick = () => {
    setShowDialog(true)
  }

  return (
    <>
      <Button variant={'outlined'} onClick={handleClick}>
        Create Container
      </Button>
      <ContainerCreateDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </>
  )
}

export default ContainerCreateButton
