import {Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {AlertState} from '../../@types/Alert.types';
import {
  AlertBox,
  Container,
  Options,
  SubText,
  Title,
  Option,
  OptionText,
  TitleContainer,
  IconContainer,
} from './Alert.styles';

import Icon from 'react-native-vector-icons/FontAwesome5';

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

  const closeFunction = () => {
    if (alertState.show) closeAlert();
  };

  return (
    <Modal
      visible={alertState.show ?? false}
      transparent={true}
      onRequestClose={closeFunction}>
      {alertState.show ? (
        <TouchableOpacity
          onPress={closeFunction}
          style={{flex: 1}}
          activeOpacity={1}>
          <Container>
            <AlertBox AlertBoxType={alertState.type}>
              <TitleContainer>
                <Title numberOfLines={1}>{alertState.title}</Title>
              </TitleContainer>
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
        </TouchableOpacity>
      ) : null}
    </Modal>
  );
};

export default Alert;
