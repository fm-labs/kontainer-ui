import React from 'react'
import { Button, Avatar, Stack, Typography, Box } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AppIcons from '~/elements/AppIcons.tsx'
import { useDockerContext } from '~/helper/useDockerContext.tsx'

const DropdownTriggerButton = ({ onClick }) => {
  const { dockerHost } = useDockerContext()

  return (
    <Box>
      <Button
        variant='text'
        color='primary'
        onClick={onClick}
        startIcon={
          <Box sx={{ mr: 1 }}>
            <Avatar variant='rounded'>
              <AppIcons.ContainerIcon size={32} />
            </Avatar>
          </Box>
        }
        // endIcon={
        //   <ExpandMoreIcon
        //     sx={{
        //       display: {
        //         xs: 'none',
        //         md: 'inline',
        //       },
        //       transform: {
        //         xs: 'rotate(-90deg)',
        //         md: 'none',
        //       },
        //       transition: 'transform 0.2s ease',
        //     }}
        //     //fontSize='xs'
        //     color='secondary'
        //   />
        // }
        aria-label='open context switcher'
        sx={{ textTransform: 'none' }}
      >
        <Stack direction='column' alignItems='flex-start' spacing={0}>
          <Typography variant='body1' noWrap>
            fmlabs
          </Typography>
          <Typography variant='body2' noWrap>
            {dockerHost.id}
          </Typography>
        </Stack>
      </Button>
    </Box>
  )
}

export default DropdownTriggerButton
