import React from 'react'
import { RJSFSchema } from '@rjsf/utils'
import Form from '@rjsf/mui'
import validator from '@rjsf/validator-ajv8'

interface JsonSchemaFormProps {
  schemaUrl: string
}

const JsonSchemaForm = (props: JsonSchemaFormProps) => {
  const schemaUrl = props.schemaUrl
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
    console.log('JsonSchemaForm: data loaded', data)
  }, [data])

  if (!jsonSchema) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Form schema={jsonSchema} validator={validator} onSubmit={(data) => setData(data)} />
      <hr />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>
    </div>
  )
}

export default JsonSchemaForm
