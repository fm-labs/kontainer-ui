import React from 'react'
//import Form from '@rjsf/core'
import Form from '@rjsf/mui'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import Container from '@mui/material/Container'

const SettingsPage = () => {
  const schemaUrl = '/schema/dev/slots-common.schema.json'
  const [jsonSchema, setJsonSchema] = React.useState<RJSFSchema>()
  const [data, setData] = React.useState<any>()

  const fetchJsonSchema = async () => {
    const response = await fetch(schemaUrl)
    const jsonSchema = await response.json()
    console.log(jsonSchema)
    setJsonSchema(jsonSchema)
  }

  React.useEffect(() => {
    fetchJsonSchema()
  }, [])

  React.useEffect(() => {
    console.log('data', data)
  }, [data])

  if (!jsonSchema) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h1>Settings</h1>
      <Form schema={jsonSchema} validator={validator} onSubmit={(data) => console.log(data)} />
      <hr />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>
    </Container>
  )
}

export default SettingsPage
