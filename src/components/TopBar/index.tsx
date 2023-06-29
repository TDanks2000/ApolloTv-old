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
import {useAccessToken} from '../../contexts';
import NotLoggedInComponent from './NotLoggedIn';

const TopBarComponent = () => {
  const {accessToken} = useAccessToken();
  const navigation = useNavigation<StackNavigation>();

  return (
    <Container>
      <ProfileContainer>
        {accessToken ? (
          <>
            <ProfileImage
              source={{
                uri: 'https://avatars.githubusercontent.com/u/107899019?v=4',
              }}
            />
            <ProfileTextContainer>
              <ProfileText>Hello</ProfileText>
              <ProfileText numberOfLines={1}>Big Boi</ProfileText>
            </ProfileTextContainer>
          </>
        ) : (
          <NotLoggedInComponent />
        )}
      </ProfileContainer>

      <IconContainer>
        <IconItemContainer onPress={() => navigation.navigate('Search')}>
          <IconItem name="search" />
        </IconItemContainer>
        <IconItemContainer
          onPress={() =>
            navigation.navigate('LoggingIn', {access_code: undefined})
          }>
          <IconItem name="bell" />
        </IconItemContainer>
      </IconContainer>
    </Container>
  );
};

export default TopBarComponent;
