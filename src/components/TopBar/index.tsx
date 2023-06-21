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

const TopBarComponent = () => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileImage
          source={{
            uri: 'https://i.pinimg.com/originals/57/3f/22/573f22a1aa17b366f5489745dc4704e1.jpg',
          }}
        />
        <ProfileTextContainer>
          <ProfileText>Hello</ProfileText>
          <ProfileText numberOfLines={1}>Tommy</ProfileText>
        </ProfileTextContainer>
      </ProfileContainer>

      <IconContainer>
        <IconItemContainer>
          <IconItem name="search" />
        </IconItemContainer>
        <IconItemContainer>
          <IconItem name="bell" />
        </IconItemContainer>
      </IconContainer>
    </Container>
  );
};

export default TopBarComponent;
