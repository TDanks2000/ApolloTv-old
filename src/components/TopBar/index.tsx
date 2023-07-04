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
import NotLoggedInComponent from './NotLoggedIn';
import {useQuery} from '@tanstack/react-query';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useAccessToken} from '../../contexts';
import {Linking} from 'react-native';

const TopBarComponent = () => {
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);
  const navigation = useNavigation<StackNavigation>();

  const fetcher = async () => {
    if (!accessToken) return [];

    const data = await anilist.user.getCurrentUser();
    return (data as any)?.data;
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['Top-Bar'],
    queryFn: fetcher,
  });

  if (isPending) return null;

  return (
    <Container>
      {(data as any) ? (
        <ProfileContainer
          onPress={() => Linking.openURL(data?.Viewer?.siteUrl)}>
          <ProfileImage
            source={{
              uri: data?.Viewer?.avatar?.medium,
            }}
          />
          <ProfileTextContainer>
            <ProfileText>Hello,</ProfileText>
            <ProfileText numberOfLines={1} isProfileName={true}>
              {data?.Viewer?.name}
            </ProfileText>
          </ProfileTextContainer>
        </ProfileContainer>
      ) : (
        <ProfileContainer disabled>
          <NotLoggedInComponent />
        </ProfileContainer>
      )}

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
