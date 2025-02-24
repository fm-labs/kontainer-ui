import React from 'react'
import BasicDialogButton from '../../elements/Dialog/BasicDialogButton.tsx'
import { StackTemplate } from '../../types.ts'
import DialogContent from '@mui/material/DialogContent'
import StackFromTemplate from '../docker/Stacks/StackFromTemplate.tsx'

interface IStackTemplateLaunchProps {
  template: StackTemplate
}

const TemplateLaunchDialogButton = ({ template }: IStackTemplateLaunchProps) => {
  const formData = {
    stackName: '',
    templateContent: JSON.stringify(template, null, 2),
  }

  return (
    <>
      <BasicDialogButton label={'Launch'} dialogLabel={'Launch Template'}>
        <DialogContent>
          <StackFromTemplate initialData={formData} />
        </DialogContent>
      </BasicDialogButton>
    </>
  )
}

export default TemplateLaunchDialogButton
