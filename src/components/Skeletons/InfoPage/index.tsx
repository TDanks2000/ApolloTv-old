import {Animated} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BottomContainer,
  InfoTopContainer,
  RatingContainer,
  Title,
  Text,
  TopContainer,
  Wrapper,
  Button,
} from './InfoPage.styles';
import {BackButtonComponent} from '../../Shared';

const InfoPageSkeleton = () => {
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
      <InfoTopContainer style={{opacity}}>
        <Wrapper>
          <TopContainer>
            <BackButtonComponent isModal={false} />
            <RatingContainer />
          </TopContainer>
          <BottomContainer>
            <Text />
            <Title />
            <Button />
          </BottomContainer>
        </Wrapper>
      </InfoTopContainer>
    </SafeAreaView>
  );
};

export default InfoPageSkeleton;
