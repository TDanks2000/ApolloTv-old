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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../@types';
import NotLoggedInComponent from './NotLoggedIn';
import {QueryClient, useQuery, useQueryClient} from '@tanstack/react-query';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useAccessToken} from '../../contexts';
import {Linking} from 'react-native';
import {storage, utils} from '../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../utils/constants';

type Props = {
  hasJustLoggedIn?: boolean;
};

const TopBarComponent = ({hasJustLoggedIn}: Props) => {
  let accessToken = useAccessToken().accessToken;
  const navigation = useNavigation<StackNavigation>();

  const fetcher = async () => {
    accessToken = storage.getString(ANILIST_ACCESS_TOKEN_STORAGE);
    if (!accessToken) return [];
    const anilist = new Anilist(accessToken);

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
      {accessToken && (data as any)?.Viewer ? (
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
        <IconItemContainer onPress={() => navigation.navigate('ReaderScreen')}>
          <IconItem name="bell" />
        </IconItemContainer>
      </IconContainer>
    </Container>
  );
};

export default TopBarComponent;
