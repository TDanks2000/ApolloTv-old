import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  OptionContainer,
  OptionDropDown,
  OptionDropDownItem,
  OptionDropDownItemText,
  OptionIcon,
  OptionIconContainer,
  OptionText,
  OptionWrapper,
  Wrapper,
} from './Options.styles';
import {useBreakpoints} from '../../../hooks';
import {MediaListStatus} from '../../../@types';

interface Props {
  openEpisodesModal: () => void;
  episodeLegth: number;
}

const Options = ({openEpisodesModal, episodeLegth}: Props) => {
  const collectionOptions: MediaListStatus[] = [
    'COMPLETED',
    'CURRENT',
    'DROPPED',
    'PAUSED',
    'PLANNING',
    'REPEATING',
  ];
  const [openCollection, toggleCollectionsDropDown] = React.useReducer(
    s => !s,
    false,
  );

  React.useEffect(() => {
    console.log(openCollection);
  }, [openCollection]);

  const {isMobile} = useBreakpoints();
  return (
    <Container>
      <Wrapper isMobile={isMobile}>
        <OptionContainer>
          <OptionWrapper
            onPress={openEpisodesModal}
            disabled={episodeLegth === 0}>
            <OptionIconContainer>
              <OptionIcon name="arrow-circle-o-down" />
            </OptionIconContainer>
            <OptionText>Episodes</OptionText>
          </OptionWrapper>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper onPress={toggleCollectionsDropDown}>
            <OptionIconContainer>
              <OptionIcon name="list-ul" />
            </OptionIconContainer>
            <OptionText>Collections</OptionText>
          </OptionWrapper>
          <OptionDropDown
            isOpen={openCollection}
            onLayout={() => {
              console.log('test');
            }}>
            {collectionOptions.map((option, index) => {
              return (
                <OptionDropDownItem key={`${option}-${index}`}>
                  <OptionDropDownItemText>{option}</OptionDropDownItemText>
                </OptionDropDownItem>
              );
            })}
          </OptionDropDown>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="download" />
            </OptionIconContainer>
            <OptionText>Download</OptionText>
          </OptionWrapper>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="ellipsis-v" />
            </OptionIconContainer>
            <OptionText>Related</OptionText>
          </OptionWrapper>
        </OptionContainer>
      </Wrapper>
    </Container>
  );
};

export default Options;
