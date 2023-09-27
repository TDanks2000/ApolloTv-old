import {View, Text} from 'react-native';
import React, {Component, ReactElement} from 'react';
import {
  Container,
  Description,
  Dropdown,
  DropdownComponent,
  DropdownItem,
  DropdownItemTitle,
  LeftContainer,
  RightContainer,
  SelectedOption,
  Title,
  Wrapper,
} from '../Settings.styles';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  descriptor: string;
  selectedOption: string;
  onPress?: () => void;

  dropdown?: boolean;
  options?: string[];
  changeSetting?: (option: any) => void;
};

const Setting = (props: Props) => {
  const [open, toggleOpen] = React.useReducer(s => !s, false);
  const {title, descriptor, selectedOption} = props;
  const navigation: any = useNavigation();

  const handlePress = (change: any) => {
    if (props.changeSetting) {
      props.changeSetting(change);
      toggleOpen();
    }
  };

  const handleSettingPress = () => {
    if (props.dropdown) toggleOpen();
    if (props.onPress) props.onPress();
  };

  return (
    <Wrapper>
      <Container onPress={handleSettingPress} key={`${title}-setting`}>
        <LeftContainer>
          <Title numberOfLines={1}>{title}</Title>
          <Description numberOfLines={2}>{descriptor}</Description>
        </LeftContainer>
        <RightContainer>
          <SelectedOption>{selectedOption}</SelectedOption>
        </RightContainer>
      </Container>
      {props.dropdown && (
        <Dropdown isOpen={open}>
          <DropdownComponent>
            {props.options?.map((option: string, index: number) => (
              <DropdownItem
                key={`option-${option}-${index}`}
                onPress={() => handlePress(option)}>
                <DropdownItemTitle isSelected={option === selectedOption}>
                  {option}
                </DropdownItemTitle>
              </DropdownItem>
            ))}
          </DropdownComponent>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default Setting;
