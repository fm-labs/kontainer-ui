import moment from 'moment'

export const FileSizeFormatter = (props: { value: number }) => {
  const { value } = props
  if (value < 1024) {
    return `${value} bytes`
  }
  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(2)} KB`
  }
  return `${(value / 1024 / 1024).toFixed(2)} MB`
}

export const TimeAgoFormatter = (props: { value: string }) => {
  const _moment = moment(props.value)
  return _moment.fromNow()
}
