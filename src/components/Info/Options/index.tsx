import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  OptionContainer,
  OptionIcon,
  OptionIconContainer,
  OptionText,
  Wrapper,
} from './Options.styles';

interface Props {
  openEpisodesModal: () => void;
}

const Options = ({openEpisodesModal}: Props) => {
  return (
    <Container>
      <Wrapper>
        <OptionContainer onPress={openEpisodesModal}>
          <OptionIconContainer>
            <OptionIcon name="arrow-circle-o-down" />
          </OptionIconContainer>
          <OptionText>Episodes</OptionText>
        </OptionContainer>

        <OptionContainer>
          <OptionIconContainer>
            <OptionIcon name="list-ul" />
          </OptionIconContainer>
          <OptionText>Collections</OptionText>
        </OptionContainer>

        <OptionContainer>
          <OptionIconContainer>
            <OptionIcon name="download" />
          </OptionIconContainer>
          <OptionText>Download</OptionText>
        </OptionContainer>

        <OptionContainer>
          <OptionIconContainer>
            <OptionIcon name="ellipsis-v" />
          </OptionIconContainer>
          <OptionText>Related</OptionText>
        </OptionContainer>
      </Wrapper>
    </Container>
  );
};

export default Options;
