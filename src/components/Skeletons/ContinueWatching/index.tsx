import {ScrollView, Animated} from 'react-native';
import React from 'react';
import {
  SectionContainer,
  SectionTitleContainer,
  SectionWrapper,
} from '../../../containers/Sections/Sections.shared.styles';
import {Title} from './GenericSection.styles';
import ContinueWatchingCardSkeleton from '../cards/ContinueWatchingCard';
import {GenericContainer} from '../../../screens/HomeScreen/HomeScreen.styles';

const ContinueWatchingSectionSkeleton = () => {
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
    <Animated.View style={{opacity}}>
      <GenericContainer>
        <SectionContainer>
          <SectionTitleContainer>
            <Title />
          </SectionTitleContainer>
          <SectionWrapper>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 20, gap: 20}}>
              <ContinueWatchingCardSkeleton />
              <ContinueWatchingCardSkeleton />
              <ContinueWatchingCardSkeleton />
              <ContinueWatchingCardSkeleton />
              <ContinueWatchingCardSkeleton />
            </ScrollView>
          </SectionWrapper>
        </SectionContainer>
      </GenericContainer>
    </Animated.View>
  );
};

export default ContinueWatchingSectionSkeleton;
