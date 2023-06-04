import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { getSingleRecord, loadrecord, updateRecord } from '../Redux/action';

const UpdatePage = () => {
  const [state, setState] = useState({
    title: '',
    description: '',
  });

  let { id } = useParams();

  console.log(id);
  const { singleRecords } = useSelector((state) => state);
  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useDispatch();

  const { title, description } = state;

  useEffect(() => {
    dispatch(getSingleRecord(id));
  }, []);

  useEffect(() => {
    if (singleRecords) {
      setState({ ...singleRecords });
    }
  }, [singleRecords]);

  const handalChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handalSubmmit = () => {
    if (!title || !description) {
      toast({
        title: 'All the Input filled is required',
        status: 'error',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    } else {
      dispatch(updateRecord(state, id));
      dispatch(loadrecord());
      setTimeout(() => {
        navigate('/');
      }, 300);

      toast({
        title: 'task updated successfully',
        status: 'success',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container>
        <FormControl>
          <FormLabel> title</FormLabel>
          <Input
            placeholder=" title"
            name="title"
            value={title}
            onChange={handalChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input
            name="description"
            placeholder="description"
            value={description}
            onChange={handalChange}
          />
        </FormControl>

        <Button mt="30px" w="100%" onClick={handalSubmmit}>
          Update Record
        </Button>
      </Container>
    </>
  );
};

export default UpdatePage;
