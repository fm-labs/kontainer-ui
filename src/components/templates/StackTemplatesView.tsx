import React from 'react'
import Grid from '@mui/material/Grid2'
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, ChipProps, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import GitHubIcon from '@mui/icons-material/GitHub'
import SourceIcon from '@mui/icons-material/Source'
import BugReportIcon from '@mui/icons-material/BugReport'
import AppIcons from '../../elements/AppIcons.tsx'
import Button from '@mui/material/Button'

interface StackTemplatesViewProps {
  templateUrl: string
}

// const StackTemplateInfoDialog = ({ template }: any) => {
//   return (
//     <div>
//       <h2>{template?.name}</h2>
//       <div className={''}>
//         {Object.entries(template).map(([key, value]: [string, any]) => {
//           let val
//           if (['categories', 'ports'].indexOf(key) > -1) {
//             val = value.join(', ')
//             if (['volumes'].indexOf(key) > -1) {
//               value.map((v: any) => {
//                 val += `\n${v}`
//               })
//             }
//           } else if (typeof value === 'object') {
//             val = JSON.stringify(value)
//           } else {
//             val = value
//           }
//
//           return (
//             <div key={key}>
//               <span style={{ fontWeight: 'bold' }}>{key}</span>: {val}
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

const StackTemplateTypeChip = ({ type }: { type: string }) => {
  const chipProps: ChipProps = {
    size: 'small',
    color: 'info',
    variant: 'outlined',
  }
  switch (type) {
    case 'container':
      return <Chip {...chipProps} label={'container'}></Chip>
    case 'compose':
    case 'docker-compose':
      return <Chip {...chipProps} label={'compose'}></Chip>
    default:
      return <Chip {...chipProps} color={'error'} label={'unknown'}></Chip>
  }
}

const StackTemplatesView = ({ templateUrl }: StackTemplatesViewProps) => {
  const [templates, setTemplates] = React.useState<any>({})

  const fetchTemplates = React.useCallback(async () => {
    setTemplates({})
    const response = await fetch(templateUrl)
    const data = await response.json()
    console.log('templates data', data)
    setTemplates(data)
  }, [templateUrl])

  // const handleLaunchTemplate = (template: any) => {
  //   console.log('launch template', template)
  //   api.launchStackTemplate(template)
  // }

  React.useEffect(() => {
    fetchTemplates()
  }, [templateUrl])

  if (!templates) {
    return <div>Loading...</div>
  }

  // return (
  //   <div>
  //     <p>
  //       URL: {templateUrl}
  //       <br />
  //       Version: {templates?.version}
  //       <br />
  //       Found templates: {templates?.length}
  //       {templates?.length > 0 && templates?.map((template: any, idx: number) => <></>)}
  //     </p>
  //   </div>
  // )

  return (
    <div>
      <p>
        URL: {templateUrl}
        <br />
        Version: {templates?.version}
        <br />
        Found templates: {templates?.length}
      </p>
      <Grid container spacing={2}>
        {templates?.length > 0 &&
          templates?.map((template: any, idx: number) => (
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={`${template?.name}-${idx}`}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      variant={'rounded'}
                      src={template?.logo}
                      /*sx={{ bgcolor: colors.red[500] }}*/ aria-label={template?.name}
                    >
                      {template?.name[0]}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={template?.name}
                  subheader={template?.image}
                />
                <CardContent>
                  <Typography variant='body2' component={'div'} sx={{ color: 'text.secondary', pb: 1 }}>
                    <StackTemplateTypeChip type={template?.type} />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', maxHeight: '40px', overflowY: 'scroll' }}>
                    {template?.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label='Add to favorites'>
                    {/*<FavoriteOutlinedIcon />*/}
                    <AppIcons.LikeIcon />
                  </IconButton>
                  {/*<IconButton aria-label='Share'>
                  <ShareIcon />
                </IconButton>*/}
                  {template?.repository && template.repository?.url && (
                    <IconButton
                      aria-label='Share'
                      href={template.repository.url}
                      target='_blank'
                      title={'Repository: ' + template?.repository?.url}
                    >
                      <GitHubIcon />
                    </IconButton>
                  )}
                  {template?.repository && template.repository?.stackfile && (
                    <IconButton
                      aria-label='Source'
                      href={
                        // template.repository.url /*.replace('github.com', 'raw.githubusercontent.com')*/ +
                        // '/blob/master/' +
                        // template.repository.stackfile
                        template.repository.url.replace('github.com', 'raw.githubusercontent.com') +
                        '/refs/heads/master/' +
                        template.repository.stackfile
                      }
                      target='_blank'
                      title={'Stackfile: ' + template?.repository?.stackfile}
                    >
                      <SourceIcon />
                    </IconButton>
                  )}
                  <IconButton aria-label='JSON' onClick={() => console.log('Template', template)}>
                    <BugReportIcon />
                  </IconButton>
                  <>
                    <Button variant={'contained'} /*onClick={() => handleLaunchTemplate(template)}*/>Launch</Button>
                  </>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default StackTemplatesView
