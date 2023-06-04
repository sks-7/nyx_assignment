import * as types from './actionTypes';
import axios from 'axios';

const getrecord = (tasks) => ({
  type: types.GET_RECORD,
  payload: tasks,
});

const recorddelete = () => ({
  type: types.DELETE_RECORD,
});

const recordAdded = () => ({
  type: types.ADD_RECORD,
});

const getsinglerecord = (singleRecord) => ({
  type: types.GET_SINGLE_RECORD,
  payload: singleRecord,
});

const recordupdate = () => ({
  type: types.UPDATE_TASK,
});

export const loadrecord = () => {
  return function (dispatch) {
    axios
      .get(`https://sachin-server.onrender.com/api/record`)
      .then((res) => {
        dispatch(getrecord(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteRecord = (id) => {
  return function (dispatch) {
    axios
      .delete(`https://sachin-server.onrender.com/api/record/${id}`)
      .then((res) => {
        dispatch(recorddelete());
        dispatch(loadrecord());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addRecord = (record, toast) => {
  return function (dispatch) {
    axios
      .post(`https://sachin-server.onrender.com/api/record/post`, record)
      .then((res) => {
        dispatch(recordAdded());

        toast({
          title: 'form is Added 😄',
          status: 'success',
          duration: 7000,
          isClosable: true,
          position: 'top',
        });

        dispatch(loadrecord());
      })
      .catch((err) => {
        toast({
          title: 'something went wrong',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      });
  };
};

export const getSingleRecord = (id) => {
  return function (dispatch) {
    axios
      .get(`https://sachin-server.onrender.com/api/record/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getsinglerecord(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateRecord = (record, id) => {
  return function (dispatch) {
    axios
      .patch(`https://sachin-server.onrender.com/api/record/${id}`, record)
      .then((res) => {
        console.log(res.data);
        dispatch(recordupdate());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
