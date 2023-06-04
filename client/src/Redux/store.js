import { legacy_createStore, applyMiddleware } from 'redux';

import recordReducer from './reducer';
import thunk from 'redux-thunk';

export const store = legacy_createStore(recordReducer, applyMiddleware(thunk));
