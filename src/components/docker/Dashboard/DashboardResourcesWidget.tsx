import React from 'react'
import Grid from '@mui/material/Grid2'
import { SiDocker } from 'react-icons/si'
import { HiCubeTransparent, HiOutlineCube } from 'react-icons/hi2'
import { HiDatabase } from 'react-icons/hi'
import { FaGauge, FaLayerGroup, FaNetworkWired } from 'react-icons/fa6'
import { Avatar, Card, CardActionArea, CardContent, CardHeader } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Typography from '@mui/material/Typography'

const DashboardResourcesWidget = ({ systemInfo: info }) => {
  const resources = [
    {
      type: 'env',
      label: 'Environment',
      icon: <FaGauge />,
      content: (
        <>
          <Typography variant='body2' color='text.secondary'>
            {info?.OperatingSystem}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {info?.Architecture}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {info?.NCPU} CPUs
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {(info?.MemTotal / 1024 / 1024 / 1024).toFixed(2)} GB RAM
          </Typography>
        </>
      ),
    },
    {
      type: 'containers',
      label: `${info?.Containers} Containers`,
      icon: <HiOutlineCube />,
      content: (
        <>
          <Typography variant='body2' color='text.secondary'>
            {info?.ContainersRunning} running
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {info?.ContainersPaused} paused
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {info?.ContainersStopped} stopped
          </Typography>
        </>
      ),
    },
    {
      type: 'stacks',
      label: `${info?.Stacks} Stacks`,
      icon: <FaLayerGroup />,
      content: <></>,
    },
    {
      type: 'images',
      label: `${info?.Images} Images`,
      icon: <HiCubeTransparent />,
    },
    {
      type: 'volumes',
      label: `Volumes`,
      icon: <HiDatabase />,
    },
    {
      type: 'networks',
      label: `Networks`,
      icon: <FaNetworkWired />,
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

export default DashboardResourcesWidget
