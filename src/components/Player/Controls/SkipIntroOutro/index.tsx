import React from 'react';
import {
  Container,
  Title,
  TopAnimatedBackground,
  Wrapper,
} from './SkipIntroOutro.styles';
import {Animated} from 'react-native';

type Props = {
  duration: number;
  title: string;
  type: 'skip_intro' | 'skip_outro';
  skipFunctions: {
    skipIntro: () => void;
    skipOutro: () => void;
  };

  isHidden: boolean;
};

const SkipIntroOutro = ({
  duration,
  title,
  type,
  skipFunctions,
  isHidden,
}: Props) => {
  const widthAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Define the animation configuration
    const animationConfig = {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false, // Set this to true if you have react-native-reanimated version 2.x
    };

    // Start the animation
    Animated.timing(widthAnimation, animationConfig).start();

    return () => {
      widthAnimation.resetAnimation();
    };
  }, [widthAnimation, duration, type]);

  // Interpolate the animation value to calculate the width as a percentage
  const interpolatedWidth = widthAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handlePress = () => {
    if (type === 'skip_intro') {
      skipFunctions.skipIntro();
    } else if (type === 'skip_outro') {
      skipFunctions.skipOutro();
    }
  };

  return (
    <Container onPress={handlePress} isHidden={isHidden}>
      <Wrapper>
        <TopAnimatedBackground
          style={{
            width: interpolatedWidth,
          }}
        />
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export default SkipIntroOutro;
