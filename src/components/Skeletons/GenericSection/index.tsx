import {View, Text, ScrollView, Animated} from 'react-native';
import React from 'react';
import {
  SectionContainer,
  SectionTitleContainer,
  SectionWrapper,
} from '../../../containers/Sections/Sections.shared.styles';
import {MainCardSkeleton} from '../cards';
import {Title} from './GenericSection.styles';

const GenericSectionSkeleton = () => {
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
      <SectionContainer>
        <SectionTitleContainer>
          <Title />
        </SectionTitleContainer>
        <SectionWrapper>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20, gap: 20}}>
            <MainCardSkeleton />
            <MainCardSkeleton />
            <MainCardSkeleton />
            <MainCardSkeleton />
            <MainCardSkeleton />
          </ScrollView>
        </SectionWrapper>
      </SectionContainer>
    </Animated.View>
  );
};

export default GenericSectionSkeleton;
