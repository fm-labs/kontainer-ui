import React from 'react'
import StackTemplatesView from '../../components/templates/StackTemplatesView.tsx'
import Container from '@mui/material/Container'
import { STACK_TEMPLATE_URLS } from '../../constants.ts'

const StackTemplatesPage = () => {
  const templateUrls = STACK_TEMPLATE_URLS
  const [templateUrl, setTemplateUrl] = React.useState(templateUrls[0].url)

  return (
    <Container maxWidth={false}>
      <h1>Stack Templates</h1>

      <div>
        <select onChange={(e) => setTemplateUrl(e.target.value)}>
          {templateUrls.map((templateUrl) => (
            <option key={templateUrl.url} value={templateUrl.url}>
              {templateUrl.label}
            </option>
          ))}
        </select>
      </div>

      <StackTemplatesView templateUrl={templateUrl} />
    </Container>
  )
}

export default StackTemplatesPage
