import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {User} from '../types';
import EmptyBoxIcon from './svg/EmptyBoxIcon';

interface UserListProps {
  data: User[];
}

const ListContainer = styled.View`
  flex: 1;
  padding-top: 20px;
`;

const ListItem = styled.View<{
  isHighlighted?: boolean;
}>`
  background-color: ${({isHighlighted, theme: {colors}}) =>
    isHighlighted ? colors.primary : colors.greyBg};
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 6px;
  overflow: hidden;
`;

const UserText = styled.Text<{
  isHighlighted?: boolean;
}>`
  color: ${({isHighlighted, theme: {colors}}) =>
    isHighlighted ? colors.white : colors.primaryText};
  font-size: ${props => props.theme.fontSize.medium};
`;

const EmptyView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: ${props => props.theme.fontSize.large};
  color: ${props => props.theme.colors.secondaryText};
  margin-top: 20px;
  text-align: center;
`;

const UserList: React.FC<UserListProps> = ({data}) => {
  return (
    <ListContainer>
      <FlatList
        data={data}
        keyExtractor={item => `user-list-${item.uid}`}
        renderItem={({item}) => (
          <ListItem isHighlighted={item.isHighlighted}>
            <UserText isHighlighted={item.isHighlighted}>{item.rank}</UserText>
            <UserText isHighlighted={item.isHighlighted}>{item.name}</UserText>
            <UserText isHighlighted={item.isHighlighted}>
              {item.bananas}
            </UserText>
          </ListItem>
        )}
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={
          <EmptyView>
            <EmptyBoxIcon size={120} />
            <EmptyText>Enter name to get leader board results!</EmptyText>
          </EmptyView>
        }
      />
    </ListContainer>
  );
};

export default UserList;
