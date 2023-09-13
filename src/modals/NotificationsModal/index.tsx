import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {NotificationCard} from '../../components';
import {
  CloseBG,
  NotificationsContainer,
  NotificationsWrapper,
} from './NotificationsModal.styles';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const NotificationsModel: React.FC<Props> = ({visible, setVisible}) => {
  const closeFunction = () => {
    setVisible(false);
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={closeFunction}>
      <CloseBG onPress={closeFunction}>
        <NotificationsContainer>
          <NotificationsWrapper>
            <NotificationCard
              notification_desc="a new epsiode has been released"
              notification_title="jujutsu kaisen season 2"
              notification_image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMxM0RXhfwPC_6lM9UaqCP8y_RQPyY-Iu2pqFbO5Loi9sAQvgb"
            />
            <NotificationCard
              notification_desc="a new epsiode has been released"
              notification_title="jujutsu kaisen season 2"
              notification_image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMxM0RXhfwPC_6lM9UaqCP8y_RQPyY-Iu2pqFbO5Loi9sAQvgb"
            />
            <NotificationCard
              notification_desc="a new epsiode has been released"
              notification_title="jujutsu kaisen season 2"
              notification_image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMxM0RXhfwPC_6lM9UaqCP8y_RQPyY-Iu2pqFbO5Loi9sAQvgb"
            />
            <NotificationCard
              notification_desc="a new epsiode has been released"
              notification_title="jujutsu kaisen season 2"
              notification_image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMxM0RXhfwPC_6lM9UaqCP8y_RQPyY-Iu2pqFbO5Loi9sAQvgb"
            />
          </NotificationsWrapper>
        </NotificationsContainer>
      </CloseBG>
    </Modal>
  );
};

export default NotificationsModel;
