import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { addRecord, loadrecord } from '../Redux/action';

const initialState = {
  title: '',
  description: '',
};

const Addrecord = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description } = state;
  const toast = useToast();

  const handalAdd = () => {
    if (!title || !description) {
      toast({
        title: 'All the Input filled is required',
        status: 'error',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    } else {
      dispatch(addRecord(state, toast));

      navigate('/');

      dispatch(loadrecord());
    }
  };

  const handalChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  return (
    <>
      <Button onClick={onOpen}>Add Record</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your Records</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Container>
              <FormControl>
                <FormLabel> title</FormLabel>
                <Input
                  placeholder=" title"
                  name="title"
                  value={title || ''}
                  onChange={handalChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  placeholder="description"
                  value={description || ''}
                  onChange={handalChange}
                />
              </FormControl>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={'blue'} mr={3} onClick={handalAdd}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addrecord;
