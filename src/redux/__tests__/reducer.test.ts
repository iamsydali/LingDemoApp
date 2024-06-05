import userReducer from '../reducer';
import {UserState, User} from '../../types';
import {
  RESET_SEARCH,
  SET_SEARCH_TYPE,
  SET_USERS,
  SET_USER_NAME,
  UserActionTypes,
} from '../actions';
import {describe, expect, it} from '@jest/globals';

describe('userReducer', () => {
  const initialState: UserState = {
    name: '',
    users: [],
    searchType: 'DEFAULT',
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, {} as UserActionTypes)).toEqual(initialState);
  });

  it('should handle SET_USER_NAME', () => {
    const action: UserActionTypes = {
      type: SET_USER_NAME,
      payload: 'John Doe',
    };
    const expectedState = {
      ...initialState,
      name: 'John Doe',
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_USERS', () => {
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
    const action: UserActionTypes = {
      type: SET_USERS,
      payload: users,
    };
    const expectedState = {
      ...initialState,
      users,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_SEARCH_TYPE', () => {
    const action: UserActionTypes = {
      type: SET_SEARCH_TYPE,
      payload: 'FUZZY',
    };
    const expectedState = {
      ...initialState,
      searchType: 'FUZZY',
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_SEARCH', () => {
    const modifiedState: UserState = {
      name: 'John Doe',
      users: [
        {
          uid: '1',
          name: 'Alice',
          bananas: 100,
          rank: 1,
          isHighlighted: false,
        },
      ],
      searchType: 'DEFAULT',
    };
    const action: UserActionTypes = {
      type: RESET_SEARCH,
    };
    const expectedState = {
      ...initialState,
    };
    expect(userReducer(modifiedState, action)).toEqual(expectedState);
  });
});
