import {View, Text, Modal} from 'react-native';
import React from 'react';
import {NotificationCard} from '../../components';
import {
  NotificationsContainer,
  NotificationsWrapper,
} from './NotificationsModal.styles';

const NotificationsModel = () => {
  return (
    <Modal transparent={true}>
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
    </Modal>
  );
};

export default NotificationsModel;
