export interface INavigationItem {
  key: string
  label: string
  to: string
  target?: string
  icon?: React.ReactElement /* | React.ElementType */
}
