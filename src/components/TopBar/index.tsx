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
import {Linking, Platform} from 'react-native';
import {storage} from '../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../utils/constants';
import NotificationBell from './NotificationBell';

type Props = {
  hasJustLoggedIn?: boolean;
  refreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
};

const TopBarComponent = ({
  hasJustLoggedIn,
  refreshing,
  setRefreshing,
}: Props) => {
  let accessToken = useAccessToken().accessToken;
  const navigation = useNavigation<StackNavigation>();

  const fetcher = async () => {
    accessToken = storage.getString(ANILIST_ACCESS_TOKEN_STORAGE);
    if (!accessToken) return [];
    const anilist = new Anilist(accessToken);

    const data = await anilist.user.getCurrentUser();
    return (data as any)?.data;
  };

  const {isPending, isError, data, error, refetch} = useQuery({
    queryKey: ['Top-Bar'],
    queryFn: fetcher,
  });

  React.useEffect(() => {
    if (refreshing) {
      refetch();
      setRefreshing(isPending);
    }
  }, [refreshing]);

  if (isPending) return null;

  return (
    <>
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
          {Platform.isTV && (
            <>
              <IconItemContainer onPress={() => navigation.navigate('Search')}>
                <IconItem name="search" />
              </IconItemContainer>
              <IconItemContainer onPress={() => navigation.navigate('Lists')}>
                <IconItem name="list-ul" />
              </IconItemContainer>
            </>
          )}
          <IconItemContainer onPress={() => navigation.navigate('news', {})}>
            <IconItem name="newspaper" />
          </IconItemContainer>
          <NotificationBell />
          {Platform.isTV && (
            <IconItemContainer onPress={() => navigation.navigate('Settings')}>
              <IconItem name="cog" />
            </IconItemContainer>
          )}
        </IconContainer>
      </Container>
    </>
  );
};

export default TopBarComponent;
