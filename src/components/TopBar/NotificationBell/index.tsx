import React from 'react';
import {IconItemContainer} from './NotificationBell.styles';
import {IconItem} from '../TopBar.styles';
import {StackNavigation} from '../../../@types';
import {useNavigation} from '@react-navigation/native';

type Props = {
  loadingComp?: boolean;
};

const NotificationBell: React.FC<Props> = ({loadingComp = false}) => {
  const navigation = useNavigation<StackNavigation>();
  const [visible, setVisible] = React.useState<boolean>(false);

  const onPress = () => {
    navigation.navigate('testingScreen');
    setVisible(false);
  };

  return (
    <>
      <IconItemContainer onPress={onPress} disabled>
        <IconItem name="bell" loading={loadingComp} />
        {/* <NotificationStatus /> */}
      </IconItemContainer>

      {/* <NotificationsModal visible={visible} setVisible={setVisible} /> */}
    </>
  );
};

export default NotificationBell;
