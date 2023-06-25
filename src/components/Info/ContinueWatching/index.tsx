import React from 'react';
import {
  Container,
  PercentWatched,
  Text,
  TextContainer,
  TextIcon,
  Wrapper,
} from './ContinueWatching.styles';

const ContinueWatching = () => {
  return (
    <Container>
      <Wrapper>
        <PercentWatched />
        <TextContainer>
          <TextIcon name="play-circle-o" />
          <Text>Resume episode 1</Text>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export default ContinueWatching;
