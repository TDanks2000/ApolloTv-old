import {View, Text, KeyboardTypeOptions} from 'react-native';
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
import {Input} from './Setting.styles';
import {StackNavigation} from '../../../@types';
import {capitalizeFirstLetter} from '../../../utils/utils';

type Props = {
  title: string;
  descriptor: string;
  selectedOption: string | number;
  onPress?: () => void;

  typeOfSetting?: 'dropdown' | 'input' | 'click';
  keyboardType?: KeyboardTypeOptions;

  dropdown?: boolean;
  options?: string[];
  changeSetting?: (option: any) => void;
};

const Setting = (props: Props) => {
  const [open, toggleOpen] = React.useReducer(s => !s, false);
  const {title, descriptor, selectedOption} = props;
  const navigation = useNavigation<StackNavigation>();

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

  if (props.typeOfSetting && props.typeOfSetting === 'input') {
    return (
      <Wrapper>
        <Container key={`${title}-setting`} disabled>
          <LeftContainer>
            <Title numberOfLines={1}>{title}</Title>
            <Description numberOfLines={2}>
              {capitalizeFirstLetter(descriptor)}
            </Description>
          </LeftContainer>
          <RightContainer>
            <Input
              maxLength={2}
              keyboardType={props.keyboardType ?? 'numeric'}
              defaultValue={selectedOption.toString()}
              onChangeText={text => {
                const number = parseInt(text);
                if (isNaN(number)) return;
                if (props.changeSetting)
                  props.changeSetting(isNaN(number) ? 0 : number);
              }}
            />
          </RightContainer>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container onPress={handleSettingPress} key={`${title}-setting`}>
        <LeftContainer>
          <Title numberOfLines={1}>{title}</Title>
          <Description numberOfLines={2}>
            {capitalizeFirstLetter(descriptor)}
          </Description>
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
