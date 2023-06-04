import * as types from './actionTypes';

const initialState = {
  records: [],
  singleRecords: {},
  loading: true,
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RECORD:
      return {
        ...state,
        records: action.payload,
        loading: false,
      };

    case types.DELETE_RECORD:
    case types.ADD_RECORD:
    case types.UPDATE_RECORD:
      return {
        ...state,
        loading: false,
      };

    case types.GET_SINGLE_RECORD:
      return {
        ...state,
        singleRecords: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default recordReducer;
