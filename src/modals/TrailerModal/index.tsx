import {View, Text, Modal} from 'react-native';
import React from 'react';

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;

  trailerKey: string;
};

const TrailerModal = ({setShowModal, showModal, trailerKey}: Props) => {
  return (
    <Modal visible={showModal} transparent={true}>
      <View></View>
    </Modal>
  );
};

export default TrailerModal;
