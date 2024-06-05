import {UserState} from '../types';
import {
  RESET_SEARCH,
  SET_SEARCH_TYPE,
  SET_USER_NAME,
  SET_USERS,
  UserActionTypes,
} from './actions';

const initialState: UserState = {
  name: '',
  users: [],
  searchType: 'DEFAULT',
};

const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        name: '',
        users: [],
      };
    default:
      return state;
  }
};

export default userReducer;
