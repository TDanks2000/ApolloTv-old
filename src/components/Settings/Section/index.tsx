import {View, Text} from 'react-native';
import React, {Component, ReactElement} from 'react';
import {Container, Description, Title} from './Section.styles';

type SettingsSectionType = 'video' | 'prefered_voice' | 'log_out';

type Props = {
  title: string;
  descriptor: string;

  type: SettingsSectionType;
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
      options: {
        value: string;
        text: string;
      }[];
    }
);

const Section = (props: Props) => {
  const {title, descriptor} = props;
  const handlePress = () => {
    if (props.type === 'log_out') props.onPress();
  };

  return (
    <Container onPress={handlePress}>
      <Title>{title}</Title>
      <Description>{descriptor}</Description>
    </Container>
  );
};

export default Section;
