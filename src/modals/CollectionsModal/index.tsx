import {View, Text, Modal} from 'react-native';
import React from 'react';
import {Container, TopBanner, Wrapper} from './CollectionsModal.styles';

const CollectionsModal = () => {
  return (
    <Modal visible={true} transparent={true}>
      <Container>
        <Wrapper>
          <TopBanner
            source={{
              uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/20931-xDhiTPZmtS3u.jpg',
            }}></TopBanner>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default CollectionsModal;
