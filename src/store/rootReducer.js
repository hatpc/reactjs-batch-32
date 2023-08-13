import { combineReducers } from 'redux';

import todoReducer from './todo/reducer';

// COMBINE MANY REDUCERS
const rootReducer = combineReducers({
  todoReducer,
});

export default rootReducer;
