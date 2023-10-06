import React, { Fragment } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import EditTagForm from './EditTagForm';
import { css } from '@emotion/react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

const tagStyle = css`
  background-color: #E4E6F4;
`;

const iconStyle = css`
  margin-left: 5px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: orange; /* Change color on hover */
  }
`;

type Tag = {
    id: string;
    tag_name: string;
    isEdit: boolean;
  };
  
// Define the prop types for the TagTable component
type TagTableProps = {
    tagData: Tag[];
    deleteTag: (id: string) => void;
    editTag: (id: string) => void;
    editTask: (tag_name: string, id: string) => void;
};

const TagTable: React.FC<TagTableProps> = ({ tagData, deleteTag, editTag, editTask }) => {
    return (
    <TableContainer>
        <Table variant='simple'>
        <Thead> 
            <Tr>
            <Th>Name</Th>
            <Th>Actions</Th>
            </Tr>
        </Thead>
        <Tbody>
            {tagData.map(({ id, tag_name, isEdit }) => (
                isEdit ? (
                    <Fragment key={`edit-${id}`}>
                        <EditTagForm editTag={editTask} tag={tag_name} id={id}/>
                    </Fragment>
                ) : (
                    <Tr key={id}>
                        <Td css={tagStyle}>{tag_name}</Td>
                        <Td>
                            <button>
                                <EditIcon 
                                    w={5} 
                                    h={5} 
                                    ml={2} 
                                    css={iconStyle}
                                    onClick={() => {
                                        editTag(id);
                                    }}
                                />
                            </button>
                            
                            <button>
                                <DeleteIcon 
                                    w={5} 
                                    h={5} 
                                    ml={2} 
                                    css={iconStyle}
                                    onClick={() => {
                                        deleteTag(id);
                                    }}
                                />
                            </button>
                        </Td>
                    </Tr>
                )
            ))}
        </Tbody>
        </Table>
    </TableContainer>
  );
}

export default TagTable;
