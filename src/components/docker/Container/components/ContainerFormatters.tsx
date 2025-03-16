import * as React from 'react'

export const ContainerId = (props: { value: string; maxDigits?: number }) => {
  const _maxDigits = props?.maxDigits || 12
  return <span>{props.value.substring(0, _maxDigits)}</span>
}

export const ContainerName = (props: { value: string }) => {
  const value = props.value.startsWith('/') ? props.value.substring(1) : props.value
  return <span>{value}</span>
}
export const ContainerImage = (props: { value: string; maxDigits?: number }) => {
  const _maxDigits = props?.maxDigits || 12
  const value = props.value.startsWith('sha') ? props.value.substring(7, 7 + _maxDigits) : props.value
  return <span>{value}</span>
}

export default {
  ContainerId,
  ContainerName,
  ContainerImage,
}
