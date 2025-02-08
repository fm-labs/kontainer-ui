import React, { PropsWithChildren } from 'react'
import { Card, CardActionArea, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'

interface DashboardWidgetCardProps extends PropsWithChildren<any> {
  title: string | React.JSX.Element
}

export const DashboardWidgetCard = ({ title, children }: DashboardWidgetCardProps) => {
  return (
    <Card>
      <CardActionArea
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
      >
        <CardContent sx={{ height: '100%' }}>
          <Typography variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
