import {View, Text, NativeSyntheticEvent} from 'react-native';
import React from 'react';
import {
  TextBoxContainer,
  TextInput,
} from '../SearchFilterOptions.shared.styles';
import {TextInputChangeEventData} from 'react-native';

type Props = {
  year?: string;
  setYear: (value: string) => void;
};

const Year: React.FC<Props> = ({year, setYear}) => {
  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const {eventCount, target, text} = e.nativeEvent;
    const textToNum = text.replace(/[^0-9]/g, '');
    if (textToNum.length <= 0) e.preventDefault();
    else setYear(textToNum);
  };

  return (
    <TextBoxContainer>
      <TextInput
        placeholder="Year"
        keyboardType="numeric"
        maxLength={4}
        onChange={onChange}
        value={year}
      />
    </TextBoxContainer>
  );
};

export default Year;
