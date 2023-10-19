import {View, Text, Animated, Platform} from 'react-native';
import React from 'react';
import {
  Container,
  ProfileContainer,
  ProfileImage,
  ProfileText,
  SubProfileText,
  ProfileTextContainer,
  IconContainer,
  IconItemContainer,
  IconItem,
} from './TopBar.styles';
import NotificationBell from '../../TopBar/NotificationBell';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../../@types';
import {SafeAreaView} from 'react-native-safe-area-context';

const TopBarSkeleton = () => {
  const navigation = useNavigation<StackNavigation>();
  const [opacity, setOpacity] = React.useState(new Animated.Value(0.5));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <SafeAreaView>
      <Container style={{opacity}}>
        <ProfileContainer>
          <ProfileImage />
          <ProfileTextContainer>
            <ProfileText />
            <SubProfileText />
          </ProfileTextContainer>
        </ProfileContainer>
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
          <NotificationBell loadingComp={true} />
          {Platform.isTV && (
            <IconItemContainer onPress={() => navigation.navigate('Settings')}>
              <IconItem name="cog" />
            </IconItemContainer>
          )}
        </IconContainer>
      </Container>
    </SafeAreaView>
  );
};

export default TopBarSkeleton;
