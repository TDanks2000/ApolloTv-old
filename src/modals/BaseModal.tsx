import {Modal, Pressable} from 'react-native';
import React, {PropsWithChildren} from 'react';

type Props = {
  closeFunction: () => void;
  visible: boolean;
  animationType?: 'none' | 'slide' | 'fade' | undefined;
};

const BaseModal: React.FC<PropsWithChildren<Props>> = ({
  children,
  closeFunction,
  visible,
  animationType,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType={animationType}
      hardwareAccelerated={true}
      onRequestClose={closeFunction}>
      <Pressable onPress={closeFunction}>{children}</Pressable>
    </Modal>
  );
};

export default BaseModal;
