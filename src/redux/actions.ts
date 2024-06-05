import {SearchType, User} from '../types';

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USERS = 'SET_USERS';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const RESET_SEARCH = 'RESET_SEARCH';

export interface SetUserNameAction {
  type: typeof SET_USER_NAME;
  payload: string;
}

export interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

export interface SetSearchTypeAction {
  type: typeof SET_SEARCH_TYPE;
  payload: SearchType;
}

export interface SetResetSearchAction {
  type: typeof RESET_SEARCH;
}

export type UserActionTypes =
  | SetUserNameAction
  | SetUsersAction
  | SetSearchTypeAction
  | SetResetSearchAction;

export const setUserName = (name: string): SetUserNameAction => ({
  type: SET_USER_NAME,
  payload: name,
});

export const setUsers = (users: User[]): SetUsersAction => ({
  type: SET_USERS,
  payload: users,
});

export const setSearchType = (type: SearchType): SetSearchTypeAction => ({
  type: SET_SEARCH_TYPE,
  payload: type,
});

export const resetSearch = (): SetResetSearchAction => ({
  type: RESET_SEARCH,
});
