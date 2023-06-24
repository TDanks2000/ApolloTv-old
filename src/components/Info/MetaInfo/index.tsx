import React from 'react';
import {
  BottomMetaInfo,
  BottomMetaInfoItem,
  Container,
  Seperator,
  Title,
  TopMetaInfo,
  Text,
  AltText,
  Wrapper,
} from './MetaInfo.styles';

const MetaInfo = () => {
  return (
    <Container>
      <Wrapper>
        <TopMetaInfo>
          <Text>2021</Text>
          <Seperator />
          <Text>13 Episodes</Text>
        </TopMetaInfo>
        <Title>Odd Taxi</Title>
        <BottomMetaInfo>
          <BottomMetaInfoItem>
            <AltText>Drama</AltText>
          </BottomMetaInfoItem>
          <BottomMetaInfoItem>
            <AltText>Mystery</AltText>
          </BottomMetaInfoItem>
          <BottomMetaInfoItem>
            <AltText bold={true}>13+</AltText>
          </BottomMetaInfoItem>
        </BottomMetaInfo>
      </Wrapper>
    </Container>
  );
};

export default MetaInfo;
