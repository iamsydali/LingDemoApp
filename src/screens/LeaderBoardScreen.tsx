import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  UserActionTypes,
  resetSearch,
  setSearchType,
  setUserName,
  setUsers,
} from '../redux/actions';
import {SearchType, UserState} from '../types';
import SearchInput from '../components/SearchInput';
import UserList from '../components/UserList';
import {useSearch} from '../hooks/useSearch';
import {Dispatch} from 'redux';
import SwitchIcon from '../components/svg/SwitchIcon';
import {theme} from '../theme/theme';
import SortIcon from '../components/svg/SortIcon';
import {Keyboard} from 'react-native';

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.greyBg};
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  padding: ${props => props.theme.padding.screen};
`;

const StyledButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 8px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.bold};
  text-transform: capitalize;
  margin-right: 10px;
`;

const ListTitleView = styled.View`
  padding: 10px;
  padding-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  color: ${props => props.theme.colors.primaryText};
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.bold};
  margin-right: 6px;
`;

const LeaderBoardScreen: React.FC = () => {
  const dispatch = useDispatch<Dispatch<UserActionTypes>>();
  const users = useSelector((state: UserState) => state.users);
  const name = useSelector((state: UserState) => state.name);
  const searchType = useSelector((state: UserState) => state.searchType);

  const {handleDefaultSearch, handleFuzzySearch} = useSearch();

  const [rankSortOrder, setRankSortOrder] = useState<'asc' | 'desc'>('desc');
  const [nameSortOrder, setNameSortOrder] = useState<'asc' | 'desc'>('desc');

  const onUpdateValue = useCallback(
    (val: string) => {
      dispatch(setUserName(val));
    },
    [dispatch],
  );

  const onSearch = useCallback(() => {
    if (searchType === 'DEFAULT') {
      handleDefaultSearch(name);
    } else {
      handleFuzzySearch(name);
    }
  }, [handleDefaultSearch, handleFuzzySearch, name, searchType]);

  const onChangeSearchType = useCallback(() => {
    let type: SearchType = 'DEFAULT';
    if (searchType === 'DEFAULT') {
      type = 'FUZZY';
    }

    dispatch(setSearchType(type));
    dispatch(resetSearch());
  }, [dispatch, searchType]);

  const onSortByRank = useCallback(() => {
    if (name) {
      const sortedUsers = users.sort((a, b) => {
        if (b.bananas !== a.bananas) {
          return b.bananas - a.bananas;
        } else {
          return a.name.localeCompare(b.name);
        }
      });

      if (rankSortOrder === 'desc') {
        setRankSortOrder('asc');
      } else if (rankSortOrder === 'asc') {
        setRankSortOrder('desc');
        sortedUsers.reverse();
      }

      setNameSortOrder('desc');

      dispatch(setUsers(sortedUsers));
    }
  }, [dispatch, name, rankSortOrder, users]);

  const onSortByName = useCallback(() => {
    if (name) {
      const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

      if (nameSortOrder === 'desc') {
        setNameSortOrder('asc');
      } else if (nameSortOrder === 'asc') {
        setNameSortOrder('desc');
        sortedUsers.reverse();
      }

      setRankSortOrder('desc');

      dispatch(setUsers(sortedUsers));
    }
  }, [dispatch, name, nameSortOrder, users]);

  const onClear = useCallback(() => {
    dispatch(resetSearch());
    Keyboard.dismiss();
  }, [dispatch]);

  return (
    <SafeAreaContainer>
      <Container>
        <SearchInput
          placeholder="Enter name here..."
          value={name}
          onUpdateValue={onUpdateValue}
          handleSearch={onSearch}
          onClear={onClear}
        />
        <ListTitleView>
          <TitleButton
            onPress={onSortByRank}
            hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
            <TitleText>Rank</TitleText>
            <SortIcon
              size={theme.iconSizes.medium}
              color={
                rankSortOrder === 'desc'
                  ? theme.colors.defaultIcon
                  : theme.colors.primary
              }
            />
          </TitleButton>
          <TitleButton
            onPress={onSortByName}
            hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
            <TitleText>Name</TitleText>
            <SortIcon
              size={theme.iconSizes.medium}
              color={
                nameSortOrder === 'desc'
                  ? theme.colors.defaultIcon
                  : theme.colors.primary
              }
            />
          </TitleButton>
          <TitleText>Bananas</TitleText>
        </ListTitleView>
        <UserList key={`UserList-${name}`} data={users} />
      </Container>
      <StyledButton onPress={onChangeSearchType}>
        <ButtonText>
          {`Switch to ${searchType === 'DEFAULT' ? 'FUZZY' : 'DEFAULT'} Search`}
        </ButtonText>
        <SwitchIcon
          size={theme.iconSizes.medium}
          color={theme.colors.primary}
        />
      </StyledButton>
    </SafeAreaContainer>
  );
};

export default LeaderBoardScreen;
