import React, { useState, useEffect } from 'react'
import TagTable from './components/TagTable'
import TagForm  from './components/TagForm'
import './App.css'
import {
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react'

import { v4 as uuidv4 } from 'uuid';
uuidv4();

// Define a type for the tag object
type Tag = {
  id: string;
  tag_name: string;
  isEdit: boolean;
};

function App() {

  // State containing back-end data from API
  const [tagData, setTagData] = useState<Tag[]>([]); // initial state is an empty object of arrays

  // Function to pass user input value to the tagData state.
  const addTag = (tag: string) => {
    
    setTagData([
      // make a copy of the current state by using the spread operator
      ...tagData, 
      // Values that are being put in for a new tag
      {
        id: uuidv4(), 
        tag_name: tag, 
        isEdit: false
      }
    ])
    console.log(tagData)
  }

  // Deleting a tag
  const deleteTag = (id: string) => {
    // Filtering each tag that's not equal to the id. Removing the tag with the id equal to the id that's passed in.
    setTagData(tagData.filter(tag => tag.id !== id))
  }

  // Editing tags
  const editTag = (id: string) => {
    // Check if the tag id is equal to the id passed in by us. 
    // If so, make a copy of the tag, and make the isEdit the opposite of whatever the current value is.
    // If not, we just want to return the tag
    setTagData(tagData.map(tag => tag.id === id ? {
      ...tag, 
      isEdit: !tag.isEdit
    } 
      : tag
    ))
  }

  const editTask = (tag_name: string, id: string) => {
    setTagData(tagData.map(tag => tag.id === id ? {
      ...tag, 
      tag_name,
      isEdit: !tag.isEdit
    } 
      : tag
    ))
  }

  // Fetch JSON data
  useEffect(() => {
    // No need for "localhost:5000/api" since we've defined a proxy in package.json
    fetch("/api").then(
      // whatever response we get, we get the JSON
      (response) => response.json()
    ).then(
      // Once response is retrieved, get the data from json, and set the data to the setTagData variable
      (data) => {
        console.log(data)
        setTagData(data)
      }
    )
  }, []) // empty array so it only runs on first component render

  return (
    <div>
      <Flex
        justify="center" // Horizontally center content
        direction={"column"}
        align="center"   // Vertically center content
        height="25vh"    // Set a specific height for centering vertically
        
      >    
        <Heading as='h3' size='lg' mb={3}>Tag management System</Heading>
        <Text fontSize='md' mb={5}>Built using React / Typescript / NodeJS / Express</Text>

        {/* Form to add tags */}
        <TagForm addTag={addTag} data-testid="tag-form"/>
      </Flex>

      {/* Check if the data has been retrieved or not */}
      {tagData ? (
        // If it has been retrieved, tags are mapped to individual elements and displayed.
        <TagTable 
          tagData={tagData} 
          deleteTag={deleteTag} 
          editTag={editTag}
          editTask={editTask}
          data-testid="tag-table"
        />
      ) : (
        // If is has not been retrieved, display loading text
        <p>Loading data..</p>
      )}
    </div>
  )
}


export default App