import {Modal, Text} from 'react-native';
import React from 'react';
import {ModalContainer} from '../../styles/sharedStyles';
import {
  BackButton,
  BackButtonIcon,
  BottomBanner,
  BottomBannerTextContainer,
  Container,
  EpisodeContainer,
  EpisodeImageBackground,
  EpisodeNumber,
  EpisodeTitle,
  PercentWatched,
  PercentWatchedContainer,
  Title,
  TopContainer,
  Wrapper,
} from './EpisodesModal.styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  episodes: any[];
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const EpisodesModal = ({setVisible, visible = false}: Props) => {
  const goBack = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType={'slide'}>
      <ModalContainer>
        <Container>
          <TopContainer>
            <BackButton onPress={goBack}>
              <BackButtonIcon name="arrow-left" />
            </BackButton>
            <Title numberOfLines={1}>Odd Taxi</Title>
          </TopContainer>
          <EpisodeContainer>
            <EpisodeImageBackground
              source={{
                uri: 'https://img1.ak.crunchyroll.com/i/spire2-tmb/bd24d88798ae448ef2255d1d5462e6cd1644849187_full',
              }}>
              <Wrapper>
                <BottomBanner>
                  <PercentWatchedContainer>
                    <PercentWatched />
                  </PercentWatchedContainer>
                  <BottomBannerTextContainer>
                    <EpisodeNumber numberOfLines={1}>Episode 1</EpisodeNumber>
                    <EpisodeTitle numberOfLines={1}>
                      The Eccentric Driver
                    </EpisodeTitle>
                  </BottomBannerTextContainer>
                </BottomBanner>
              </Wrapper>
            </EpisodeImageBackground>
          </EpisodeContainer>
        </Container>
      </ModalContainer>
    </Modal>
  );
};

export default EpisodesModal;
