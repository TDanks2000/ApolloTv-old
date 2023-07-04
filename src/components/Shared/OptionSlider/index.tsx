import {View, Text} from 'react-native';
import React from 'react';
import {Container, Item, ItemText} from './Options.styles';

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  setOption: (value: string) => void;
  option: string;
  onPress?: (value: any) => void;
}

const Option = ({options, setOption, option, onPress}: Props) => {
  const handlePress = (value: string) => {
    setOption(value);
    if (onPress) onPress(value);
  };

  return (
    <Container>
      {options.map(o => {
        const active = o.value === option;

        return (
          <Item
            key={o.value}
            onPress={() => handlePress(o.value)}
            activeOpacity={0.7}
            // @ts-ignore
            isActive={active}
            disabled={active}>
            <ItemText
              // @ts-ignore
              isActive={active}>
              {o.label}
            </ItemText>
          </Item>
        );
      })}
    </Container>
  );
};

export default Option;
