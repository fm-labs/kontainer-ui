import React from 'react'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'

const BlockItem = ({ children, color, ...props }) => {
  color = color || 'default'
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} {...props}>
      <Box
        color={color}
        sx={{
          border: '1px solid #ccc',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: `${color}.main`,
          fontSize: '0.8rem',
          p: 0.5,
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Grid>
  )
}

export default BlockItem
