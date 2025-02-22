import React from 'react'
import StackTemplatesView from '../../components/templates/StackTemplatesView.tsx'
import Container from '@mui/material/Container'
import { useLoaderData } from 'react-router-dom'
import { useEnvApi } from '../../helper/useEnvApi.ts'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import BasicDialogButton from '../../elements/Dialog/BasicDialogButton.tsx'
import AddTemplateForm from '../../components/templates/AddTemplateForm.tsx'

const StackTemplatesPage = () => {
  const templates = useLoaderData() as any[]
  const [selectedTemplateName, setSelectedTemplateName] = React.useState('')
  const [templateData, setTemplateData] = React.useState([])
  const api = useEnvApi()

  React.useEffect(() => {
    if (!selectedTemplateName) {
      return
    }

    api
      .getTemplate(selectedTemplateName)
      .then((data) => {
        setTemplateData(data)
      })
      .catch(() => {
        setTemplateData([])
      })
  }, [selectedTemplateName])

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Stack Templates</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Stack Templates'}>
          <div>
            <BasicDialogButton label={'Add Templates'} dialogLabel={'Add Templates'}>
              <AddTemplateForm />
            </BasicDialogButton>
          </div>
        </Heading>
      </Toolbar>

      <div>
        <select onChange={(e) => setSelectedTemplateName(e.target.value)}>
          <option value=''>Select a template</option>
          {templates.map((template) => (
            <option key={template.template_id} value={template.template_id}>
              {template.label}
            </option>
          ))}
        </select>
      </div>

      <StackTemplatesView templates={templateData} />
    </Container>
  )
}

export default StackTemplatesPage
