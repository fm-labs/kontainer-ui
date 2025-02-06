import React from 'react'
import Button from '@mui/material/Button'
import ContainerCreateDialog from './ContainerCreate.dialog'

const ContainerCreateButton = () => {
  const [showDialog, setShowDialog] = React.useState(false)

  const handleClick = () => {
    setShowDialog(true)
  }

  return (
    <div>
      <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleClick}>
        Create Container
      </Button>
      <ContainerCreateDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  )
}

export default ContainerCreateButton
