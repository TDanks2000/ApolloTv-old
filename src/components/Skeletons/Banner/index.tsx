import {View, Text, Animated} from 'react-native';
import React from 'react';
import {BannerContainer, BannerWrapper} from './Banner.styles';
import {useBreakpoints} from '../../../hooks';
import BannerCardSkeleton from '../cards/BannerCard';

const BannerSkeleton = () => {
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
    <BannerContainer style={{opacity}}>
      <BannerWrapper
        horizontal
        bounces={false}
        pagingEnabled
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        // snapToInterval={screenSize}
        snapToAlignment="center"
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 15,
        }}>
        <BannerCardSkeleton />
        <BannerCardSkeleton />
        <BannerCardSkeleton />
        <BannerCardSkeleton />
        <BannerCardSkeleton />
      </BannerWrapper>
    </BannerContainer>
  );
};

export default BannerSkeleton;
