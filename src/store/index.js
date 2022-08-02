import { combineReducers } from 'redux';
import userReducer from './userReducer';
import userDetailReducer from './userDetailReducer';

const rootReducer = combineReducers({
  user: userReducer,
  userDetail: userDetailReducer,
});

export default rootReducer;
