import React, { useState } from 'react'
import {
    InputGroup,
    Input,
    InputRightElement,
  } from '@chakra-ui/react'

import styled from '@emotion/styled'

const buttonColor = 'orange'
const buttonHoverColor = 'darkorange'

export const ButtonComponent = styled.button`
  background-color: ${buttonColor};
  color: white; 
  border: none; 
  padding: 0.2rem 0.7rem; 
  font-size: 15px;
  border-radius: 5px;
  margin-left: 0.5rem; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: ${buttonHoverColor}; 
  }
`;

// Define the prop types for the TagForm component
type TagFormProps = {
    addTag: (tag: string) => void;
};

const TagForm: React.FC<TagFormProps> = ({ addTag }) => {
  const [value, setValue] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents default action, in this case page reload
      addTag(value); // the tag_name will be set as the value passed from input.
      
      // Clear the form
      setValue('');
  }

  return (
    <form className='tag-form' onSubmit={handleSubmit}> {/* captures the value of state when submitting */}
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type='text'
                placeholder='Enter tag name'
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                value={value}
                data-testid="tag-input"
            />
            <InputRightElement width='5rem'>
                {/* value.trim() removes whitespace from the value string. If the trimmed string 
                is empty, the button will be disabled. Otherwise, if there is any non-whitespace 
                content, the condition will evaluate to false, and the button will remain enabled */}
                <ButtonComponent data-testid="add-tag-button" type='submit' disabled={!value.trim()}>
                    Add
                </ButtonComponent>
            </InputRightElement>
        </InputGroup>
    </form>
  )
}

export default TagForm
