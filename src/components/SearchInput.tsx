import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import SearchIcon from './svg/SearchIcon';
import {theme} from '../theme/theme';
import CloseIcon from './svg/CloseIcon';
import {Pressable} from 'react-native';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onUpdateValue: (val: string) => void;
  onClear: () => void;
  handleSearch: () => void;
}

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InputView = styled.View<{isFocused: boolean}>`
  border: ${({isFocused, theme: {colors}}) =>
    `2px solid ${isFocused ? colors.primary : colors.strokeWhite}`};
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  flex: 1;
  flex-direction: row;
`;

const StyledInput = styled.TextInput`
  color: ${props => props.theme.colors.primaryText};
  font-size: ${props => props.theme.fontSize.medium};
  flex: 1;
  margin-left: 10px;
`;

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onUpdateValue,
  onClear,
  handleSearch,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <InputContainer>
      <InputView isFocused={isFocused}>
        <SearchIcon
          size={theme.iconSizes.medium}
          color={theme.colors.defaultIcon}
        />
        <StyledInput
          value={value}
          onChangeText={onUpdateValue}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.secondaryText}
          onSubmitEditing={handleSearch}
          returnKeyType={'search'}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {!!value && (
          <Pressable onPress={onClear}>
            <CloseIcon
              size={theme.iconSizes.medium}
              color={
                isFocused ? theme.colors.primary : theme.colors.defaultIcon
              }
            />
          </Pressable>
        )}
      </InputView>
    </InputContainer>
  );
};

export default SearchInput;
