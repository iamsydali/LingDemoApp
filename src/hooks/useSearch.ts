import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {RawUser, User} from '../types';
import {UserActionTypes, setUsers} from '../redux/actions';
import {Dispatch} from 'redux';

export const useSearch = () => {
  const [leaderBoardData, setLeaderBoardData] = useState<User[]>([]);
  const dispatch = useDispatch<Dispatch<UserActionTypes>>();

  const fetchLeaderBoardData = useCallback(() => {
    const jsonData: Record<
      string,
      RawUser
    > = require('../constants/leaderboard.json');

    // Filter out users with empty names
    const filteredUsers = Object.values(jsonData).filter(
      user => user.name.trim() !== '',
    );

    // Sort users first by bananas in descending order, then by name in ascending order
    const sortedUsers = filteredUsers.sort((a, b) => {
      if (b.bananas !== a.bananas) {
        return b.bananas - a.bananas;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    // Map sorted users to desired format
    const userList: User[] = sortedUsers.map((user, index) => ({
      name: user.name,
      bananas: user.bananas,
      uid: user.uid,
      rank: index + 1,
      isHighlighted: false,
    }));

    setLeaderBoardData(userList);
  }, []);

  useEffect(() => {
    fetchLeaderBoardData();
  }, [fetchLeaderBoardData]);

  const handleDefaultSearch = useCallback(
    (searchTerm: string) => {
      const lowercasedName = searchTerm.toLowerCase();

      const currentUser = leaderBoardData.find(
        item => item.name.toLocaleLowerCase() === lowercasedName,
      );

      if (!currentUser) {
        Alert.alert(
          'This user name does not exist! Please specify an existing user name!',
        );
        return;
      }

      const topUsers = leaderBoardData.slice(0, 10);

      const enhancedTopUsers = topUsers.map(user => ({
        ...user,
        isHighlighted: user.name.toLocaleLowerCase() === lowercasedName,
      }));

      if (
        currentUser &&
        !enhancedTopUsers.find(user => user.uid === currentUser.uid)
      ) {
        enhancedTopUsers.splice(9, 1, {
          ...currentUser,
          isHighlighted: true,
        });
      }

      dispatch(setUsers(enhancedTopUsers));
    },
    [dispatch, leaderBoardData],
  );

  const handleFuzzySearch = useCallback(
    (searchTerm: string) => {
      const lowercasedName = searchTerm.toLowerCase();

      if (!lowercasedName) {
        return;
      }

      const filteredUsers = leaderBoardData.filter(item =>
        item.name.toLowerCase().includes(lowercasedName),
      );

      dispatch(setUsers(filteredUsers));
    },
    [dispatch, leaderBoardData],
  );

  return {handleDefaultSearch, handleFuzzySearch};
};
