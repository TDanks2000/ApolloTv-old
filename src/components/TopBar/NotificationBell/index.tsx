import {View, Text} from 'react-native';
import React from 'react';
import {IconItemContainer, NotificationStatus} from './NotificationBell.styles';
import {IconItem} from '../TopBar.styles';
import {NotificationsModal} from '../../../modals';

const NotificationBell = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <>
      <IconItemContainer onPress={() => setVisible(true)} disabled>
        <IconItem name="bell" />
        {/* <NotificationStatus /> */}
      </IconItemContainer>

      <NotificationsModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default NotificationBell;
