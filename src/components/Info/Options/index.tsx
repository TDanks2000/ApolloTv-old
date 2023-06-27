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
  episodeLegth: number;
}

const Options = ({openEpisodesModal, episodeLegth}: Props) => {
  return (
    <Container>
      <Wrapper>
        <OptionContainer
          onPress={openEpisodesModal}
          disabled={episodeLegth === 0}>
          <OptionIconContainer>
            <OptionIcon name="arrow-circle-o-down" />
          </OptionIconContainer>
          <OptionText>Episodes</OptionText>
        </OptionContainer>

        <OptionContainer disabled>
          <OptionIconContainer>
            <OptionIcon name="list-ul" />
          </OptionIconContainer>
          <OptionText>Collections</OptionText>
        </OptionContainer>

        <OptionContainer disabled>
          <OptionIconContainer>
            <OptionIcon name="download" />
          </OptionIconContainer>
          <OptionText>Download</OptionText>
        </OptionContainer>

        <OptionContainer disabled>
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
