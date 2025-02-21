import React from 'react'
import StackTemplatesView from '../../components/templates/StackTemplatesView.tsx'
import Container from '@mui/material/Container'
import { useLoaderData } from 'react-router-dom'
import { useEnvApi } from '../../helper/useEnvApi.ts'

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
      <h1>Stack Templates</h1>

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
