import { combineReducers } from "redux";
import User from '../store/auth/userReducer';
import Credentials from '../store/credentials/creReducer';

export default combineReducers({
  user: User,
  credentials: Credentials
})