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
