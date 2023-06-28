import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  IconContainer,
  IconItem,
  IconItemContainer,
  ProfileContainer,
  ProfileImage,
  ProfileText,
  ProfileTextContainer,
} from './TopBar.styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../@types';

const TopBarComponent = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <Container>
      <ProfileContainer>
        <ProfileImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/107899019?v=4',
          }}
        />
        <ProfileTextContainer>
          <ProfileText>Hello</ProfileText>
          <ProfileText numberOfLines={1}>Big Boi</ProfileText>
        </ProfileTextContainer>
      </ProfileContainer>

      <IconContainer>
        <IconItemContainer onPress={() => navigation.navigate('Search')}>
          <IconItem name="search" />
        </IconItemContainer>
        <IconItemContainer disabled>
          <IconItem name="bell" />
        </IconItemContainer>
      </IconContainer>
    </Container>
  );
};

export default TopBarComponent;
