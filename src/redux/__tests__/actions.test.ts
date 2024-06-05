import {
  SET_USER_NAME,
  SET_USERS,
  SET_SEARCH_TYPE,
  RESET_SEARCH,
  setUserName,
  setUsers,
  setSearchType,
  resetSearch,
  SetUserNameAction,
  SetUsersAction,
  SetSearchTypeAction,
  SetResetSearchAction,
} from '../actions';
import {User, SearchType} from '../../types';
import {describe, expect} from '@jest/globals';

describe('action creators', () => {
  it('setUserName should create SET_USER_NAME action', () => {
    const name = 'John Doe';
    const expectedAction: SetUserNameAction = {
      type: SET_USER_NAME,
      payload: name,
    };
    expect(setUserName(name)).toEqual(expectedAction);
  });

  it('setUsers should create SET_USERS action', () => {
    const users: User[] = [
      {
        uid: '1',
        name: 'Alice',
        bananas: 100,
        rank: 1,
        isHighlighted: false,
      },
      {
        uid: '2',
        name: 'Bob',
        bananas: 50,
        rank: 2,
        isHighlighted: false,
      },
    ];
    const expectedAction: SetUsersAction = {
      type: SET_USERS,
      payload: users,
    };
    expect(setUsers(users)).toEqual(expectedAction);
  });

  it('setSearchType should create SET_SEARCH_TYPE action', () => {
    const searchType: SearchType = 'FUZZY';
    const expectedAction: SetSearchTypeAction = {
      type: SET_SEARCH_TYPE,
      payload: searchType,
    };
    expect(setSearchType(searchType)).toEqual(expectedAction);
  });

  it('resetSearch should create RESET_SEARCH action', () => {
    const expectedAction: SetResetSearchAction = {
      type: RESET_SEARCH,
    };
    expect(resetSearch()).toEqual(expectedAction);
  });
});
