import { PropsWithChildren } from 'react'

const DevOnly = (props: PropsWithChildren) => {
  if (import.meta.env.NODE_ENV !== 'development') return null
  return props.children
}

export default DevOnly
