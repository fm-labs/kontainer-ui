import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const PrivateKeyForm = ({
  onSubmit,
  initialData,
  editMode,
}: {
  onSubmit: (formData: FormData) => void
  initialData?: string
  editMode?: boolean
}) => {
  const [keyId, setKeyId] = React.useState(initialData || '')
  const [keyContent, setKeyContent] = React.useState('')

  const handleSubmitClick = () => {
    const formData = new FormData()
    formData.append('key_id', keyId)
    formData.append('key_content', keyContent)

    onSubmit(formData)
  }

  return (
    <div>
      <div>
        <TextField
          disabled={editMode}
          aria-readonly={editMode}
          autoFocus
          required
          margin='dense'
          id='key_id'
          name='key_id'
          label='Key Id'
          type='text'
          fullWidth
          variant='standard'
          value={keyId}
          onChange={(e) => setKeyId(e.target.value)}
        />

        <TextField
          multiline={true}
          rows={10}
          required={true}
          margin='dense'
          id='key_content'
          name='key_content'
          label='Key Content'
          type='textarea'
          fullWidth
          variant='standard'
          value={keyContent}
          onChange={(e) => setKeyContent(e.target.value)}
        />

        <Box sx={{ pt: 2, textAlign: 'right' }}>
          <Button variant='contained' color='primary' onClick={handleSubmitClick}>
            Submit
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default PrivateKeyForm
