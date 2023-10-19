import React from 'react';
import {IconItemContainer} from './NotificationBell.styles';
import {IconItem} from '../TopBar.styles';
import {StackNavigation} from '../../../@types';
import {useNavigation} from '@react-navigation/native';

const NotificationBell = () => {
  const navigation = useNavigation<StackNavigation>();
  const [visible, setVisible] = React.useState<boolean>(false);

  const onPress = () => {
    navigation.navigate('testingScreen');
    setVisible(false);
  };

  return (
    <>
      <IconItemContainer onPress={onPress} disabled>
        <IconItem name="bell" />
        {/* <NotificationStatus /> */}
      </IconItemContainer>

      {/* <NotificationsModal visible={visible} setVisible={setVisible} /> */}
    </>
  );
};

export default NotificationBell;
