import {View, Text} from 'react-native';
import React, {Component, ReactElement} from 'react';
import {
  Container,
  Description,
  LeftContainer,
  RightContainer,
  SelectedOption,
  Title,
} from './Section.styles';

type SettingsSectionType = 'video' | 'prefered_voice' | 'log_out';

type Props = {
  title: string;
  descriptor: string;

  type: SettingsSectionType;
  selectedOption?: string;
} & (
  | {
      type: 'log_out';
      onPress: () => void;
    }
  | {
      type: 'video';
      settingsScreen: ReactElement;
    }
  | {
      type: 'prefered_voice';
      onPress: () => void;
    }
);

const Section = (props: Props) => {
  const {title, descriptor} = props;
  const handlePress = () => {
    if (props.type === 'log_out' || props.type === 'prefered_voice')
      props.onPress();
  };

  return (
    <Container onPress={handlePress}>
      <LeftContainer>
        <Title>{title}</Title>
        <Description>{descriptor}</Description>
      </LeftContainer>
      <RightContainer>
        {props.selectedOption ? (
          <SelectedOption numberOfLines={1}>
            {props.selectedOption}
          </SelectedOption>
        ) : null}
      </RightContainer>
    </Container>
  );
};

export default Section;
