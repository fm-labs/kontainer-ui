import React from 'react'
import Grid from '@mui/material/Grid2'
import { Avatar, Card, CardContent, CardHeader } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Typography from '@mui/material/Typography'
import AppIcons from '../../../../elements/AppIcons.tsx'

const DockerEngineInfoGrid = ({ engineInfo }) => {
  const resources = [
    {
      type: 'env',
      label: 'Environment',
      icon: <AppIcons.EnvironmentIcon />,
      content: (
        <>
          <Typography variant='body2' color='text.secondary'>
            {engineInfo?.OperatingSystem}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {engineInfo?.Architecture}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {engineInfo?.NCPU} CPUs
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {(engineInfo?.MemTotal / 1024 / 1024 / 1024).toFixed(2)} GB RAM
          </Typography>
        </>
      ),
    },
    {
      type: 'containers',
      label: `Containers (${engineInfo?.Containers})`,
      icon: <AppIcons.ContainerIcon />,
      content: (
        <>
          <Typography variant='body2' color='text.secondary'>
            {engineInfo?.ContainersRunning} running
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {engineInfo?.ContainersPaused} paused
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {engineInfo?.ContainersStopped} stopped
          </Typography>
        </>
      ),
    },
    {
      type: 'stacks',
      label: `Stacks`,
      icon: <AppIcons.StackIcon />,
      content: <i>-</i>,
    },
    {
      type: 'images',
      label: `Images (${engineInfo?.Images})`,
      icon: <AppIcons.ImageIcon />,
      content: <i>-</i>,
    },
    {
      type: 'volumes',
      label: `Volumes`,
      icon: <AppIcons.VolumeIcon />,
      content: <i>-</i>,
    },
    {
      type: 'networks',
      label: `Networks`,
      icon: <AppIcons.NetworkIcon />,
      content: <i>-</i>,
    },
  ]

  return (
    <div>
      <Grid container spacing={2}>
        {resources.map((card, index) => (
          <Grid size={4} key={card.type}>
            <Card sx={{ height: '100%' }}>
              {/*<CardActionArea
                //onClick={() => setSelectedCard(index)}
                //data-active={selectedCard === index ? '' : undefined}
                sx={{
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >*/}
              <CardHeader
                avatar={<Avatar aria-label={card.type}>{card.icon || card.type.toLocaleUpperCase()}</Avatar>}
                action={
                  <IconButton aria-label={`${card.type} actions`}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={card.label}
                subheader={card.type}
              />
              <CardContent sx={{ height: '100%' }}>
                <Typography variant='body2' component={'div'} color='text.secondary'>
                  {card?.content}
                </Typography>
              </CardContent>
              {/*</CardActionArea>*/}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default DockerEngineInfoGrid
