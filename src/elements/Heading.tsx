import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { TypographyVariant } from '@mui/material'

export interface HeadingProps extends TypographyProps {
  label: string | React.JSX.Element
  as?: string //| React.FC
  children?: any
}

function Heading({ label, children, as, ...props }: HeadingProps) {
  as = as || 'h5'
  //const Tag: PropsWithChildren<any> = as

  // return (
  //   <div className='Heading my-3 border-bottom' {...props}>
  //     <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2'>
  //       <Tag style={{ margin: 0 }}>{label}</Tag>
  //       {children}
  //     </div>
  //   </div>
  // )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '0.5rem',
      }}
    >
      <div>
        <Typography sx={{ p: 0 }} color='primary' component={as} variant={as as TypographyVariant} {...props}>
          {label}
        </Typography>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Heading
