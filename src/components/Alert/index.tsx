import {Modal, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {AlertState} from '../../@types/Alert.types';
import {
  AlertBox,
  Container,
  Options,
  SubText,
  Title,
  Option,
  OptionText,
} from './Alert.styles';

type Props = {
  alertState: AlertState;
  closeAlert: () => void;
};

const Alert = ({alertState, closeAlert}: Props) => {
  const handleOptionPress = (onPress: () => void) => {
    if (alertState.show) closeAlert();
    onPress();
  };

  React.useEffect(() => {
    if (
      alertState.show &&
      alertState.duration &&
      alertState.duration > 0 &&
      alertState.duration !== Infinity
    ) {
      setTimeout(() => {
        closeAlert();
      }, alertState.duration);
    }
  }, [alertState.show]);

  return (
    <Modal visible={alertState.show} transparent={true}>
      {alertState.show ? (
        <Container>
          <AlertBox AlertBoxType={alertState.type}>
            <Title numberOfLines={1}>{alertState.title}</Title>
            <SubText numberOfLines={2}>{alertState.message}</SubText>
            {alertState.options ? (
              <Options>
                {alertState.options.map((option, index) => (
                  <Option
                    key={index}
                    onPress={() => handleOptionPress(option.onPress)}>
                    <OptionText>{option.text}</OptionText>
                  </Option>
                ))}
              </Options>
            ) : null}
          </AlertBox>
        </Container>
      ) : null}
    </Modal>
  );
};

export default Alert;
