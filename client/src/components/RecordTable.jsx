import React, { useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { deleteRecord, loadrecord } from '../Redux/action';

const RecordTable = () => {
  const dispatch = useDispatch();

  const { records } = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadrecord());
  }, []);

  const handalDelete = (id) => {
    if (window.confirm('Do you want to delete the task ?')) {
      dispatch(deleteRecord(id));
      dispatch(loadrecord());
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="#e8f5fd">
          <Thead>
            <Tr>
              <Th>serial No</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records &&
              records.map((ele, ind) => (
                <Tr key={ele._id}>
                  <Td>{ind}</Td>
                  <Td>{ele.title}</Td>

                  <Td>{ele.description}</Td>

                  <Td>
                    <Popover>
                      <PopoverTrigger>
                        <Button>
                          <BsThreeDotsVertical />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>select</PopoverHeader>

                        <Link to={`/edit/${ele._id}`}>
                          <PopoverBody
                            style={{ cursor: 'pointer' }}
                            _hover={{ background: 'blue', color: 'white' }}
                          >
                            Update
                          </PopoverBody>
                        </Link>

                        <PopoverBody
                          style={{ cursor: 'pointer' }}
                          _hover={{ background: 'red', color: 'white' }}
                          onClick={() => handalDelete(ele._id)}
                        >
                          Delete
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecordTable;
