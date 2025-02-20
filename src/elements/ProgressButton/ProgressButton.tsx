import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import { PropsWithChildren } from 'react'

const ProgressButton = (props: PropsWithChildren) => {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button variant='contained' sx={buttonSx} disabled={loading} onClick={handleButtonClick}>
          {props.children}{' '}
          {loading && (
            <CircularProgress
              size={18}
              sx={{
                color: green[500],
                //position: 'absolute',
                //top: '50%',
                //left: '50%',
                //marginTop: '-12px',
                //marginLeft: '-12px',
              }}
            />
          )}
        </Button>
      </Box>
    </>
  )
}

export default ProgressButton
