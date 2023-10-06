import React, { useState } from 'react'
import {
    InputGroup,
    Input,
    InputRightElement,
  } from '@chakra-ui/react'
import { ButtonComponent } from './TagForm'

type EditTagFormProps = {
    editTag: (tag_name: string, id: string) => void;
    tag: string;
    id: string;
};

const EditTagForm: React.FC<EditTagFormProps> = ({editTag, tag, id}) => {
  const [value, setValue] = useState(tag)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents default action, in this case page reload
    
    editTag(value, id) 

    // Clear the form
    setValue("")
  }

  return (
    <>
        <tr className='tag-form'>
            <td colSpan={2}>
                <form onSubmit={handleSubmit}>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type='text'
                            placeholder='Update tag'
                            onChange={(event) => {
                                setValue(event.target.value);
                            }}
                            value={value}
                        />
                        <InputRightElement width='5.5rem'>
                            <ButtonComponent type='submit'>
                                Confirm
                            </ButtonComponent>
                        </InputRightElement>
                    </InputGroup>
                </form>
            </td>
        </tr>
    </>
  )
}

export default EditTagForm
