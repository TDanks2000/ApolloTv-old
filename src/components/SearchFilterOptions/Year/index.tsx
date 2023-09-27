import {View, Text} from 'react-native';
import React from 'react';
import {
  TextBoxContainer,
  TextInput,
} from '../SearchFilterOptions.shared.styles';

const Year = () => {
  return (
    <TextBoxContainer>
      <TextInput placeholder="Year" keyboardType="numeric" maxLength={4} />
    </TextBoxContainer>
  );
};

export default Year;
