import React from 'react'
import { RJSFSchema } from '@rjsf/utils'
import Form from '@rjsf/mui'
import validator from '@rjsf/validator-ajv8'

interface JsonSchemaFormProps {
  schemaUrl?: string
  schema?: RJSFSchema
  onDataChange?: (data: any) => void
}

const JsonSchemaForm = (props: JsonSchemaFormProps) => {
  const [jsonSchema, setJsonSchema] = React.useState<RJSFSchema>()
  const [data, setData] = React.useState<any>()

  if (props?.schemaUrl && props?.schema) {
    console.warn('JsonSchemaForm: both schemaUrl and schema are provided. schema will be used.')
  }

  const fetchJsonSchema = async (schemaUrl) => {
    const response = await fetch(schemaUrl)
    const jsonSchema = await response.json()
    console.log(jsonSchema)
    setJsonSchema(jsonSchema)
  }

  React.useEffect(() => {
    if (props?.schemaUrl && props?.schema) {
      console.warn('JsonSchemaForm: both schemaUrl and schema are provided. schema will be used.')
      setJsonSchema(props.schema)
    } else if (props?.schema) {
      setJsonSchema(props.schema)
    } else if (props.schemaUrl) {
      fetchJsonSchema(props.schemaUrl)
    } else {
      console.error('JsonSchemaForm: no schema provided')
    }
  }, [props])

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
