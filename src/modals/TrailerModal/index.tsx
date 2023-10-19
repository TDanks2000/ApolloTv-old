import {View, Modal} from 'react-native';

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
